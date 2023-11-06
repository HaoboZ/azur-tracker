'use client';
import { List, ListDivider, ListItem, ListItemButton } from '@mui/joy';
import type { Cell, RowData, Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { Fragment } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { indexBy } from 'remeda';
import pget from '../../helpers/pget';

export default function VirtualList<TData extends RowData>({ table }: { table: Table<TData> }) {
	const { rows } = table.getRowModel();

	const { renderRow, onRowClick } = table.options.meta;

	return (
		<Virtuoso
			useWindowScroll
			components={{
				List: (props) => <List size='sm' {...(props as any)} />,
				Item: ({ item, ...props }) => (
					<Fragment>
						<ListItem {...props} />
						<ListDivider />
					</Fragment>
				),
			}}
			data={rows}
			itemContent={(index, row) => {
				const cells = indexBy<any>(row.getVisibleCells(), pget('column.id'));
				const render = (cell: Cell<TData, unknown>) =>
					flexRender(cell.column.columnDef.cell, cell.getContext()) as any;

				return onRowClick ? (
					<ListItemButton onClick={() => onRowClick(row, table)}>
						{renderRow({ cells, render, row, table })}
					</ListItemButton>
				) : (
					renderRow({ cells, render, row, table })
				);
			}}
		/>
	);
}
