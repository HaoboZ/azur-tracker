import {
	Paper,
	Table,
	TableBody,
	TableCell,
	tableCellClasses,
	TableContainer,
	TableHead,
	TableRow,
	tableRowClasses,
	TableSortLabel
} from '@mui/material';
import { isEqual } from 'lodash-es';
import type { ReactNode } from 'react';
import { memo, useMemo, useRef } from 'react';
import type { Row, TableInstance } from 'react-table';

function VirtualTable<Item extends object>( {
	getTableProps,
	getTableBodyProps,
	headerGroups,
	rows,
	prepareRow,
	onClick
}: { onClick?: ( row: Row<Item> ) => void } & TableInstance<Item> ) {
	const bodyRef = useRef<HTMLTableSectionElement>();
	
	const headerStyle = useMemo( () => {
		const firstRow = bodyRef.current?.firstChild?.firstChild as HTMLDivElement;
		return { marginRight: firstRow?.offsetWidth - firstRow?.clientWidth || 0 };
	}, [ rows ] );
	
	return (
		<TableContainer component={Paper}>
			<Table
				size='small'
				sx={{
					[ `.${tableRowClasses.hover}:hover` ]: onClick ? { cursor: 'pointer' } : undefined,
					[ `.${tableCellClasses.root}` ]      : { display: 'flex', alignItems: 'center', px: 1 }
				}}
				{...getTableProps()}>
				<TableHead>
					{headerGroups.map( ( headerGroup ) => (
						<TableRow
							key={headerGroup.id}
							{...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map( ( column ) => (
								<TableCell
									key={column.id}
									{...column.getHeaderProps( column.getSortByToggleProps() )}>
									<TableSortLabel
										active={column.isSorted}
										hideSortIcon={!column.canSort}
										direction={column.isSortedDesc ? 'desc' : 'asc'}>
										{column.render( 'Header' ) as ReactNode}
									</TableSortLabel>
								</TableCell>
							) )}
						</TableRow>
					) )}
				</TableHead>
				<TableBody ref={bodyRef} {...getTableBodyProps()}>
					{rows.map( ( row, index ) => {
						prepareRow( row );
						return (
							<TableRow
								key={index}
								hover
								onClick={() => onClick?.( row )}
								{...row.getRowProps()}>
								{row.cells.map( ( cell, i ) => (
									<TableCell key={i} {...cell.getCellProps()}>
										{cell.render( 'Cell' ) as ReactNode}
									</TableCell>
								) )}
							</TableRow>
						);
					} )}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default memo( VirtualTable, ( prevProps, nextProps ) =>
	isEqual( prevProps.state, nextProps.state )
	&& Object.is( prevProps.rows, nextProps.rows ) ) as typeof VirtualTable;
