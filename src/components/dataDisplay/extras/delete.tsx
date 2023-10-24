import { Close as CloseIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import type { DisplayColumnDef, Row, Table } from '@tanstack/react-table';
import { path } from 'rambdax';

export const deleteColumn = () =>
	({
		id: '_delete',
		size: 0,
		cell: ({ row, table }) => (
			<IconButton
				onClick={(e) => {
					e.stopPropagation();
					table.options.meta.setData(
						table
							.getRowModel()
							.rows.filter(({ id }) => id !== row.id)
							.map(path('original')),
					);
				}}>
				<CloseIcon />
			</IconButton>
		),
	}) as DisplayColumnDef<any>;

export function deleteIcon<TData>(row: Row<TData>, table: Table<TData>) {
	return (
		<IconButton
			onClick={(e) => {
				e.stopPropagation();
				table.options.meta.setData(
					table
						.getRowModel()
						.rows.filter(({ id }) => id !== row.id)
						.map(path('original')),
				);
			}}>
			<CloseIcon />
		</IconButton>
	);
}
