import {
	Table as MuiTable,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableRow,
	tableRowClasses,
	TableSortLabel
} from '@mui/material';
import type { RowData, Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { Fragment, useState } from 'react';
import Virtualizer from '../virtualizer';

export default function VirtualTable<VData extends RowData>( { table }: { table: Table<VData> } ) {
	const [ rowRef, setRowRef ] = useState<HTMLTableRowElement>();
	
	const paddingStart = rowRef?.getBoundingClientRect().top + window.scrollY || 0;
	
	const { rows: [ firstRow, ...restRows ] } = table.getRowModel();
	
	const { onRowClick } = table.options.meta;
	
	const renderBodyRow = ( row, ref ) => (
		<TableRow
			key={row.id}
			ref={ref}
			hover={Boolean( onRowClick )}
			onClick={onRowClick ? () => onRowClick( row, table ) : undefined}>
			{row.getVisibleCells().map( ( cell ) => (
				<TableCell key={cell.id} className={cell.column.columnDef.meta?.className?.( cell )}>
					{flexRender( cell.column.columnDef.cell, cell.getContext() )}
				</TableCell>
			) )}
		</TableRow>
	);
	
	return (
		<MuiTable
			size='small'
			sx={{
				tableLayout                          : 'fixed',
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
				{firstRow && renderBodyRow( firstRow, setRowRef )}
				{rowRef && (
					<Virtualizer rows={restRows} estimateSize={rowRef.clientHeight} paddingStart={paddingStart}>
						{( virtualItems, paddingTop, paddingBottom ) => (
							<Fragment>
								{paddingTop > 0 && (
									<TableRow>
										<TableCell sx={{ height: paddingTop, columnSpan: 'all' }}/>
									</TableRow>
								)}
								{virtualItems.map( ( { index, measureElement } ) => {
									const row = restRows[ index ];
									return <Fragment key={row.id}>{renderBodyRow( row, measureElement )}</Fragment>;
								} )}
								{paddingBottom > 0 && (
									<TableRow>
										<TableCell sx={{ height: paddingBottom, columnSpan: 'all' }}/>
									</TableRow>
								)}
							</Fragment>
						)}
					</Virtualizer>
				)}
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
