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
import { memo, useMemo } from 'react';
import Loading from '../loading';
import Sortable from '../sortable';
import ActionTitle from './actionTitle';
import { _deleteRow, _selectRow, EnhancedDisplayProps, EnhancedTableProps } from './helpers';

function EnhancedTable<Item>( {
	title,
	actionTitleProps,
	items = [],
	extraData,
	setItems,
	editable,
	sortable,
	selectable,
	loading,
	loadingComponent = <Loading/>,
	emptyComponent = <Typography textAlign='center' py={2}>No Items</Typography>,
	headers,
	columns,
	widths,
	...props
}: EnhancedDisplayProps<Item> & EnhancedTableProps<Item> ) {
	const dataItems = useMemo( () => {
		const totalSelected = selectable?.selected.length;
		
		const row = ( { item, index, handle }: { item, index, handle? } ) => {
			const selected = selectable?.selected.includes( item?.id ?? index );
			return <TableRow
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
					{( editable?.min ? items.length > editable.min : true )
					&& <IconButton onClick={( e ) => {
						e.stopPropagation();
						_deleteRow( items, setItems, editable, selectable,
							item, index, selected, totalSelected );
					}}>
						<CloseIcon/>
					</IconButton>}
				</TableCell>}
			</TableRow>;
		};
		
		return sortable
			? <Sortable
				items={items}
				setItems={setItems}
				renderItem={row}
				tag={TableBody}
			/>
			: <TableBody>
				{items.map( ( item, index ) => row( { item, index } ) )}
			</TableBody>;
	}, [ items, extraData, columns, Boolean( editable ), sortable, selectable?.selected ] );
	
	return <Box sx={{ '& .minWidth': { width: '0.01%' } }}>
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
						{headers.map( ( cell, index ) => <TableCell
							key={index}
							sx={{ width: widths?.[ index ] }}>
							{cell}
						</TableCell> )}
						{Boolean( editable ) && <TableCell className='minWidth'>
							{!loading && ( editable?.max ? items.length < editable.max : true )
							&& <IconButton onClick={async () => {
								editable.onAdd?.();
								setItems?.( [ ...items, { ...await editable.newData() } ] );
							}}>
								<AddIcon/>
							</IconButton>}
						</TableCell>}
					</TableRow>
				</TableHead>
				{loading || !items.length
					? <TableBody>
						<TableRow>
							<TableCell colSpan={headers.length + 2}>
								{loading ? loadingComponent : emptyComponent}
							</TableCell>
						</TableRow>
					</TableBody>
					: dataItems}
			</Table>
		</TableContainer>
	</Box>;
}

export default memo( EnhancedTable, ( prevProps, nextProps ) =>
	isEqual( pick( prevProps, [ 'title', 'loading' ] ), pick( nextProps, [ 'title', 'loading' ] ) )
	&& Object.is( prevProps.items, nextProps.items )
	&& Object.is( prevProps.extraData, nextProps.extraData ) ) as typeof EnhancedTable;
