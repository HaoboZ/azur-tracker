import { Paper, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import React from 'react';
import { Row, TableInstance } from 'react-table';
import { FixedSizeList as List } from 'react-window';
import { ReactWindowScroller } from 'react-window-scroller';

import { useMappedColorClasses } from '../../lib/reference/colors';

export default function VirtualTable( {
	getTableProps,
	getTableBodyProps,
	headerGroups,
	rows,
	prepareRow,
	onClick
}: TableInstance & { onClick?: ( row: Row ) => void } ) {
	const colorClasses = useMappedColorClasses();
	
	const bodyRef = React.useRef<HTMLDivElement>();
	const firstRow = bodyRef.current?.firstChild?.firstChild as HTMLDivElement;
	const [ headerStyle, setHeaderStyle ] = React.useState( {} );
	
	React.useEffect( () => {
		setHeaderStyle( { marginRight: ( firstRow?.offsetWidth - firstRow?.clientWidth ) || 0 } );
	}, [ firstRow, rows ] );
	
	return <Table size='small' component={Paper} {...getTableProps()}>
		<TableHead component='div'>
			{headerGroups.map( ( headerGroup ) =>
				<TableRow key={headerGroup.id} component='div' {...headerGroup.getHeaderGroupProps( { style: headerStyle } )}>
					{headerGroup.headers.map( ( column ) =>
						<TableCell key={column.id} component='div' {...column.getHeaderProps( column.getSortByToggleProps() )}>
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
				{( { ref, outerRef, style, onScroll } ) => <List
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
								// @ts-expect-error: optional
								className={colorClasses[ cell.column.color?.( cell ) ]}
								{...cell.getCellProps( { style: { display: 'flex', alignItems: 'center' } } )}>
								{cell.render( 'Cell' )}
							</TableCell> )}
						</TableRow>;
					}}
				</List>}
			</ReactWindowScroller>
		</TableBody>
	</Table>;
}