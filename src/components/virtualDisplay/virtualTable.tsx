import {
	Table as MuiTable,
	TableBody,
	TableCell,
	tableCellClasses,
	TableFooter,
	TableHead,
	TableRow,
	tableRowClasses,
	TableSortLabel,
} from '@mui/material';
import type { RowData, Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { Fragment, useState } from 'react';
import Virtualizer from './virtualizer';

export default function VirtualTable<TData extends RowData>({ table }: { table: Table<TData> }) {
	const [rowRef, setRowRef] = useState<HTMLTableRowElement>();

	const paddingStart =
		rowRef?.getBoundingClientRect().top +
		(typeof window === 'undefined' ? 0 : window?.scrollY || 0);

	const {
		rows: [firstRow, ...restRows],
	} = table.getRowModel();

	const { onRowClick } = table.options.meta;

	const colSpan = table.getAllFlatColumns().length;

	const renderBodyRow = (row, index, ref) => (
		<TableRow
			ref={ref}
			data-index={index}
			hover={Boolean(onRowClick)}
			onClick={onRowClick ? () => onRowClick(row, table) : undefined}>
			{row.getVisibleCells().map((cell) => (
				<TableCell key={cell.id} {...cell.column.columnDef.meta?.props?.(cell)}>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			))}
		</TableRow>
	);

	return (
		<MuiTable
			size='small'
			sx={{
				tableLayout: 'fixed',
				[`.${tableCellClasses.root}`]: { whiteSpace: 'nowrap' },
				[`.${tableRowClasses.hover}:hover`]: onRowClick ? { cursor: 'pointer' } : undefined,
			}}>
			<TableHead>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<TableCell
								key={header.id}
								colSpan={header.colSpan}
								sx={{
									width: `${header.column.columnDef.size}%`,
									position: 'sticky',
									top: 0,
									bgcolor: ({ vars }: any) => vars.palette.background.paper,
								}}>
								<TableSortLabel
									active={Boolean(header.column.getIsSorted())}
									hideSortIcon={!header.column.getCanSort()}
									direction={header.column.getIsSorted() || undefined}
									onClick={header.column.getToggleSortingHandler()}>
									{flexRender(header.column.columnDef.header, header.getContext())}
								</TableSortLabel>
							</TableCell>
						))}
					</TableRow>
				))}
			</TableHead>
			<TableBody>
				{firstRow && renderBodyRow(firstRow, undefined, setRowRef)}
				{rowRef && (
					<Virtualizer
						rows={restRows}
						estimateSize={rowRef.clientHeight}
						paddingStart={paddingStart}>
						{(virtualizer, virtualItems, paddingTop, paddingBottom) => (
							<Fragment>
								{paddingTop > 0 && (
									<TableRow>
										<TableCell sx={{ height: paddingTop }} colSpan={colSpan} />
									</TableRow>
								)}
								{virtualItems.map(({ index }) => {
									const row = restRows[index];
									return (
										<Fragment key={row.id}>
											{renderBodyRow(row, index, virtualizer.measureElement)}
										</Fragment>
									);
								})}
								{paddingBottom > 0 && (
									<TableRow>
										<TableCell sx={{ height: paddingBottom }} colSpan={colSpan} />
									</TableRow>
								)}
							</Fragment>
						)}
					</Virtualizer>
				)}
			</TableBody>
			<TableFooter>
				{table.getFooterGroups().map((footerGroup) => (
					<TableRow key={footerGroup.id}>
						{footerGroup.headers.map((header) => (
							<TableCell
								key={header.id}
								sx={{ borderBottom: header.column.columnDef.footer ? undefined : 'unset' }}>
								{header.isPlaceholder
									? null
									: flexRender(header.column.columnDef.footer, header.getContext())}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableFooter>
		</MuiTable>
	);
}
