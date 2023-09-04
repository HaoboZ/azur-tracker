import type { TableCellProps } from '@mui/material';
import type { Cell, Row, RowData, Table, TableOptions } from '@tanstack/react-table';
import {
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import type { ReactNode } from 'react';
import useWideMedia from '../../hooks/useWideMedia';
import OverflowTypography from '../overflowTypography';
import VirtualList from './virtualList';
import VirtualTable from './virtualTable';

declare module '@tanstack/table-core' {
	// noinspection JSUnusedGlobalSymbols
	interface TableMeta<TData extends RowData> {
		setData?: (data: TData[]) => void;
		renderRow?: (row: {
			cells: Record<string, Cell<TData, unknown>>;
			render: (cell: Cell<TData, unknown>) => any;
			row: Row<TData>;
			table: Table<TData>;
		}) => ReactNode;
		onRowClick?: (row: Row<TData>, table: Table<TData>) => void;
	}

	// noinspection JSUnusedGlobalSymbols
	interface ColumnMeta<TData extends RowData, TValue> {
		props?: (cell: Cell<TData, TValue>) => TableCellProps;
	}
}

export type VirtualDisplayOptions<TData extends RowData> = {
	setData?: (data: TData[]) => void;
	renderRow?: (row: {
		cells: Record<string, Cell<TData, unknown>>;
		render: (cell: Cell<TData, unknown>) => any;
		row: Row<TData>;
		table: Table<TData>;
	}) => ReactNode;
	onRowClick?: (row: Row<TData>, table: Table<TData>) => void;
} & Partial<TableOptions<TData>>;

// noinspection JSUnusedGlobalSymbols
const defaultColumn = {
	cell: ({ getValue }) => <OverflowTypography>{getValue()}</OverflowTypography>,
	size: 10,
};

export function useVirtualDisplay<TData extends RowData>({
	data,
	setData,
	columns,
	renderRow,
	onRowClick,
	meta,
	...options
}: VirtualDisplayOptions<TData>) {
	return useReactTable({
		data,
		columns,
		defaultColumn,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		meta: {
			setData,
			renderRow,
			onRowClick,
			...meta,
		},
		...options,
	});
}

export default function VirtualDisplay<TData extends RowData>({ table }: { table: Table<TData> }) {
	if (useWideMedia() || !table.options.meta.renderRow) {
		return <VirtualTable table={table} />;
	} else {
		return <VirtualList table={table} />;
	}
}
