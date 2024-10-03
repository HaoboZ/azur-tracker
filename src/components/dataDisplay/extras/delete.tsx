import { Close as CloseIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import type { DisplayColumnDef, Row, Table } from '@tanstack/react-table';
import pget from '../../../helpers/pget';

export const deleteColumn = (size = 2) =>
	({
		id: '_delete',
		size,
		cell: ({ row, table }) => (
			<IconButton
				onClick={(e) => {
					e.stopPropagation();
					table.options.meta.setData(
						table
							.getRowModel()
							.rows.filter(({ id }) => id !== row.id)
							.map(pget('original')),
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
						.map(pget('original')),
				);
			}}>
			<CloseIcon />
		</IconButton>
	);
}
