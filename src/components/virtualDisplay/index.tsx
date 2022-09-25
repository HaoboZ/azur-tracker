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

export type VirtualDisplayOptions<VData extends RowData> = {
	renderRow?: ( row: Row<VData>, table: Table<VData> ) => ReactNode,
	onRowClick?: ( row: Row<VData>, table: Table<VData> ) => void
} & Partial<TableOptions<VData>>;

// noinspection JSUnusedGlobalSymbols
const defaultColumn = {
	cell: ( { getValue } ) => <OverflowTypography>{getValue() as any}</OverflowTypography>
};

export function useVirtualDisplay<VData extends RowData>( {
	data,
	columns,
	renderRow,
	onRowClick,
	meta,
	...options
}: VirtualDisplayOptions<VData> ) {
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

export default function VirtualDisplay<VData extends RowData>( { table }: { table: Table<VData> } ) {
	if ( useWideMedia() || !table.options.meta.renderRow ) {
		return <VirtualTable table={table}/>;
	} else {
		return <VirtualList table={table}/>;
	}
}
