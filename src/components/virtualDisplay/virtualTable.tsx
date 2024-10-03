'use client';
import { ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material';
import {
	Box,
	Table as MuiTable,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TableRow,
} from '@mui/material';
import type { RowData, Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { TableVirtuoso } from 'react-virtuoso';
import pget from '../../helpers/pget';

export default function VirtualTable<TData extends RowData>({ table }: { table: Table<TData> }) {
	const { rows } = table.getRowModel();

	const { onRowClick } = table.options.meta;

	return (
		<TableVirtuoso
			useWindowScroll
			components={{
				Table: (props) => (
					<TableContainer>
						<MuiTable
							sx={{
								'tbody tr': onRowClick ? { cursor: 'pointer' } : undefined,
								'tableLayout': 'fixed',
							}}
							{...props}
						/>
					</TableContainer>
				),
				TableHead,
				TableBody: TableBody as any,
				TableFoot: TableFooter,
				TableRow: ({ item, children, ...props }) => (
					<TableRow
						onClick={onRowClick ? () => onRowClick(item, table) : undefined}
						{...props}>
						{children}
					</TableRow>
				),
			}}
			data={rows}
			fixedHeaderContent={() =>
				table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<TableCell
								key={header.id}
								colSpan={header.colSpan}
								sx={{ width: `${header.column.columnDef.size}%` }}>
								{header.isPlaceholder ? null : (
									<Box
										sx={{ display: 'flex', cursor: 'pointer' }}
										onClick={header.column.getToggleSortingHandler()}>
										{flexRender(header.column.columnDef.header, header.getContext())}
										{header.column.getCanSort() && (
											<ArrowDownwardIcon
												sx={{
													ml: 1,
													opacity: header.column.getIsSorted() ? 1 : 0,
													transition: '0.2s',
													transform:
														header.column.getIsSorted() !== 'desc'
															? 'rotate(0deg)'
															: 'rotate(180deg)',
												}}
											/>
										)}
									</Box>
								)}
							</TableCell>
						))}
					</TableRow>
				))
			}
			itemContent={(index, row) =>
				row.getVisibleCells().map((cell) => (
					<TableCell key={cell.id} {...(cell.column.columnDef.meta?.props?.(cell) as any)}>
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</TableCell>
				))
			}
			fixedFooterContent={() =>
				table.getFooterGroups().map((footerGroup) => {
					if (!footerGroup.headers.map(pget('column.columnDef.footer')).some(Boolean))
						return null;
					return (
						<TableRow key={footerGroup.id}>
							{footerGroup.headers.map((footer) => (
								<TableCell key={footer.id}>
									{footer.isPlaceholder
										? null
										: flexRender(footer.column.columnDef.footer, footer.getContext())}
								</TableCell>
							))}
						</TableRow>
					);
				})
			}
		/>
	);
}
