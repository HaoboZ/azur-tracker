'use client';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Divider,
	List,
	ListItem,
	ListItemButton,
	Stack,
	Typography,
} from '@mui/material';
import type { Cell, Row, RowData, Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { Fragment } from 'react';
import { indexBy } from 'remeda';
import pget from '../../helpers/pget';
import Sortable from '../sortable';

export default function DataList<TData extends RowData>({ table }: { table: Table<TData> }) {
	const { rows } = table.getRowModel();

	if (!rows.length) return <Typography sx={{ textAlign: 'center' }}>No Items</Typography>;

	const { renderRow, onRowClick, renderSubComponent, setData } = table.options.meta;

	const renderRowItem = (row: Row<TData>, containerProps?, handleProps?) => {
		const cells = indexBy(row.getVisibleCells(), pget('column.id'));
		const render = (cell: Cell<TData, unknown>) =>
			flexRender(cell.column.columnDef.cell, cell.getContext()) as any;

		return renderSubComponent ? (
			<Accordion
				key={row.id}
				elevation={0}
				{...containerProps}
				expanded={row.getIsExpanded()}
				onChange={
					onRowClick
						? () => onRowClick(row, table)
						: (_, expanded) => row.toggleExpanded(expanded)
				}>
				<AccordionSummary>
					{renderRow({ cells, render, row, table, handleProps })}
				</AccordionSummary>
				<AccordionDetails>{renderSubComponent(row, table)}</AccordionDetails>
			</Accordion>
		) : (
			<Fragment key={row.id}>
				<ListItem {...containerProps}>
					{onRowClick ? (
						<ListItemButton onClick={() => onRowClick(row, table)}>
							{renderRow({ cells, render, row, table, handleProps })}
						</ListItemButton>
					) : (
						renderRow({ cells, render, row, table, handleProps })
					)}
				</ListItem>
				<Divider />
			</Fragment>
		);
	};

	const content = table.getAllColumns().find(({ id }) => id === '_sort') ? (
		<Sortable
			items={rows}
			setItems={(rows) => setData(rows.map(pget('original')))}
			renderItem={renderRowItem}
		/>
	) : (
		rows.map((row) => renderRowItem(row))
	);

	return renderSubComponent ? <Stack>{content}</Stack> : <List>{content}</List>;
}
