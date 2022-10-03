import { Menu as MenuIcon } from '@mui/icons-material';
import { ListItemIcon } from '@mui/material';
import type { DisplayColumnDef } from '@tanstack/table-core';
import type { ReactNode } from 'react';

export const sortColumn: () => DisplayColumnDef<any> = () => ( {
	id  : '_sort',
	size: 0,
	cell: () => <MenuIcon className='sortable-handle'/>
} );

export const sortIcon: () => ReactNode = () => (
	<ListItemIcon sx={{ alignItems: 'center' }}>
		<MenuIcon className='sortable-handle'/>
	</ListItemIcon>
);
