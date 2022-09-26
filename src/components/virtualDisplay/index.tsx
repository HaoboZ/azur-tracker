import type { Cell, FilterFn, Row, RowData, Table, TableOptions } from '@tanstack/react-table';
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import fuzzysort from 'fuzzysort';
import type { ReactNode } from 'react';
import useWideMedia from '../../hooks/useWideMedia';
import OverflowTypography from '../overflowTypography';
import VirtualList from './virtualList';
import VirtualTable from './virtualTable';

declare module '@tanstack/table-core' {
	// noinspection JSUnusedGlobalSymbols
	interface FilterFns {
		fuzzy: FilterFn<unknown>
	}
	
	// noinspection JSUnusedGlobalSymbols
	interface TableMeta<TData extends RowData> {
		renderRow?: ( row: Row<TData>, table: Table<TData> ) => ReactNode,
		onRowClick?: ( row: Row<TData>, table: Table<TData> ) => void
	}
	
	// noinspection JSUnusedGlobalSymbols
	interface ColumnMeta<TData extends RowData, TValue> {
		className?: ( cell: Cell<TData, TValue> ) => string
	}
}

export type VirtualDisplayOptions<TData extends RowData> = {
	renderRow?: ( row: Row<TData>, table: Table<TData> ) => ReactNode,
	onRowClick?: ( row: Row<TData>, table: Table<TData> ) => void
} & Partial<TableOptions<TData>>;

// noinspection JSUnusedGlobalSymbols
const defaultColumn = {
	cell: ( { getValue } ) => <OverflowTypography>{getValue()}</OverflowTypography>,
	size: 10
};

export function useVirtualDisplay<TData extends RowData>( {
	data,
	columns,
	renderRow,
	onRowClick,
	meta,
	...options
}: VirtualDisplayOptions<TData> ) {
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
		meta               : { renderRow, onRowClick, ...meta },
		...options
	} );
}

export default function VirtualDisplay<TData extends RowData>( { table }: { table: Table<TData> } ) {
	if ( useWideMedia() || !table.options.meta.renderRow ) {
		return <VirtualTable table={table}/>;
	} else {
		return <VirtualList table={table}/>;
	}
}
