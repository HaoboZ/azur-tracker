import { Menu as MenuIcon } from '@mui/icons-material';
import { ListItemIcon } from '@mui/material';
import type { DisplayColumnDef } from '@tanstack/table-core';

export const sortColumn = () => ( {
	id  : '_sort',
	size: 0,
	cell: () => <MenuIcon className='sortable-handle'/>
} ) as DisplayColumnDef<any>;

export function sortIcon() {
	return (
		<ListItemIcon sx={{ alignItems: 'center' }}>
			<MenuIcon className='sortable-handle'/>
		</ListItemIcon>
	);
}
