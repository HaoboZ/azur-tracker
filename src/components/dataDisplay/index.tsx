import type { TableCellProps } from '@mui/material';
import type { Cell, Row, RowData, Table, TableOptions } from '@tanstack/react-table';
import {
	getCoreRowModel,
	getExpandedRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import type { ReactNode } from 'react';
import useIsMobile from '../../hooks/useIsMobile';
import OverflowTypography from '../overflowTypography';
import DataList from './dataList';
import DataTable from './dataTable';

declare module '@tanstack/table-core' {
	interface TableMeta<TData extends RowData> {
		setData?: (data: TData[]) => void;
		renderRow?: (row: {
			cells: Record<string, Cell<TData, unknown>>;
			render: (cell: Cell<TData, unknown>) => any;
			row: Row<TData>;
			table: Table<TData>;
		}) => ReactNode;
		onRowClick?: (row: Row<TData>, table: Table<TData>) => void;
		renderSubComponent?: (row: Row<TData>, table: Table<TData>) => ReactNode;
	}

	// noinspection JSUnusedGlobalSymbols
	interface ColumnMeta<TData extends RowData, TValue> {
		props?: (cell: Cell<TData, TValue>) => TableCellProps;
	}
}

export type DataDisplayOptions<TData extends RowData> = {
	setData?: (data: TData[]) => void;
	renderRow?: (row: {
		cells: Record<string, Cell<TData, unknown>>;
		render: (cell: Cell<TData, unknown>) => any;
		row: Row<TData>;
		table: Table<TData>;
	}) => ReactNode;
	onRowClick?: (row: Row<TData>, table: Table<TData>) => void;
	renderSubComponent?: (row: Row<TData>, table: Table<TData>) => ReactNode;
} & Partial<TableOptions<TData>>;

const defaultColumn = {
	cell: ({ getValue }) => <OverflowTypography>{getValue()}</OverflowTypography>,
	size: 10,
};

export function useDataDisplay<TData extends RowData>({
	data,
	setData,
	columns,
	renderRow,
	onRowClick,
	renderSubComponent,
	meta,
	...options
}: DataDisplayOptions<TData>) {
	return useReactTable({
		data,
		columns,
		defaultColumn,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getExpandedRowModel: renderSubComponent ? getExpandedRowModel() : undefined,
		meta: {
			setData,
			renderRow,
			onRowClick,
			renderSubComponent,
			...meta,
		},
		...options,
	});
}

export default function DataDisplay<TData extends RowData>({ table }: { table: Table<TData> }) {
	if (useIsMobile() && table.options.meta.renderRow) {
		return <DataList table={table} />;
	} else {
		return <DataTable table={table} />;
	}
}
