import {
	Table as MuiTable,
	TableBody,
	TableCell,
	tableCellClasses,
	TableFooter,
	TableHead,
	TableRow,
	tableRowClasses,
	TableSortLabel
} from '@mui/material';
import type { RowData, Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { Fragment } from 'react';

export default function DataTable<TData extends RowData>( { table }: { table: Table<TData> } ) {
	const { rows } = table.getRowModel();
	
	const { onRowClick, renderSubComponent } = table.options.meta;
	
	const colSpan = table.getAllFlatColumns().length;
	
	return (
		<MuiTable
			size='small'
			sx={{
				[ `.${tableCellClasses.root}` ]      : { whiteSpace: 'nowrap' },
				[ `.${tableRowClasses.hover}:hover` ]: onRowClick ? { cursor: 'pointer' } : undefined
			}}>
			<TableHead>
				{table.getHeaderGroups().map( ( headerGroup ) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map( ( header ) => (
							<TableCell
								key={header.id}
								colSpan={header.colSpan}
								sx={{
									width          : `${header.column.columnDef.size}%`,
									position       : 'sticky',
									top            : 0,
									backgroundColor: ( { palette } ) => palette.background.paper
								}}>
								<TableSortLabel
									active={Boolean( header.column.getIsSorted() )}
									hideSortIcon={!header.column.getCanSort()}
									direction={header.column.getIsSorted() || undefined}
									onClick={header.column.getToggleSortingHandler()}>
									{flexRender( header.column.columnDef.header, header.getContext() )}
								</TableSortLabel>
							</TableCell>
						) )}
					</TableRow>
				) )}
			</TableHead>
			<TableBody>
				{rows.map( ( row ) => (
					<Fragment key={row.id}>
						<TableRow
							hover={Boolean( onRowClick )}
							onClick={onRowClick ? () => onRowClick( row, table ) : undefined}>
							{row.getVisibleCells().map( ( cell ) => (
								<TableCell
									key={cell.id}
									className={cell.column.columnDef.meta?.className?.( cell )}>
									{flexRender( cell.column.columnDef.cell, cell.getContext() )}
								</TableCell>
							) )}
						</TableRow>
						{row.getIsExpanded() && (
							<TableRow sx={{ backgroundColor: ( { palette } ) => palette.background.paper }}>
								<TableCell colSpan={colSpan}>
									{renderSubComponent( row, table )}
								</TableCell>
							</TableRow>
						)}
					</Fragment>
				) )}
			</TableBody>
			<TableFooter>
				{table.getFooterGroups().map( ( footerGroup ) => (
					<TableRow key={footerGroup.id}>
						{footerGroup.headers.map( ( header ) => (
							<TableCell key={header.id}>
								{header.isPlaceholder
									? null
									: flexRender( header.column.columnDef.footer, header.getContext() )}
							</TableCell>
						) )}
					</TableRow>
				) )}
			</TableFooter>
		</MuiTable>
	);
}
