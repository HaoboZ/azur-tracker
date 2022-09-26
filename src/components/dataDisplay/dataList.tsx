import { List, ListItem, ListItemButton, listItemButtonClasses, listItemClasses } from '@mui/material';
import type { RowData, Table } from '@tanstack/react-table';
import { Fragment } from 'react';

export default function DataList<TData extends RowData>( { table }: { table: Table<TData> } ) {
	const { rows } = table.getRowModel();
	
	const { renderRow, onRowClick, renderSubComponent } = table.options.meta;
	
	return (
		<List
			dense
			disablePadding
			sx={{ [ `.${listItemClasses.root},.${listItemButtonClasses.root}` ]: { whiteSpace: 'nowrap' } }}>
			{rows.map( ( row ) => (
				<Fragment key={row.id}>
					<ListItem divider disablePadding={Boolean( onRowClick )}>
						{onRowClick ? (
							<ListItemButton onClick={() => onRowClick( row, table )}>
								{renderRow( row, table )}
							</ListItemButton>
						) : renderRow( row, table )}
					</ListItem>
					{row.getIsExpanded() && (
						<ListItem divider sx={{ backgroundColor: ( { palette } ) => palette.background.paper }}>
							{renderSubComponent( row, table )}
						</ListItem>
					)}
				</Fragment>
			) )}
		</List>
	);
}
