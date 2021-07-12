import React, { ComponentProps } from 'react';

import PageModal from '../../components/pageModal';

type C = {
	showModal: ( props: { render?: ( index: number ) => React.ReactNode }
		& Partial<ComponentProps<typeof PageModal>> ) => void,
	closeModal: ( index: number ) => void,
	getModal: ( index: number ) => {
		open: boolean,
		render?: ( index: number ) => React.ReactNode,
		props: Partial<ComponentProps<typeof PageModal>>
	}
};

const ModalContext = React.createContext<C>( {
	showModal : () => null,
	closeModal: () => null,
	getModal  : () => null
} );
ModalContext.displayName = 'Modal';

export default function ModalProvider( { children } ) {
	const [ modals, setModals ] = React.useState<any[]>( [] );
	
	return <ModalContext.Provider value={{
		showModal : ( { render, ...props } ) => {
			setModals( ( modals ) => [ ...modals, { open: false, props, render } ] );
			setTimeout( () => setModals( ( modals ) => {
				modals.splice( -1, 1, { open: true, props, render } );
				return [ ...modals ];
			} ), 0 );
		},
		closeModal: ( index ) => {
			setModals( ( modals ) => {
				modals[ index ].open = false;
				return [ ...modals ];
			} );
			setTimeout( () => setModals( ( modals ) => {
				modals[ index ] = null;
				return [ ...modals ];
			} ), 500 );
		},
		getModal  : ( index ) => modals[ index ]
	}}>
		{children}
		{modals.map( ( modal, index ) => {
			if ( !modal ) return null;
			return <PageModal
				key={index}
				open={modal.open}
				onClose={() => {
					modal.open = false;
					setModals( ( modals ) => [ ...modals ] );
					setTimeout( () => setModals( ( modals ) => {
						modals[ index ] = null;
						return [ ...modals ];
					} ), 500 );
				}}
				{...modal.props}>
				{modal.render?.( index )}
			</PageModal>;
		} )}
	</ModalContext.Provider>;
}

export function useModal() {
	return React.useContext( ModalContext );
}

export function withModal() {
	return Component => ( props ) => <ModalContext.Consumer>
		{( user ) => <Component user={user} {...props}/>}
	</ModalContext.Consumer>;
}
