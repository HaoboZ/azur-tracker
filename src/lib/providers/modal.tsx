import EventEmitter from 'events';
import { isEqual } from 'lodash';
import { nanoid } from 'nanoid';
import React, { ComponentProps } from 'react';

import PageModal from '../../components/pageModal';

type Modal = {
	id: string,
	open: boolean,
	Component: React.ComponentType,
	modalProps?: Partial<ComponentProps<typeof PageModal>>,
	props?: any
};

export type ModalControls = {
	close: ( ...args ) => void,
	status: () => Modal,
	events: EventEmitter
};

type StaticModalControls<T = object> = ModalControls & {
	show: ( props?: T, ...args ) => void,
	remove: () => void
};

export type DynamicModalControls<T = object> = {
	show: (
		Component?: React.ComponentType<T>,
		modalProps?: Partial<ComponentProps<typeof PageModal>>,
		props?: T
	) => void,
	close: ( id: string ) => void,
	status: ( id: string ) => Modal
};

type C1<T = any> = (
	id: string,
	Component: React.ComponentType<T>,
	modalProps?: Partial<ComponentProps<typeof PageModal>>,
	props?: T
) => StaticModalControls<T>;

type C2 = () => DynamicModalControls;

const ModalContext = React.createContext<C1 & C2>( () => ( {
	show  : () => null,
	close : () => null,
	status: () => null,
	remove: () => null,
	events: null
} ) );
ModalContext.displayName = 'Modal';

const ModalControlsContext = React.createContext<ModalControls>( undefined );
ModalControlsContext.displayName = 'ModalControls';

export default function ModalProvider( { children } ) {
	const [ modals, setModals ] = React.useState<Modal[]>( [] );
	
	function controls( id: string, remove?: boolean ): ModalControls {
		return {
			close : ( ...args ) => setModals( ( modals ) => {
				const index = modals.findIndex( modal => modal?.id === id );
				if ( index === -1 ) return modals;
				const newModals = [ ...modals ];
				newModals[ index ] = { ...newModals[ index ], open: false };
				newModals[ index ]?.props.controls.events.emit( 'close', ...args );
				if ( remove ) {
					setTimeout( () => setModals( ( modals ) => {
						return modals.filter( modal => modal?.id !== id );
					} ), 500 );
				}
				return newModals;
			} ),
			status: () => modals.find( modal => modal?.id === id ),
			events: new EventEmitter()
		};
	}
	
	function staticControls( id, controls ): StaticModalControls {
		return {
			...controls,
			show  : ( props, ...args ) => setModals( ( modals ) => {
				const index = modals.findIndex( modal => modal?.id === id );
				if ( index === -1 ) return modals;
				const newModals = [ ...modals ];
				newModals[ index ] = {
					...newModals[ index ],
					open : true,
					props: { ...newModals[ index ]?.props, ...props }
				};
				newModals[ index ]?.props.controls.events.emit( 'open', ...args );
				return newModals;
			} ),
			remove: () => setModals( ( modals ) => {
				return modals.filter( ( modal ) => modal?.id !== id );
			} )
		};
	}
	
	function dynamicControls(): DynamicModalControls {
		return {
			show  : ( Component, modalProps, props ) => setModals( ( modals ) => {
				const newModals = [ ...modals ];
				const id = nanoid( 16 );
				newModals.push( {
					id,
					open : false,
					Component,
					modalProps,
					props: { ...props, controls: controls( id, true ) }
				} );
				setTimeout( () => setModals( ( modals ) => {
					const index = modals.findIndex( modal => modal?.id === id );
					if ( index === -1 ) return modals;
					const newModals = [ ...modals ];
					newModals[ index ] = { ...newModals[ index ], open: true };
					return newModals;
				} ), 0 );
				return newModals;
			} ),
			close : ( id ) => {
				const modal = modals.find( modal => modal?.id === id );
				modal?.props.controls.close();
			},
			status: ( id ) => {
				const modal = modals.find( modal => modal?.id === id );
				return modal?.props.controls.status();
			}
		};
	}
	
	return <ModalContext.Provider value={( id?, Component?, modalProps?, props? ) => {
		if ( !id ) return dynamicControls() as any;
		
		const index = modals.findIndex( modal => modal?.id === id );
		let modalControls: ModalControls;
		setModals( ( modals ) => {
			const newModals = [ ...modals ];
			if ( index === -1 ) {
				modalControls = controls( id );
				newModals.push( {
					id,
					open : false,
					Component,
					modalProps,
					props: { ...props, controls: modalControls }
				} );
			} else {
				modalControls = newModals[ index ]?.props.controls;
				if ( !isEqual( modalProps, newModals[ index ]?.modalProps ) )
					newModals[ index ] = { ...newModals[ index ], Component, modalProps };
				else
					return modals;
			}
			return newModals;
		} );
		return staticControls( id, modalControls ) as any;
	}}>
		{children}
		{modals.map( ( modal ) => {
			if ( !modal?.id ) return null;
			return <ModalControlsContext.Provider key={modal.id} value={modal.props.controls}>
				<PageModal
					open={modal.open}
					onClose={() => modal.props.controls.close()}
					{...modal.modalProps}>
					<modal.Component {...modal.props}/>
				</PageModal>
			</ModalControlsContext.Provider>;
		} )}
	</ModalContext.Provider>;
}

export function useModal(): DynamicModalControls;
export function useModal<T>(
	Component: React.ComponentType<T & { controls: ModalControls }>,
	modalProps?: Partial<ComponentProps<typeof PageModal>>,
	props?: T
): StaticModalControls;
export function useModal<T>(
	Component?: React.ComponentType<T & { controls: ModalControls }>,
	modalProps?: Partial<ComponentProps<typeof PageModal>>,
	props?: T
) {
	if ( !Component ) return React.useContext<C2>( ModalContext )();
	
	const id = React.useMemo( () => nanoid( 16 ), [] );
	const context = React.useContext<C1<T>>( ModalContext );
	
	const [ controls, setControls ] = React.useState<StaticModalControls<T>>( {} as never );
	
	React.useEffect( () => {
		const controls = context( id, Component, { keepMounted: true, ...modalProps }, props );
		setControls( controls );
		return controls.remove;
	}, [] );
	
	return controls;
}

export function useModalControls() {
	return React.useContext( ModalControlsContext );
}

export function withModal( Component ) {
	return ( props ) => <ModalContext.Consumer>
		{( modal ) => <Component modal={modal} {...props}/>}
	</ModalContext.Consumer>;
}
