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
	Typography,
} from '@mui/material';
import type { Row, RowData, Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { Fragment } from 'react';
import pget from '../../helpers/pget';
import Sortable from '../sortable';

export default function DataTable<TData extends RowData>({ table }: { table: Table<TData> }) {
	const { rows } = table.getRowModel();

	if (!rows.length) return <Typography sx={{ textAlign: 'center' }}>No Items</Typography>;

	const { onRowClick, renderSubComponent, setData } = table.options.meta;
	const colSpan = table.getAllFlatColumns().length;

	const renderRowItem = (row: Row<TData>, containerProps?, handleProps?) => (
		<Fragment key={row.id}>
			<TableRow
				{...containerProps}
				onClick={onRowClick ? () => onRowClick(row, table) : undefined}>
				{row.getVisibleCells().map((cell) => (
					<TableCell key={cell.id} {...(cell.column.columnDef.meta?.props?.(cell) as any)}>
						{flexRender(cell.column.columnDef.cell, {
							...cell.getContext(),
							handleProps: cell.column.id === '_sort' ? handleProps : undefined,
						})}
					</TableCell>
				))}
			</TableRow>
			{row.getIsExpanded() && (
				<TableRow>
					<TableCell colSpan={colSpan}>{renderSubComponent(row, table)}</TableCell>
				</TableRow>
			)}
		</Fragment>
	);

	return (
		<TableContainer>
			<MuiTable stickyHeader sx={{ tableLayout: 'fixed' }}>
				<TableHead>
					{table.getHeaderGroups().map((headerGroup) => (
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
					))}
				</TableHead>
				<TableBody>
					{table.getAllColumns().find(({ id }) => id === '_sort') ? (
						<Sortable
							items={rows}
							setItems={(rows) => setData(rows.map(pget('original')))}
							renderItem={renderRowItem}
						/>
					) : (
						rows.map((row) => renderRowItem(row))
					)}
				</TableBody>
				<TableFooter>
					{table.getFooterGroups().map((footerGroup) => {
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
					})}
				</TableFooter>
			</MuiTable>
		</TableContainer>
	);
}
