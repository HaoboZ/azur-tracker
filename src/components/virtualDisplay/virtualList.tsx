import { List, ListItem, ListItemButton, Paper } from '@mui/material';
import { isEqual } from 'lodash';
import React from 'react';
import { Row, TableInstance } from 'react-table';
import { FixedSizeList } from 'react-window';
import { ReactWindowScroller } from 'react-window-scroller';

const VirtualList = React.memo( function VirtualList( {
	getTableProps,
	rows,
	prepareRow,
	onClick,
	renderRow
}: {
	onClick?: ( row: Row ) => void,
	renderRow: ( row: Row ) => React.ReactNode
} & TableInstance ) {
	return <Paper square {...getTableProps()}>
		<ReactWindowScroller>
			{( { ref, outerRef, style, onScroll } ) => <FixedSizeList
				ref={ref}
				outerRef={outerRef}
				style={style}
				onScroll={onScroll}
				innerElementType={List}
				height={window.innerHeight}
				width='100%'
				itemCount={rows.length}
				itemSize={50}>
				{( { index, style } ) => {
					const row = rows[ index ];
					prepareRow( row );
					return onClick
						? <ListItemButton
							divider
							onClick={() => onClick( row )}
							{...row.getRowProps( { style } )}>
							{renderRow( row )}
						</ListItemButton>
						: <ListItem
							divider
							{...row.getRowProps( { style } )}>
							{renderRow( row )}
						</ListItem>;
				}}
			</FixedSizeList>}
		</ReactWindowScroller>
	</Paper>;
}, ( prevProps, nextProps ) =>
	isEqual( prevProps.state, nextProps.state )
	&& Object.is( prevProps.rows, nextProps.rows ) );
export default VirtualList;
