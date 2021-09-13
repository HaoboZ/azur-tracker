import { Add as AddIcon, Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material';
import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@mui/material';
import { isEqual, pick } from 'lodash';
import React from 'react';

import ActionTitle from '../actionTitle';
import Loading from '../loading';
import Sortable from '../sortable';
import { _deleteRow, _selectRow, EnhancedDisplayProps, EnhancedTableProps } from './helpers';

const EnhancedTable = React.memo( function EnhancedTable<Item>( {
	title,
	actionTitleProps,
	data = [],
	extraData,
	setData,
	editable,
	sortable,
	selectable,
	loading,
	loadingComponent = <Loading/>,
	emptyComponent = <Typography textAlign='center' py={2}>No Items</Typography>,
	columnHeader,
	columns,
	...props
}: EnhancedDisplayProps<Item> & EnhancedTableProps<Item> ) {
	const dataItems = React.useMemo( () => {
		const totalSelected = selectable?.selected.length;
		
		const row = ( { item, index, ref, style, handle }: { item, index, ref?, style?, handle? } ) => {
			const selected = selectable?.selected.includes( item?.id ?? index );
			return <TableRow
				ref={ref}
				style={style}
				hover
				selected={selected}
				onClick={selectable?.setSelected
				&& ( () => _selectRow( selectable,
					item, index, selected, totalSelected ) )}>
				{sortable && <TableCell>
					<MenuIcon {...handle}/>
				</TableCell>}
				{columns( item, index ).map( ( cell, index ) => <TableCell key={index}>
					{cell}
				</TableCell> )}
				{Boolean( editable ) && <TableCell>
					{( editable?.min ? data.length > editable.min : true )
					&& <IconButton onClick={( e ) => {
						e.stopPropagation();
						_deleteRow( data, setData, editable, selectable,
							item, index, selected, totalSelected );
					}}>
						<CloseIcon/>
					</IconButton>}
				</TableCell>}
			</TableRow>;
		};
		
		return sortable
			? <Sortable
				items={data as any}
				setItems={setData as any}
				renderItem={( props ) => row( props )}
				overlayWrapper={( children ) => <Table size='small'>{children}</Table>}
				overlayWrapperElement='tbody'
			/>
			: data.map( ( item, index ) => <React.Fragment key={index}>
				{row( { item, index } )}
			</React.Fragment> );
	}, [ data, extraData, columns, Boolean( editable ), sortable, selectable?.selected ] );
	
	return <Box sx={{ '& .minWidth': { width: '1%' } }}>
		{title && <ActionTitle {...actionTitleProps}>{title}</ActionTitle>}
		<TableContainer component={Paper} {...props}>
			<Table
				size='small'
				sx={{
					'& .MuiTableBody-root .MuiTableRow-root': {
						':hover'        : selectable ? { cursor: 'pointer' } : undefined,
						':last-child td': { borderBottom: 0 }
					},
					overflow                                : 'hidden'
				}}>
				<TableHead sx={{ bgcolor: 'action.focus' }}>
					<TableRow>
						{sortable && <TableCell className='minWidth'/>}
						{columnHeader.map( ( cell, index ) =>
							<TableCell key={index}>{cell}</TableCell> )}
						{Boolean( editable ) && <TableCell className='minWidth'>
							{!loading && ( editable?.max ? data.length < editable.max : true )
							&& <IconButton onClick={async () => {
								editable.onAdd?.();
								setData?.( [ ...data, { ...await editable.newData() } ] );
							}}>
								<AddIcon/>
							</IconButton>}
						</TableCell>}
					</TableRow>
				</TableHead>
				<TableBody>
					{loading || !data.length
						? <TableRow>
							<TableCell colSpan={columnHeader.length + 2}>
								{loading ? loadingComponent : emptyComponent}
							</TableCell>
						</TableRow>
						: dataItems}
				</TableBody>
			</Table>
		</TableContainer>
	</Box>;
}, ( prevProps, nextProps ) =>
	isEqual( pick( prevProps, [ 'title', 'loading' ] ), pick( nextProps, [ 'title', 'loading' ] ) )
	&& Object.is( prevProps.data, nextProps.data )
	&& Object.is( prevProps.extraData, nextProps.extraData ) );
export default EnhancedTable;
