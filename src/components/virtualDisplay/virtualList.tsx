import {
	Box,
	List,
	ListItem,
	ListItemButton,
	listItemButtonClasses,
	listItemClasses,
} from '@mui/material';
import type { Cell, RowData, Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { keyBy } from 'lodash';
import { Fragment, useState } from 'react';
import Virtualizer from '../virtualizer';

export default function VirtualList<TData extends RowData>({ table }: { table: Table<TData> }) {
	const [rowRef, setRowRef] = useState<HTMLTableRowElement>();

	const paddingStart = rowRef?.getBoundingClientRect().top + window.scrollY || 0;

	const {
		rows: [firstRow, ...restRows],
	} = table.getRowModel();

	const { renderRow, onRowClick } = table.options.meta;

	const renderBodyRow = (row, index, ref) => {
		const cells = keyBy(row.getVisibleCells(), 'column.id');
		const render = (cell: Cell<TData, unknown>) =>
			flexRender(cell.column.columnDef.cell, cell.getContext()) as any;

		return (
			<ListItem ref={ref} divider data-index={index} disablePadding={Boolean(onRowClick)}>
				{onRowClick ? (
					<ListItemButton onClick={() => onRowClick(row, table)}>
						{renderRow({
							cells,
							render,
							row,
							table,
						})}
					</ListItemButton>
				) : (
					renderRow({
						cells,
						render,
						row,
						table,
					})
				)}
			</ListItem>
		);
	};

	return (
		<List
			dense
			disablePadding
			sx={{
				[`.${listItemClasses.root},.${listItemButtonClasses.root}`]: { whiteSpace: 'nowrap' },
			}}>
			{firstRow && renderBodyRow(firstRow, undefined, setRowRef)}
			{rowRef && (
				<Virtualizer
					rows={restRows}
					estimateSize={rowRef.clientHeight}
					paddingStart={paddingStart}>
					{(virtualizer, virtualItems, paddingTop, paddingBottom) => (
						<Fragment>
							<Box height={paddingTop} />
							{virtualItems.map(({ index }) => {
								const row = restRows[index];
								return (
									<Fragment key={row.id}>
										{renderBodyRow(row, index, virtualizer.measureElement)}
									</Fragment>
								);
							})}
							<Box height={paddingBottom} />
						</Fragment>
					)}
				</Virtualizer>
			)}
		</List>
	);
}
