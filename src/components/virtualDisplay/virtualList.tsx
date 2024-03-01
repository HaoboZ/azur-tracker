'use client';
import { List, ListItem, ListItemButton, listItemClasses } from '@mui/joy';
import type { Cell, RowData, Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { forwardRef } from 'react';
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
				// @ts-ignore
				List: forwardRef(({ style, ...props }, ref) => (
					<List
						ref={ref}
						size='sm'
						style={style}
						{...(props as any)}
						sx={{
							[`.${listItemClasses.root}`]: {
								borderBottom: ({ palette }) => `1px solid ${palette.divider}`,
							},
						}}
					/>
				)),
				Item: ({ item, ...props }) => <ListItem {...props} />,
			}}
			data={rows}
			itemContent={(_, row) => {
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
