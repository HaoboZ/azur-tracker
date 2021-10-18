import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';
import { Button, ButtonGroup, ButtonProps, MenuItem, MenuItemProps, MenuList } from '@mui/material';
import React from 'react';
import ButtonMenu from './buttonMenu';

export type ActionProps = {
	name: React.ReactNode,
	onClick?: React.MouseEventHandler,
	buttonProps?: ButtonProps,
	menuItemProps?: MenuItemProps
};

export default function Actions( { items, max }: {
	items: ActionProps[],
	// max number of buttons displayed
	max?: number
} ) {
	const [ buttons, menu ] = React.useMemo( () => {
		const filtered = items.filter( Boolean );
		if ( !max || filtered.length <= max ) return [ filtered, [] ];
		
		const buttons = filtered.slice( 0, max );
		const menu = filtered.slice( max );
		return [ buttons, menu ];
	}, [ items, max ] );
	
	return <ButtonGroup>
		{buttons.map( ( { name, onClick, buttonProps }, index ) => <Button
			key={index}
			variant='contained'
			onClick={onClick}
			{...buttonProps}>
			{name}
		</Button> )}
		{menu.length && <ButtonMenu renderMenu={( closeMenu ) => <MenuList>
			{menu.map( ( { name, onClick, menuItemProps }, index ) => <MenuItem
				key={index}
				onClick={( e ) => {
					onClick( e );
					closeMenu();
				}}
				{...menuItemProps}>
				{name}
			</MenuItem> )}
		</MenuList>}>
			<MoreHorizIcon/>
		</ButtonMenu>}
	</ButtonGroup>;
}