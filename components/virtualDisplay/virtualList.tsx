import { List as MuiList, Paper } from '@material-ui/core';
import React from 'react';
import { Row, TableInstance } from 'react-table';
import { FixedSizeList as List } from 'react-window';
import { ReactWindowScroller } from 'react-window-scroller';

export default function VirtualList( {
	getTableProps,
	rows,
	prepareRow,
	onClick,
	RenderRow
}: TableInstance & {
	onClick?: ( row: Row ) => void,
	RenderRow: React.FunctionComponent<{ row: Row, onClick: ( row: Row ) => void, rowProps }>
} ) {
	return <Paper square {...getTableProps()}>
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
					return <RenderRow
						row={row}
						onClick={onClick}
						rowProps={row.getRowProps( { style } )}
					/>;
				}}
			</List>}
		</ReactWindowScroller>
	</Paper>;
}
