import { Add as AddIcon, Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material';
import type { TableRowProps } from '@mui/material';
import {
	Box,
	Collapse,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	tableCellClasses,
	TableContainer,
	TableHead,
	TableRow,
	tableRowClasses,
	Typography
} from '@mui/material';
import { Fragment, memo, useMemo, useState } from 'react';
import { isEqual, pick } from 'underscore';
import Sortable from '../sortable';
import ActionTitle from './actionTitle';
import type { EnhancedDisplayProps, EnhancedTableProps } from './helpers';
import { _deleteRow, _selectRow } from './helpers';

function ExpandRow( { renderPanel, ...props }: { renderPanel } & TableRowProps ) {
	const [ open, setOpen ] = useState( false );
	
	return (
		<Fragment>
			<TableRow
				{...props}
				onClick={renderPanel || props.onClick ? ( e ) => {
					setOpen( ( open ) => !open );
					props.onClick?.( e );
				} : undefined}
			/>
			{renderPanel && (
				<Collapse in={open}>
					<TableRow><TableCell>{renderPanel}</TableCell></TableRow>
				</Collapse>
			)}
		</Fragment>
	);
}

function EnhancedTable<Item>( {
	title,
	actionTitleProps,
	items = [],
	extraData,
	setItems,
	editable,
	sortable,
	selectable,
	renderPanel,
	emptyComponent = <Typography textAlign='center' py={2}>No Items</Typography>,
	headers,
	columns,
	cellProps,
	...props
}: EnhancedDisplayProps<Item> & EnhancedTableProps<Item> ) {
	const dataItems = useMemo( () => {
		const totalSelected = selectable?.selected.length;
		
		const row = ( { item, index, handle }: { item, index, handle? } ) => {
			const selected = selectable?.selected.includes( item?.id ?? index );
			
			return (
				<ExpandRow
					hover
					selected={selected}
					renderPanel={renderPanel?.( item, index )}
					onClick={selectable?.setSelected && ( () => _selectRow( selectable, item, index, selected, totalSelected ) )}>
					{sortable && (
						<TableCell>
							<MenuIcon {...handle}/>
						</TableCell>
					)}
					{columns( item, index ).filter( Boolean ).map( ( cell, index ) => (
						<TableCell key={index} {...cellProps?.[ index ]}>
							{cell}
						</TableCell>
					) )}
					{Boolean( editable ) && (
						<TableCell>
							{( editable?.min ? items.length > editable.min : true ) && (
								<IconButton onClick={( e ) => {
									e.stopPropagation();
									_deleteRow( items, setItems, editable, selectable, item, index, selected, totalSelected );
								}}>
									<CloseIcon/>
								</IconButton>
							)}
						</TableCell>
					)}
				</ExpandRow>
			);
		};
		
		return sortable ? (
			<Sortable
				items={items}
				setItems={setItems}
				renderItem={row}
				tag={TableBody}
			/>
		) : (
			<TableBody>
				{items.map( ( item, index ) => (
					<Fragment key={index}>
						{row( { item, index } )}
					</Fragment>
				) )}
			</TableBody>
		);
	}, [ items, extraData, columns, Boolean( editable ), sortable, selectable?.selected ] );
	
	return (
		<Box>
			{title && <ActionTitle {...actionTitleProps}>{title}</ActionTitle>}
			<TableContainer component={Paper} {...props}>
				<Table
					size='small'
					sx={{
						[ `.${tableRowClasses.hover}:hover` ]                              : selectable
							? { cursor: 'pointer' }
							: undefined,
						[ `.${tableRowClasses.root}:last-child .${tableCellClasses.root}` ]: { borderBottom: 0 },
						overflow                                                           : 'hidden'
					}}>
					<TableHead sx={{ bgcolor: 'action.focus' }}>
						<TableRow>
							{sortable && <TableCell/>}
							{headers.filter( Boolean ).map( ( cell, index ) => (
								<TableCell key={index} {...cellProps?.[ index ]}>
									{cell}
								</TableCell>
							) )}
							{Boolean( editable ) && (
								<TableCell>
									{( editable?.max ? items.length < editable.max : true ) && (
										<IconButton onClick={async () => {
											editable.onAdd?.();
											setItems?.( [ ...items, { ...await editable.newData() } ] );
										}}>
											<AddIcon/>
										</IconButton>
									)}
								</TableCell>
							)}
						</TableRow>
					</TableHead>
					{!items.length ? (
						<TableBody>
							<TableRow>
								<TableCell colSpan={headers.length + 2}>
									{emptyComponent}
								</TableCell>
							</TableRow>
						</TableBody>
					) : dataItems}
				</Table>
			</TableContainer>
		</Box>
	);
}

export default memo( EnhancedTable, ( prevProps, nextProps ) =>
	isEqual( pick( prevProps, [ 'title', 'loading' ] ), pick( nextProps, [ 'title', 'loading' ] ) )
	&& Object.is( prevProps.items, nextProps.items )
	&& Object.is( prevProps.extraData, nextProps.extraData ) ) as typeof EnhancedTable;
