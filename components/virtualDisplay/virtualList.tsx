import { List as MuiList, Paper } from '@material-ui/core';
import React from 'react';
import { Row, TableInstance } from 'react-table';
import { FixedSizeList as List } from 'react-window';
import { ReactWindowScroller } from 'react-window-scroller';

export default function VirtualList( {
	getTableProps,
	rows,
	prepareRow,
	onPress,
	RenderListItem
}: TableInstance & {
	onPress?: ( row: Row ) => void,
	RenderListItem: React.FunctionComponent<{ row: Row, onPress, props }>
} ) {
	return <Paper square {...getTableProps( { style: { height: '100%' } } )}>
		<ReactWindowScroller>
			{( { ref, outerRef, style, onScroll } ) => <List
				ref={ref}
				outerRef={outerRef}
				style={style}
				onScroll={onScroll}
				innerElementType={MuiList}
				height={window.innerHeight}
				width='100%'
				itemCount={rows.length}
				itemSize={50}>
				{( { index, style } ) => {
					const row = rows[ index ];
					prepareRow( row );
					return <RenderListItem
						row={row}
						onPress={onPress}
						props={row.getRowProps( { style } )}
					/>;
				}}
			</List>}
		</ReactWindowScroller>
	</Paper>;
}
