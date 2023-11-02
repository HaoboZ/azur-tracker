import { Checkbox, ListItemDecorator } from '@mui/joy';
import type { DisplayColumnDef, Row } from '@tanstack/react-table';

export const selectColumn = (size = 2) =>
	({
		id: '_select',
		size,
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllRowsSelected()}
				indeterminate={table.getIsSomeRowsSelected()}
				onChange={table.getToggleAllRowsSelectedHandler()}
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				indeterminate={row.getIsSomeSelected()}
				onClick={(e) => e.stopPropagation()}
				onChange={row.getToggleSelectedHandler()}
			/>
		),
	}) as DisplayColumnDef<any>;

export function selectIcon<TData>(row: Row<TData>) {
	return (
		<ListItemDecorator>
			<Checkbox
				checked={row.getIsSelected()}
				indeterminate={row.getIsSomeSelected()}
				onClick={(e) => e.stopPropagation()}
				onChange={row.getToggleSelectedHandler()}
			/>
		</ListItemDecorator>
	);
}
