import { Button, ButtonProps, Menu, MenuProps } from '@mui/material';
import { ReactNode, useState } from 'react';

export default function ButtonMenu( { children, onClick, menuProps, renderMenu, ...props }: {
	renderMenu: ( closeMenu: () => void ) => ReactNode,
	menuProps?: MenuProps
} & ButtonProps ) {
	const [ anchorEl, setAnchorEl ] = useState( null );
	
	return <>
		<Button
			{...props}
			onClick={( e ) => {
				e.stopPropagation();
				setAnchorEl( e.currentTarget );
				onClick?.( e );
			}}>{children}</Button>
		<Menu
			anchorEl={anchorEl}
			open={Boolean( anchorEl )}
			onClose={() => setAnchorEl( null )}
			{...menuProps}>
			{renderMenu( () => setAnchorEl( null ) )}
		</Menu>
	</>;
}
