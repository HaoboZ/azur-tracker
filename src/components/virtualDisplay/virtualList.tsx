import { List, Paper } from '@material-ui/core';
import React from 'react';
import { Row, TableInstance } from 'react-table';
import { FixedSizeList } from 'react-window';
import { ReactWindowScroller } from 'react-window-scroller';

export default function VirtualList( {
	getTableProps,
	rows,
	prepareRow,
	onClick,
	renderRow
}: TableInstance & {
	onClick?: ( row: Row ) => void,
	renderRow: ( props: { row: Row, onClick: ( row: Row ) => void, rowProps } ) => React.ReactNode
} ) {
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
					return renderRow( {
						row,
						onClick,
						rowProps: row.getRowProps( { style } )
					} ) as React.ReactElement;
				}}
			</FixedSizeList>}
		</ReactWindowScroller>
	</Paper>;
}
