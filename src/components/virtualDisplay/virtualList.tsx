import { Box, ListItem, ListItemButton, Paper } from '@mui/material';
import type { RowData, Table } from '@tanstack/react-table';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export default function VirtualList<VData extends RowData>( { table }: { table: Table<VData> } ) {
	const paperRef = useRef<HTMLDivElement>();
	
	const paddingStart = paperRef.current?.getBoundingClientRect().top + window.scrollY || 0;
	
	const { rows } = table.getRowModel();
	const virtualizer = useWindowVirtualizer( {
		count       : rows.length,
		estimateSize: () => 41,
		overscan    : 5,
		paddingStart
	} );
	
	const virtualItems = virtualizer.getVirtualItems();
	
	const { renderRow, onRowClick } = table.options.meta;
	
	const paddingTop = virtualItems.length > 0 ? Math.max( 0, virtualItems[ 0 ].start - paddingStart ) || 0 : 0;
	
	return (
		<Paper
			ref={paperRef}
			square
			sx={{ height: virtualizer.getTotalSize() }}>
			<Box height={paddingTop}/>
			{virtualItems.map( ( { index } ) => {
				const row = rows[ index ];
				return onRowClick ? (
					<ListItemButton key={index} divider onClick={() => onRowClick( row, table )}>
						{renderRow( row, table )}
					</ListItemButton>
				) : (
					<ListItem key={index} divider>
						{renderRow( row, table )}
					</ListItem>
				);
			} )}
		</Paper>
	);
}
