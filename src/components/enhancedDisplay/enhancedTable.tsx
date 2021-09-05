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
	Typography,
	useTheme
} from '@mui/material';
import { isEqual, pick } from 'lodash';
import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ActionTitle from '../actionTitle';
import Loading from '../loading';
import { _deleteRow, _selectRow, EnhancedDisplayProps, EnhancedTableProps } from './helpers';

const forwardTableBody = React.forwardRef<HTMLTableSectionElement>( ( { children }, ref ) =>
	<TableBody ref={ref}>{children}</TableBody> );

const EnhancedTable = React.memo( function EnhancedTable<Item extends { id?: string }>( {
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
	const theme = useTheme();
	
	const dataItems = React.useMemo( () => {
		const totalSelected = selectable?.selected.length;
		
		const row = ( item, index ) => {
			const selected = selectable?.selected.includes( item?.id || index );
			
			return <TableRow
				hover
				selected={selected}
				onClick={selectable?.setSelected
				&& ( () => _selectRow( selectable,
					item, index, selected, totalSelected ) )}>
				{sortable && <TableCell className='sortHandle'>
					<MenuIcon/>
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
		
		const transition = <TransitionGroup component={null}>
			{data.map( ( item, index ) => <CSSTransition
				key={item.id || index}
				timeout={theme.transitions.duration.standard}
				classNames='slide'>
				{row( item, index )}
			</CSSTransition> )}
		</TransitionGroup>;
		
		return sortable
			? <ReactSortable
				tag={forwardTableBody}
				list={data as any}
				setList={setData as any}
				handle='.sortHandle'
				ghostClass='selectedSort'
				forceFallback
				animation={theme.transitions.duration.shorter}>
				{transition}
			</ReactSortable>
			: <TableBody>{transition}</TableBody>;
	}, [ data, extraData, columns, Boolean( editable ), sortable, selectable?.selected ] );
	
	return <Box sx={{
		'& .minWidth'        : { width: '1%' },
		'& .sortHandle:hover': { cursor: 'pointer' },
		'& .slide'           : {
			'&-enter'       : { opacity: 0 },
			'&-enter-active': {
				opacity   : 1,
				transition: ( { transitions } ) => transitions.create( 'opacity' )
			},
			'&-exit'        : { opacity: 1 },
			'&-exit-active' : {
				opacity   : 0,
				transition: ( { transitions } ) => transitions.create( 'opacity' )
			}
		}
	}}>
		{title && <ActionTitle {...actionTitleProps}>{title}</ActionTitle>}
		<TableContainer component={Paper} {...props}>
			<Table
				size='small'
				sx={{
					'& .MuiTableBody-root .MuiTableRow-root': {
						':hover'        : selectable ? { cursor: 'pointer' } : undefined,
						':last-child td': { borderBottom: 0 }
					}
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
				{loading || !data.length
					? <TableBody>
						<TableRow>
							<TableCell colSpan={columnHeader.length + 2}>
								{loading ? loadingComponent : emptyComponent}
							</TableCell>
						</TableRow>
					</TableBody>
					: dataItems}
			</Table>
		</TableContainer>
	</Box>;
}, ( prevProps, nextProps ) =>
	isEqual( pick( prevProps, [ 'title', 'loading' ] ), pick( nextProps, [ 'title', 'loading' ] ) )
	&& Object.is( prevProps.data, nextProps.data )
	&& Object.is( prevProps.extraData, nextProps.extraData ) );
export default EnhancedTable;
