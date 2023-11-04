import { ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material';
import { Link, Table as JoyTable } from '@mui/joy';
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
					<JoyTable
						sx={{ 'tbody tr': onRowClick ? { cursor: 'pointer' } : undefined }}
						{...props}
					/>
				),
				TableRow: ({ item, children, ...props }) => (
					<tr onClick={onRowClick ? () => onRowClick(item, table) : undefined} {...props}>
						{children}
					</tr>
				),
			}}
			data={rows}
			fixedHeaderContent={() =>
				table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th
								key={header.id}
								colSpan={header.colSpan}
								style={{ width: `${header.column.columnDef.size}%` }}>
								{header.isPlaceholder ? null : (
									<Link
										underline='none'
										color='neutral'
										disabled={!header.column.getCanSort()}
										startDecorator={
											header.column.getCanSort() && (
												<ArrowDownwardIcon
													sx={{ opacity: header.column.getIsSorted() ? 1 : 0 }}
												/>
											)
										}
										sx={{
											'& svg': {
												transition: '0.2s',
												transform:
													header.column.getIsSorted() === 'asc'
														? 'rotate(180deg)'
														: 'rotate(0deg)',
											},
										}}
										onClick={header.column.getToggleSortingHandler()}>
										{flexRender(header.column.columnDef.header, header.getContext())}
									</Link>
								)}
							</th>
						))}
					</tr>
				))
			}
			itemContent={(index, row) =>
				row.getVisibleCells().map((cell) => (
					<td key={cell.id} {...cell.column.columnDef.meta?.props?.(cell)}>
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</td>
				))
			}
			fixedFooterContent={() =>
				table.getFooterGroups().map((footerGroup) => {
					if (!footerGroup.headers.map(pget('column.columnDef.footer')).some(Boolean))
						return null;
					return (
						<tr key={footerGroup.id}>
							{footerGroup.headers.map((footer) => (
								<td key={footer.id}>
									{footer.isPlaceholder
										? null
										: flexRender(footer.column.columnDef.footer, footer.getContext())}
								</td>
							))}
						</tr>
					);
				})
			}
		/>
	);
}
