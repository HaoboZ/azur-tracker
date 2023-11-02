import { Menu as MenuIcon } from '@mui/icons-material';
import { ListItemDecorator } from '@mui/joy';
import type { DisplayColumnDef, RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface CellContext<TData extends RowData, TValue> {
		handleProps?;
	}
}

export const sortColumn = (size = 2) =>
	({
		id: '_sort',
		size,
		cell: ({ handleProps }) => {
			return <MenuIcon {...handleProps} />;
		},
	}) as DisplayColumnDef<any>;

export function sortIcon(handle) {
	return (
		<ListItemDecorator>
			<MenuIcon {...handle} />
		</ListItemDecorator>
	);
}
