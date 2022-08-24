import { List, ListItem, ListItemButton, Paper } from '@mui/material';
import { isEqual } from 'lodash-es';
import type { ReactNode } from 'react';
import { memo } from 'react';
import type { Row, TableInstance } from 'react-table';
import { FixedSizeList } from 'react-window';
import { ReactWindowScroller } from 'react-window-scroller';

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
			<ReactWindowScroller>
				{( { ref, outerRef, style, onScroll } ) => (
					// @ts-ignore
					<FixedSizeList
						ref={ref}
						outerRef={outerRef}
						style={style}
						innerElementType={List}
						height={window.innerHeight}
						width='100%'
						itemCount={rows.length}
						itemSize={50}
						onScroll={onScroll}>
						{( { index, style } ) => {
							const row = rows[ index ];
							prepareRow( row );
							return onClick ? (
								<ListItemButton divider style={style} onClick={() => onClick( row )}>
									{renderRow( row )}
								</ListItemButton>
							) : (
								<ListItem divider style={style}>
									{renderRow( row )}
								</ListItem>
							);
						}}
					</FixedSizeList>
				)}
			</ReactWindowScroller>
		</Paper>
	);
}

export default memo( VirtualList, ( prevProps, nextProps ) =>
	isEqual( prevProps.state, nextProps.state )
	&& Object.is( prevProps.rows, nextProps.rows ) ) as typeof VirtualList;
