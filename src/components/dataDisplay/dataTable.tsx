import {
	Table as MuiTable,
	TableBody,
	TableCell,
	tableCellClasses,
	TableFooter,
	TableHead,
	TableRow,
	tableRowClasses,
	TableSortLabel, Typography
} from '@mui/material';
import type { Row, RowData, Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { keyBy, map } from 'lodash-es';
import { Fragment } from 'react';
import Sortable from '../sortable';

export default function DataTable<TData extends RowData>( { table }: { table: Table<TData> } ) {
	const { rows } = table.getRowModel();
	
	if ( !rows.length ) return <Typography textAlign='center'>No Items</Typography>;
	
	const { onRowClick, renderSubComponent, setData } = table.options.meta;
	
	const columns = keyBy( table.getAllColumns(), 'id' );
	const colSpan = table.getAllFlatColumns().length;
	
	const renderRowItem = ( row: Row<TData> ) => (
		<Fragment key={row.id}>
			<TableRow
				hover={Boolean( onRowClick )}
				onClick={onRowClick ? () => onRowClick( row, table ) : undefined}>
				{row.getVisibleCells().map( ( cell ) => (
					<TableCell
						key={cell.id}
						{...cell.column.columnDef.meta?.props?.( cell )}>
						{flexRender( cell.column.columnDef.cell, cell.getContext() )}
					</TableCell>
				) )}
			</TableRow>
			{row.getIsExpanded() && (
				<TableRow sx={{ bgcolor: ( { palette } ) => palette.background.paper }}>
					<TableCell colSpan={colSpan}>
						{renderSubComponent( row, table )}
					</TableCell>
				</TableRow>
			)}
		</Fragment>
	);
	
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
									width   : `${header.column.columnDef.size}%`,
									position: 'sticky',
									top     : 0,
									bgcolor : ( { palette } ) => palette.background.paper
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
			{columns._sort ? (
				<Sortable
					items={rows}
					setItems={( rows ) => setData( map( rows, 'original' ) )}
					renderItem={( { item } ) => renderRowItem( item )}
					tag={TableBody}
				/>
			) : (
				<TableBody>
					{rows.map( renderRowItem )}
				</TableBody>
			)}
			<TableFooter>
				{table.getFooterGroups().map( ( footerGroup ) => (
					<TableRow key={footerGroup.id}>
						{footerGroup.headers.map( ( header ) => (
							<TableCell
								key={header.id}
								sx={{ borderBottom: header.column.columnDef.footer ? undefined : 'unset' }}>
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
