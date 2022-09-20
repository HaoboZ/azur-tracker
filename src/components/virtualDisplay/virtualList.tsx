import { ListItem, ListItemButton, Paper } from '@mui/material';
import { isEqual } from 'lodash-es';
import type { ReactNode } from 'react';
import { memo } from 'react';
import type { Row, TableInstance } from 'react-table';

function VirtualList<Item extends object>( {
	rows,
	prepareRow,
	onClick,
	renderRow
}: {
	onClick?: ( row: Row<Item> ) => void,
	renderRow: ( row: Row<Item> ) => ReactNode
} & TableInstance<Item> ) {
	return (
		<Paper square>
			{rows.map( ( row, index ) => {
				prepareRow( row );
				return onClick ? (
					<ListItemButton key={index} divider onClick={() => onClick( row )}>
						{renderRow( row )}
					</ListItemButton>
				) : (
					<ListItem key={index} divider>
						{renderRow( row )}
					</ListItem>
				);
			} )}
		</Paper>
	);
}

export default memo( VirtualList, ( prevProps, nextProps ) =>
	isEqual( prevProps.state, nextProps.state )
	&& Object.is( prevProps.rows, nextProps.rows ) ) as typeof VirtualList;
