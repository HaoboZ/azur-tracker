'use client';
import { ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material';
import { Link, Table as JoyTable, Typography } from '@mui/joy';
import type { Row, RowData, Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { Fragment } from 'react';
import pget from '../../helpers/pget';
import Sortable from '../sortable';

export default function DataTable<TData extends RowData>({ table }: { table: Table<TData> }) {
	const { rows } = table.getRowModel();

	if (!rows.length) return <Typography textAlign='center'>No Items</Typography>;

	const { onRowClick, renderSubComponent, setData } = table.options.meta;
	const colSpan = table.getAllFlatColumns().length;

	const renderRowItem = (row: Row<TData>, containerProps?, handleProps?) => (
		<Fragment key={row.id}>
			<tr {...containerProps} onClick={onRowClick ? () => onRowClick(row, table) : undefined}>
				{row.getVisibleCells().map((cell) => (
					<td key={cell.id} {...cell.column.columnDef.meta?.props?.(cell)}>
						{flexRender(cell.column.columnDef.cell, {
							...cell.getContext(),
							handleProps: cell.column.id === '_sort' ? handleProps : undefined,
						})}
					</td>
				))}
			</tr>
			{row.getIsExpanded() && (
				<tr>
					<td colSpan={colSpan}>{renderSubComponent(row, table)}</td>
				</tr>
			)}
		</Fragment>
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
													header.column.getIsSorted() === 'desc'
														? 'rotate(0deg)'
														: 'rotate(180deg)',
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
				{table.getAllColumns().find(({ id }) => id === '_sort') ? (
					<Sortable
						items={rows}
						setItems={(rows) => setData(rows.map(pget('original')))}
						renderItem={renderRowItem}
					/>
				) : (
					rows.map((row) => renderRowItem(row))
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
