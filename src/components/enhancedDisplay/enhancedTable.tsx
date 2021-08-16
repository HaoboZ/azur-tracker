import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableContainerProps,
	TableHead,
	TableRow,
	useTheme
} from '@material-ui/core';
import { Add as AddIcon, Close as CloseIcon, Menu as MenuIcon } from '@material-ui/icons';
import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ActionTitle from '../actionTitle';

const forwardTableBody = React.forwardRef<never>( ( { children }, ref ) => {
	return <TableBody ref={ref}>{children}</TableBody>;
} );

export default function EnhancedTable<Item extends { id?: string }>( {
	title,
	data,
	setData,
	editable,
	sortable,
	selectable,
	columnHeader,
	columns,
	...props
}: {
	title?: React.ReactNode,
	data: Item[],
	// required if sortable or editable is true
	setData?: ( items: Item[] ) => void,
	editable?: {
		newData: () => Item | Promise<Item>,
		min?: number,
		max?: number
	},
	sortable?: boolean,
	selectable?: {
		selected: string[],
		onSelect?: ( id: string, adding: boolean ) => void,
		min?: number,
		max?: number
	},
	columnHeader: React.ReactNodeArray,
	columns: ( item: Item, index: number ) => React.ReactNodeArray
} & TableContainerProps ) {
	const theme = useTheme();
	
	const dataItems = React.useMemo( () => {
		const totalSelected = selectable?.selected.length;
		
		const row = ( item, index ) => {
			const selected = selectable?.selected.includes( item?.id || index );
			return <TableRow
				hover
				selected={selected}
				onClick={selectable?.onSelect && ( () => {
					if ( selected ? totalSelected <= selectable?.min : totalSelected >= selectable?.max ) return;
					selectable.onSelect( item?.id || index, !selected );
				} )}>
				{sortable && <TableCell className='sortHandle'>
					<div><MenuIcon/></div>
				</TableCell>}
				{columns( item, index ).map( ( cell, index ) =>
					<TableCell key={index}>
						<div>{cell}</div>
					</TableCell> )}
				{Boolean( editable ) && <TableCell>
					<div>
						{( editable?.min ? data.length > editable.min : true )
						&& <IconButton onClick={() => {
							const _data = [ ...data ];
							_data.splice( index, 1 );
							setData( _data );
						}}>
							<CloseIcon/>
						</IconButton>}
					</div>
				</TableCell>}
			</TableRow>;
		};
		
		return <TransitionGroup component={null}>
			{data.map( ( item, index ) => <CSSTransition
				key={item.id || index}
				timeout={theme.transitions.duration.standard}
				classNames='slide'>
				{row( item, index )}
			</CSSTransition> )}
		</TransitionGroup>;
	}, [ data, columns, Boolean( editable ), sortable ] );
	
	const sortItems = sortable
		? data.length ? <ReactSortable
			tag={forwardTableBody}
			list={data as any}
			setList={setData as any}
			handle='.sortHandle'
			ghostClass='selectedSort'
			forceFallback
			animation={theme.transitions.duration.shorter}>
			{dataItems}
		</ReactSortable> : undefined
		: <TableBody>
			{dataItems}
		</TableBody>;
	
	return <Box sx={{
		'& .minWidth'        : { width: '1%' },
		'& .sortHandle:hover': { cursor: 'pointer' },
		'& .slide'           : {
			'&-enter'       : { opacity: 0 },
			'&-enter-active': {
				opacity   : 1,
				transition: ( theme ) => theme.transitions.create( 'opacity' )
			},
			'&-exit'        : { opacity: 1 },
			'&-exit-active' : {
				opacity   : 0,
				transition: ( theme ) => theme.transitions.create( 'opacity' )
			}
		}
	}}>
		{title && <ActionTitle title={title}/>}
		<TableContainer component={Paper} {...props}>
			<Table size='small'>
				<TableHead sx={{ bgcolor: 'action.focus' }}>
					<TableRow>
						{sortable && <TableCell className='minWidth'/>}
						{columnHeader.map( ( cell, index ) =>
							<TableCell key={index}>{cell}</TableCell> )}
						{Boolean( editable ) && <TableCell className='minWidth'>
							{( editable?.max ? data.length < editable.max : true )
							&& <IconButton onClick={async () => setData( [ ...data, { ...await editable.newData() } ] )}>
								<AddIcon/>
							</IconButton>}
						</TableCell>}
					</TableRow>
				</TableHead>
				{sortItems}
			</Table>
		</TableContainer>
	</Box>;
}
