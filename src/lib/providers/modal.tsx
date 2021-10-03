import { EventEmitter } from 'events';
import { isEqual } from 'lodash';
import { nanoid } from 'nanoid';
import React from 'react';
import ResponsiveModal, { ResponsiveModalProps } from '../../components/responsiveModal';

type ModalInfo = {
	id: string,
	open: boolean,
	Component: React.ComponentType,
	modalProps?: Partial<ResponsiveModalProps>,
	props?: any
};

export type ModalControls = {
	closeModal: ( ...args ) => void,
	events: EventEmitter
};

type StaticModalControls<T> = ModalControls & {
	showModal: ( props?: T, ...args ) => void,
	removeModal: () => void
};

export type DynamicModalControls = {
	showModal: <T>(
		Component?: React.ComponentType<T>,
		modalProps?: Partial<ResponsiveModalProps>,
		props?: T
	) => string,
	closeModal: ( id: string ) => void,
	modalInfo: ( id: string ) => Promise<ModalInfo>
};

type C1<T> = (
	id: string,
	Component: React.ComponentType<T>,
	modalProps?: Partial<ResponsiveModalProps>,
	props?: T
) => StaticModalControls<T>;

type C2 = () => DynamicModalControls;

const ModalContext = React.createContext<C1<any> & C2>( () => ( {
	showModal  : () => null,
	closeModal : () => null,
	modalInfo  : null,
	removeModal: () => null,
	events     : null
} ) );
ModalContext.displayName = 'Modal';

const ModalControlsContext = React.createContext<ModalControls & { modalInfo: ModalInfo }>( {
	closeModal: () => null,
	modalInfo : null,
	events    : null
} );
ModalControlsContext.displayName = 'ModalControls';

export default function ModalProvider( { children } ) {
	const [ modals, setModals ] = React.useState<ModalInfo[]>( [] );
	
	function controls( id: string, remove?: boolean ): ModalControls {
		return {
			closeModal: ( ...args ) => setModals( ( modals ) => {
				const index = modals.findIndex( ( modal ) => modal?.id === id );
				if ( index === -1 ) return modals;
				const newModals = [ ...modals ];
				newModals[ index ] = { ...newModals[ index ], open: false };
				newModals[ index ]?.props.controls.events.emit( 'close', ...args );
				if ( remove ) {
					setTimeout( () => setModals( ( modals ) => {
						return modals.filter( ( modal ) => modal?.id !== id );
					} ), 500 );
				}
				return newModals;
			} ),
			events    : new EventEmitter()
		};
	}
	
	function staticControls( id, controls ): StaticModalControls<any> {
		return {
			...controls,
			showModal  : ( props, ...args ) => setModals( ( modals ) => {
				const index = modals.findIndex( ( modal ) => modal?.id === id );
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
			removeModal: () => setModals( ( modals ) => modals.filter( ( modal ) => modal?.id !== id ) )
		};
	}
	
	function dynamicControls(): DynamicModalControls {
		return {
			showModal : ( Component, modalProps, props ) => {
				const id = nanoid();
				setModals( ( modals ) => {
					const newModals = [ ...modals ];
					newModals.push( {
						id,
						open : false,
						Component,
						modalProps,
						props: { ...props, controls: controls( id, true ) }
					} );
					setTimeout( () => setModals( ( modals ) => {
						const index = modals.findIndex( ( modal ) => modal?.id === id );
						if ( index === -1 ) return modals;
						const newModals = [ ...modals ];
						newModals[ index ] = { ...newModals[ index ], open: true };
						return newModals;
					} ), 0 );
					return newModals;
				} );
				return id;
			},
			closeModal: ( id ) => {
				const modal = modals.find( ( modal ) => modal?.id === id );
				modal?.props.controls.closeModal();
			},
			modalInfo : async ( id ) => await new Promise( ( resolve ) => setModals( ( modals ) => {
				const modal = modals.find( ( modal ) => modal?.id === id );
				resolve( modal );
				return modals;
			} ) )
		};
	}
	
	return <ModalContext.Provider value={( id?, Component?, modalProps?, props? ) => {
		if ( !id ) return dynamicControls() as any;
		
		const index = modals.findIndex( ( modal ) => modal?.id === id );
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
			return <ModalControlsContext.Provider key={modal.id} value={{ ...modal.props.controls, modalInfo: modal }}>
				<ResponsiveModal
					open={modal.open}
					onClose={() => modal.props.controls.closeModal()}
					{...modal.modalProps}>
					<modal.Component {...modal.props}/>
				</ResponsiveModal>
			</ModalControlsContext.Provider>;
		} )}
	</ModalContext.Provider>;
}

/* eslint-disable react-hooks/rules-of-hooks */
export function useModal(): DynamicModalControls;
export function useModal<T>(
	Component: React.ComponentType<T & { controls: ModalControls }>,
	modalProps?: Partial<ResponsiveModalProps>,
	props?: T
): StaticModalControls<T>;
export function useModal<T>(
	Component?: React.ComponentType<T & { controls: ModalControls }>,
	modalProps?: Partial<ResponsiveModalProps>,
	props?: T
) {
	if ( !Component ) return React.useContext<C2>( ModalContext )();
	
	const [ id ] = React.useState( () => nanoid() );
	const context = React.useContext<C1<T>>( ModalContext );
	
	const [ controls, setControls ] = React.useState<StaticModalControls<T>>( {} as never );
	
	React.useEffect( () => {
		const controls = context( id, Component, modalProps, props );
		setControls( controls );
		return controls.removeModal;
	}, [] );
	
	return controls;
}

export function useModalControls() {
	return React.useContext( ModalControlsContext );
}

export function withModal( Component ) {
	return ( props ) => <ModalContext.Consumer>
		{( modal: C2 ) => <Component modal={modal} {...props}/>}
	</ModalContext.Consumer>;
}
