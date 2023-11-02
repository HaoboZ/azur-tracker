import { ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material';
import { Link, Table as JoyTable } from '@mui/joy';
import type { Row, RowData, Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { Fragment, useState } from 'react';
import pget from '../../helpers/pget';
import Virtualizer from './virtualizer';

export default function VirtualTable<TData extends RowData>({ table }: { table: Table<TData> }) {
	const [rowRef, setRowRef] = useState<HTMLTableRowElement>();

	const {
		rows: [firstRow, ...restRows],
	} = table.getRowModel();
	const colSpan = table.getAllFlatColumns().length;

	const { onRowClick } = table.options.meta;

	const renderRowItem = (row: Row<TData>, index, ref) => (
		<tr
			ref={ref}
			data-index={index}
			onClick={onRowClick ? () => onRowClick(row, table) : undefined}>
			{row.getVisibleCells().map((cell) => (
				<td key={cell.id} {...cell.column.columnDef.meta?.props?.(cell)}>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</td>
			))}
		</tr>
	);

	return (
		<JoyTable stickyHeader>
			<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th
								key={header.id}
								colSpan={header.colSpan}
								style={{ width: `${header.column.columnDef.size}%` }}>
								{header.isPlaceholder ? null : (
									<Link
										underline='none'
										color='neutral'
										disabled={!header.column.getCanSort()}
										startDecorator={
											header.column.getCanSort() && (
												<ArrowDownwardIcon
													sx={{ opacity: header.column.getIsSorted() ? 1 : 0 }}
												/>
											)
										}
										sx={{
											'& svg': {
												transition: '0.2s',
												transform:
													header.column.getIsSorted() === 'asc'
														? 'rotate(180deg)'
														: 'rotate(0deg)',
											},
										}}
										onClick={header.column.getToggleSortingHandler()}>
										{flexRender(header.column.columnDef.header, header.getContext())}
									</Link>
								)}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{firstRow && renderRowItem(firstRow, 0, setRowRef)}
				{rowRef && (
					<Virtualizer
						rows={restRows}
						estimateSize={rowRef.clientHeight}
						paddingStart={
							rowRef?.getBoundingClientRect().top +
							(typeof window === 'undefined' ? 0 : window?.scrollY || 0)
						}>
						{(virtualizer, virtualItems, paddingTop, paddingBottom) => (
							<Fragment>
								{paddingTop > 0 && (
									<tr>
										<td style={{ height: paddingTop }} colSpan={colSpan} />
									</tr>
								)}
								{virtualItems.map(({ index }) => {
									const row = restRows[index];
									return (
										<Fragment key={row.id}>
											{renderRowItem(row, index, virtualizer.measureElement)}
										</Fragment>
									);
								})}
								{paddingBottom > 0 && (
									<tr>
										<td style={{ height: paddingBottom }} colSpan={colSpan} />
									</tr>
								)}
							</Fragment>
						)}
					</Virtualizer>
				)}
			</tbody>
			<tfoot>
				{table.getFooterGroups().map((footerGroup) => {
					if (!footerGroup.headers.map(pget('column.columnDef.footer')).some(Boolean))
						return null;
					return (
						<tr key={footerGroup.id}>
							{footerGroup.headers.map((footer) => (
								<td key={footer.id}>
									{footer.isPlaceholder
										? null
										: flexRender(footer.column.columnDef.footer, footer.getContext())}
								</td>
							))}
						</tr>
					);
				})}
			</tfoot>
		</JoyTable>
	);
}
