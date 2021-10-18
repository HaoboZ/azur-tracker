import { Button, ButtonProps, Menu, MenuProps } from '@mui/material';
import React from 'react';

export default function ButtonMenu( { children, onClick, menuProps, renderMenu, ...props }: {
	renderMenu: ( closeMenu: () => void ) => React.ReactNode,
	menuProps?: MenuProps
} & ButtonProps ) {
	const [ anchorEl, setAnchorEl ] = React.useState( null );
	
	return <>
		<Button
			{...props}
			onClick={( e ) => {
				e.stopPropagation();
				setAnchorEl( e.currentTarget );
				onClick?.( e );
			}}>{children}</Button>
		<Menu
			// anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			// transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			anchorEl={anchorEl}
			open={Boolean( anchorEl )}
			onClose={() => setAnchorEl( null )}
			{...menuProps}>
			{renderMenu( () => setAnchorEl( null ) )}
		</Menu>
	</>;
}
