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
	Typography
} from '@mui/material';
import type { Cell, Row, RowData, Table } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { keyBy, map } from 'lodash-es';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import Sortable from '../sortable';

const SortList = forwardRef<HTMLUListElement, { children: ReactNode }>( ( { children, ...props }, ref ) => (
	<List
		ref={ref}
		dense
		disablePadding
		sx={{
			[ `.${accordionSummaryClasses.content}` ]: {
				m                                            : '0 !important',
				[ `.${listItemSecondaryActionClasses.root}` ]: { right: 36 }
			}
		}}
		{...props}>
		{children}
	</List>
) );

export default function DataList<TData extends RowData>( { table }: { table: Table<TData> } ) {
	const { rows } = table.getRowModel();
	
	if ( !rows.length ) return <Typography textAlign='center'>No Items</Typography>;
	
	const { renderRow, onRowClick, renderSubComponent, setData } = table.options.meta;
	
	const columns = keyBy( table.getAllColumns(), 'id' );
	
	const renderRowItem = ( row: Row<TData> ) => {
		const cells = keyBy( row.getVisibleCells(), 'column.id' );
		const render = ( cell: Cell<TData, unknown> ) => flexRender( cell.column.columnDef.cell, cell.getContext() ) as any;
		
		return renderSubComponent ? (
			<Accordion
				key={row.id}
				expanded={row.getIsExpanded()}
				onChange={onRowClick ? () => onRowClick( row, table ) : ( e, expanded ) => row.toggleExpanded( expanded )}>
				<AccordionSummary className='listItem' expandIcon={<ExpandMoreIcon/>}>
					{renderRow( { cells, render, row, table } )}
				</AccordionSummary>
				<AccordionDetails>
					{renderSubComponent( row, table )}
				</AccordionDetails>
			</Accordion>
		) : (
			<ListItem key={row.id} divider disablePadding={Boolean( onRowClick )}>
				{onRowClick ? (
					<ListItemButton onClick={() => onRowClick( row, table )}>
						{renderRow( { cells, render, row, table } )}
					</ListItemButton>
				) : renderRow( { cells, render, row, table } )}
			</ListItem>
		);
	};
	
	return columns._sort ? (
		<Sortable
			items={rows}
			setItems={( rows ) => setData( map( rows, 'original' ) )}
			renderItem={( { item } ) => renderRowItem( item )}
			tag={SortList}
		/>
	) : (
		<SortList>
			{rows.map( renderRowItem )}
		</SortList>
	);
}
