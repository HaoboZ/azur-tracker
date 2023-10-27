import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	accordionSummaryClasses,
	List,
	ListItem,
	ListItemButton,
	listItemSecondaryActionClasses,
	Typography,
} from '@mui/material';
import type { Cell, Row, RowData, Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { indexBy } from 'remeda';
import pget from '../../helpers/pget';
import Sortable from '../sortable';

export default function DataList<TData extends RowData>({ table }: { table: Table<TData> }) {
	const { rows } = table.getRowModel();

	if (!rows.length) return <Typography textAlign='center'>No Items</Typography>;

	const { renderRow, onRowClick, renderSubComponent, setData } = table.options.meta;

	const renderRowItem = (row: Row<TData>, containerProps?, handleProps?) => {
		const cells = indexBy(row.getVisibleCells(), ({ column }) => column.id);
		const render = (cell: Cell<TData, unknown>) =>
			flexRender(cell.column.columnDef.cell, cell.getContext()) as any;

		return renderSubComponent ? (
			<Accordion
				key={row.id}
				{...containerProps}
				expanded={row.getIsExpanded()}
				onChange={
					onRowClick
						? () => onRowClick(row, table)
						: (e, expanded) => row.toggleExpanded(expanded)
				}>
				<AccordionSummary className='listItem' expandIcon={<ExpandMoreIcon />}>
					{renderRow({ cells, render, row, table, handleProps })}
				</AccordionSummary>
				<AccordionDetails>{renderSubComponent(row, table)}</AccordionDetails>
			</Accordion>
		) : (
			<ListItem key={row.id} {...containerProps} divider disablePadding={Boolean(onRowClick)}>
				{onRowClick ? (
					<ListItemButton onClick={() => onRowClick(row, table)}>
						{renderRow({ cells, render, row, table, handleProps })}
					</ListItemButton>
				) : (
					renderRow({ cells, render, row, table, handleProps })
				)}
			</ListItem>
		);
	};

	return (
		<List
			dense
			disablePadding
			sx={{
				[`.${accordionSummaryClasses.content}`]: {
					m: '0 !important',
					[`.${listItemSecondaryActionClasses.root}`]: { right: 36 },
				},
			}}>
			{table.getAllColumns().find(({ id }) => id === '_sort') ? (
				<Sortable
					items={rows}
					setItems={(rows) => setData(rows.map(pget('original')))}
					renderItem={renderRowItem}
				/>
			) : (
				rows.map((row) => renderRowItem(row))
			)}
		</List>
	);
}
