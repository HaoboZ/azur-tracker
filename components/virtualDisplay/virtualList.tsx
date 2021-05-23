import { List as MuiList, Paper } from '@material-ui/core';
import React from 'react';
import { Row, TableInstance } from 'react-table';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

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
		<AutoSizer>
			{( { height, width } ) => <List
				innerElementType={MuiList}
				height={height}
				itemCount={rows.length}
				itemSize={50}
				width={width}>
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
		</AutoSizer>
	</Paper>;
}
