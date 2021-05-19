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
		{/*{headerGroups.map( ( headerGroup ) =>*/}
		{/*	<TableRow component='div' {...headerGroup.getHeaderGroupProps()}>*/}
		{/*		{headerGroup.headers.map( ( column ) =>*/}
		{/*			<TableCell component='div' {...column.getHeaderProps( column.getSortByToggleProps() )}>*/}
		{/*				<TableSortLabel*/}
		{/*					active={column.isSorted}*/}
		{/*					hideSortIcon={!column.canSort}*/}
		{/*					direction={column.isSortedDesc ? 'desc' : 'asc'}>*/}
		{/*					{column.render( 'Header' )}*/}
		{/*				</TableSortLabel>*/}
		{/*			</TableCell> )}*/}
		{/*	</TableRow> )}*/}
		
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
