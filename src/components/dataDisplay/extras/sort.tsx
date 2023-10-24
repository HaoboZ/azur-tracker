import { Menu as MenuIcon } from '@mui/icons-material';
import { ListItemIcon } from '@mui/material';
import type { DisplayColumnDef, RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
	interface CellContext<TData extends RowData, TValue> {
		handleProps?;
	}
}

export const sortColumn = () =>
	({
		id: '_sort',
		size: 0,
		cell: ({ handleProps }) => {
			return <MenuIcon {...handleProps} />;
		},
	}) as DisplayColumnDef<any>;

export function sortIcon(handle) {
	return (
		<ListItemIcon sx={{ alignItems: 'center' }}>
			<MenuIcon {...handle} />
		</ListItemIcon>
	);
}
