import type { Cell, FilterFn, Row, RowData, Table, TableOptions } from '@tanstack/react-table';
import {
	getCoreRowModel,
	getExpandedRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table';
import fuzzysort from 'fuzzysort';
import type { ReactNode } from 'react';
import useWideMedia from '../../hooks/useWideMedia';
import OverflowTypography from '../overflowTypography';
import DataList from './dataList';
import DataTable from './dataTable';

declare module '@tanstack/table-core' {
	// noinspection JSUnusedGlobalSymbols
	interface FilterFns {
		fuzzy: FilterFn<unknown>;
	}
	
	// noinspection JSUnusedGlobalSymbols
	interface TableMeta<TData extends RowData> {
		renderRow?: ( row: Row<TData>, table: Table<TData> ) => ReactNode,
		onRowClick?: ( row: Row<TData>, table: Table<TData> ) => void,
		renderSubComponent?: ( row: Row<TData>, table: Table<TData> ) => ReactNode
	}
	
	// noinspection JSUnusedGlobalSymbols
	interface ColumnMeta<TData extends RowData, TValue> {
		className?: ( cell: Cell<TData, TValue> ) => string;
	}
}

export type DataDisplayOptions<TData extends RowData> = {
	renderRow?: ( row: Row<TData>, table: Table<TData> ) => ReactNode,
	onRowClick?: ( row: Row<TData>, table: Table<TData> ) => void,
	renderSubComponent?: ( row: Row<TData>, table: Table<TData> ) => ReactNode
} & Partial<TableOptions<TData>>;

// noinspection JSUnusedGlobalSymbols
const defaultColumn = {
	cell: ( { getValue } ) => <OverflowTypography>{getValue()}</OverflowTypography>,
	size: 10
};

export function useDataDisplay<TData extends RowData>( {
	data,
	columns,
	renderRow,
	onRowClick,
	renderSubComponent,
	meta,
	...options
}: DataDisplayOptions<TData> ) {
	return useReactTable( {
		data,
		columns,
		defaultColumn,
		filterFns          : {
			fuzzy: ( row, columnId, value ) =>
				Boolean( fuzzysort.single( value, String( row.getValue( columnId ) ) ) )
		},
		globalFilterFn     : 'fuzzy',
		getCoreRowModel    : getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel  : getSortedRowModel(),
		getExpandedRowModel: renderSubComponent ? getExpandedRowModel() : undefined,
		meta               : { renderRow, onRowClick, renderSubComponent, ...meta },
		...options
	} );
}

export default function DataDisplay<TData extends RowData>( { table }: { table: Table<TData> } ) {
	if ( useWideMedia() || !table.options.meta.renderRow ) {
		return <DataTable table={table}/>;
	} else {
		return <DataList table={table}/>;
	}
}
