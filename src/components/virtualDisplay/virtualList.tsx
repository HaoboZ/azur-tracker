import { Box, List, ListItem, ListItemButton, listItemButtonClasses, listItemClasses } from '@mui/material';
import type { RowData, Table } from '@tanstack/react-table';
import { Fragment, useState } from 'react';
import Virtualizer from '../virtualizer';

export default function VirtualList<TData extends RowData>( { table }: { table: Table<TData> } ) {
	const [ rowRef, setRowRef ] = useState<HTMLTableRowElement>();
	
	const paddingStart = rowRef?.getBoundingClientRect().top + window.scrollY || 0;
	
	const { rows: [ firstRow, ...restRows ] } = table.getRowModel();
	
	const { renderRow, onRowClick } = table.options.meta;
	
	const renderBodyRow = ( row, ref ) => (
		<ListItem ref={ref} divider disablePadding={Boolean( onRowClick )}>
			{onRowClick ? (
				<ListItemButton onClick={() => onRowClick( row, table )}>
					{renderRow( row, table )}
				</ListItemButton>
			) : renderRow( row, table )}
		</ListItem>
	);
	
	return (
		<List
			dense
			disablePadding
			sx={{ [ `.${listItemClasses.root},.${listItemButtonClasses.root}` ]: { whiteSpace: 'nowrap' } }}>
			{firstRow && renderBodyRow( firstRow, setRowRef )}
			{rowRef && (
				<Virtualizer rows={restRows} estimateSize={rowRef.clientHeight} paddingStart={paddingStart}>
					{( virtualItems, paddingTop, paddingBottom ) => (
						<Fragment>
							<Box height={paddingTop}/>
							{virtualItems.map( ( { index, measureElement } ) => {
								const row = restRows[ index ];
								return <Fragment key={row.id}>{renderBodyRow( row, measureElement )}</Fragment>;
							} )}
							<Box height={paddingBottom}/>
						</Fragment>
					)}
				</Virtualizer>
			)}
		</List>
	);
}
