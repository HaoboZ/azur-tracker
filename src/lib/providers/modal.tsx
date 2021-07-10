import { ModalProps } from '@material-ui/core';
import React from 'react';

import PageModal from '../../components/pageModal';

type C = {
	showModal: ( props: {
		// make modal fit size of content or full page
		fitSize?: boolean,
		render?: React.ReactNode
	} & Partial<Omit<ModalProps, 'onClose'>> ) => void,
	closeModal: () => void
};

const ModalContext = React.createContext<C>( { showModal: () => null, closeModal: () => null } );
ModalContext.displayName = 'Modal';

export default function ModalProvider( { children } ) {
	const [ open, setOpen ] = React.useState( false );
	const [ props, setProps ] = React.useState<any>();
	const [ render, setRender ] = React.useState<any>();
	
	return <ModalContext.Provider value={{
		showModal : ( { render, ...props } ) => {
			setProps( props );
			setRender( render );
			setOpen( true );
		},
		closeModal: () => setOpen( false )
	}}>
		{children}
		<PageModal
			open={open}
			onClose={() => setOpen( false )}
			{...props}>
			{render}
		</PageModal>
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
