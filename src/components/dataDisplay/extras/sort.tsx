import { Menu as MenuIcon } from '@mui/icons-material';
import { ListItemIcon } from '@mui/material';
import type { ColumnDef } from '@tanstack/react-table';
import type { ReactNode } from 'react';

export const sortColumn: <TData>() => ColumnDef<TData> = () => ( {
	id  : '_sort',
	size: 0,
	cell: () => <MenuIcon className='sortable-handle'/>
} );

export const sortIcon: () => ReactNode = () => (
	<ListItemIcon sx={{ alignItems: 'center' }}>
		<MenuIcon className='sortable-handle'/>
	</ListItemIcon>
);
