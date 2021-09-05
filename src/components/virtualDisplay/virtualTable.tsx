import { Paper, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { isEqual } from 'lodash';
import React from 'react';
import { Row, TableInstance } from 'react-table';
import { FixedSizeList } from 'react-window';
import { ReactWindowScroller } from 'react-window-scroller';

const VirtualTable = React.memo( function VirtualTable( {
	getTableProps,
	getTableBodyProps,
	headerGroups,
	rows,
	prepareRow,
	onClick
}: { onClick?: ( row: Row ) => void } & TableInstance ) {
	const bodyRef = React.useRef<HTMLDivElement>();
	
	const headerStyle = React.useMemo( () => {
		const firstRow = bodyRef.current?.firstChild?.firstChild as HTMLDivElement;
		return { marginRight: firstRow?.offsetWidth - firstRow?.clientWidth || 0 };
	}, [ rows ] );
	
	return <Table
		size='small'
		component={Paper}
		sx={{
			'& .MuiTableRow-hover:hover': onClick ? { cursor: 'pointer' } : undefined,
			'& .MuiTableCell-root'      : {
				display   : 'flex',
				alignItems: 'center',
				whiteSpace: 'nowrap',
				overflow  : 'hidden',
				px        : 1
			}
		}}
		{...getTableProps()}>
		<TableHead component='div'>
			{headerGroups.map( ( headerGroup ) => <TableRow
				key={headerGroup.id}
				component='div'
				{...headerGroup.getHeaderGroupProps( { style: headerStyle } )}>
				{headerGroup.headers.map( ( column ) => <TableCell
					key={column.id}
					component='div'
					{...column.getHeaderProps( column.getSortByToggleProps() )}>
					<TableSortLabel
						active={column.isSorted}
						hideSortIcon={!column.canSort}
						direction={column.isSortedDesc ? 'desc' : 'asc'}>
						{column.render( 'Header' )}
					</TableSortLabel>
				</TableCell> )}
			</TableRow> )}
		</TableHead>
		<TableBody component='div' ref={bodyRef} {...getTableBodyProps()}>
			<ReactWindowScroller>
				{( { ref, outerRef, style, onScroll } ) => <FixedSizeList
					ref={ref}
					outerRef={outerRef}
					style={style}
					onScroll={onScroll}
					height={window.innerHeight}
					width='100%'
					itemCount={rows.length}
					itemSize={35}>
					{( { index, style } ) => {
						const row = rows[ index ];
						prepareRow( row );
						return <TableRow
							component='div'
							hover
							onClick={() => onClick?.( row )}
							{...row.getRowProps( { style } )}>
							{row.cells.map( ( cell, i ) => <TableCell
								key={i}
								component='div'
								className={( cell.column as any ).className?.( cell )}
								{...cell.getCellProps()}>
								{cell.render( 'Cell' )}
							</TableCell> )}
						</TableRow>;
					}}
				</FixedSizeList>}
			</ReactWindowScroller>
		</TableBody>
	</Table>;
}, ( prevProps, nextProps ) =>
	isEqual( prevProps.state, nextProps.state )
	&& Object.is( prevProps.rows, nextProps.rows ) );
export default VirtualTable;
