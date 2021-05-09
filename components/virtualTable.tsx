import { Paper, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import React from 'react';
import { Row, TableInstance } from 'react-table';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

import { useMappedColorClasses } from '../lib/reference/colors';

export default function VirtualTable( {
	getTableProps,
	getTableBodyProps,
	headerGroups,
	rows,
	prepareRow,
	onPress
}: TableInstance & { onPress?: ( row: Row ) => void } ) {
	const colorClasses = useMappedColorClasses();
	
	const bodyRef = React.useRef<HTMLDivElement>();
	const firstRow = bodyRef.current?.firstChild?.firstChild as HTMLDivElement;
	const [ headerStyle, setHeaderStyle ] = React.useState( {} );
	
	React.useEffect( () => {
		setHeaderStyle( { marginRight: ( firstRow?.offsetWidth - firstRow?.clientWidth ) || 0 } );
	}, [ firstRow, rows ] );
	
	return <Table size='small' component={Paper} {...getTableProps( { style: { height: '100%' } } )}>
		<TableHead component='div'>
			{headerGroups.map( ( headerGroup ) =>
				<TableRow component='div' {...headerGroup.getHeaderGroupProps( { style: headerStyle } )}>
					{headerGroup.headers.map( ( column ) =>
						<TableCell component='div' {...column.getHeaderProps( column.getSortByToggleProps() )}>
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
			<AutoSizer>
				{( { height, width } ) => <List
					height={height}
					itemCount={rows.length}
					itemSize={35}
					width={width}>
					{( { index, style } ) => {
						const row = rows[ index ];
						prepareRow( row );
						return <TableRow
							component='div'
							hover
							onClick={() => onPress( row )}
							{...row.getRowProps( { style } )}>
							{row.cells.map( ( cell ) => <TableCell
								component='div'
								// @ts-ignore
								className={colorClasses[ cell.column.color?.( cell ) ]}
								{...cell.getCellProps( { style: { display: 'flex', alignItems: 'center' } } )}>
								{cell.render( 'Cell' )}
							</TableCell> )}
						</TableRow>;
					}}
				</List>}
			</AutoSizer>
		</TableBody>
	</Table>;
}