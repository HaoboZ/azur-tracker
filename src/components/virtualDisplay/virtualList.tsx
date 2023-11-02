import { Box, List, ListDivider, ListItem, ListItemButton } from '@mui/joy';
import type { Cell, Row, RowData, Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { Fragment, useState } from 'react';
import { indexBy } from 'remeda';
import pget from '../../helpers/pget';
import Virtualizer from './virtualizer';

export default function VirtualList<TData extends RowData>({ table }: { table: Table<TData> }) {
	const [rowRef, setRowRef] = useState<HTMLTableRowElement>();

	const {
		rows: [firstRow, ...restRows],
	} = table.getRowModel();

	const { renderRow, onRowClick } = table.options.meta;

	const renderRowItem = (row: Row<TData>, index, ref) => {
		const cells = indexBy<any>(row.getVisibleCells(), pget('column.id'));
		const render = (cell: Cell<TData, unknown>) =>
			flexRender(cell.column.columnDef.cell, cell.getContext()) as any;

		return (
			<ListItem ref={ref} data-index={index}>
				{onRowClick ? (
					<ListItemButton onClick={() => onRowClick(row, table)}>
						{renderRow({ cells, render, row, table })}
					</ListItemButton>
				) : (
					renderRow({ cells, render, row, table })
				)}
			</ListItem>
		);
	};

	return (
		<List size='sm'>
			{firstRow && renderRowItem(firstRow, 0, setRowRef)}
			{rowRef && (
				<Virtualizer
					rows={restRows}
					estimateSize={rowRef.clientHeight}
					paddingStart={
						rowRef?.getBoundingClientRect().top +
						(typeof window === 'undefined' ? 0 : window.scrollY || 0)
					}>
					{(virtualizer, virtualItems, paddingTop, paddingBottom) => (
						<Fragment>
							<Box height={paddingTop} />
							{virtualItems.map(({ index }) => {
								const row = restRows[index];
								return (
									<Fragment key={row.id}>
										<ListDivider />
										{renderRowItem(row, index, virtualizer.measureElement)}
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
