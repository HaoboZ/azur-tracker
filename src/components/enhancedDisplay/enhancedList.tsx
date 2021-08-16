import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListProps,
	Paper,
	useTheme
} from '@material-ui/core';
import {
	Add as AddIcon,
	Close as CloseIcon,
	Edit as EditIcon,
	ExpandMore as ExpandMoreIcon,
	Menu as MenuIcon
} from '@material-ui/icons';
import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ActionTitle from '../actionTitle';

export default function EnhancedList<Item extends { id?: string }>( {
	title,
	data,
	setData,
	editable,
	sortable,
	selectable,
	renderRow,
	renderPanel,
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
	// doesn't work with renderPanel
	selectable?: {
		selected: string[],
		onSelect?: ( id: string, adding: boolean ) => void,
		min?: number,
		max?: number
	},
	renderRow: ( item: Item, index: number ) => React.ReactNode,
	renderPanel?: ( item: Item, index: number ) => React.ReactNode
} & ListProps ) {
	const theme = useTheme();
	
	const [ editing, setEditing ] = React.useState( false );
	
	const dataItems = React.useMemo( () => {
		const itemRow = ( item, index ) => <>
			{sortable && editing && <ListItemIcon>
				<IconButton className='sortHandle'><MenuIcon/></IconButton>
			</ListItemIcon>}
			{renderRow( item, index )}
			{Boolean( editable ) && editing && ( editable?.min ? data.length > editable.min : true )
			&& <ListItemIcon sx={{ minWidth: 'unset' }}>
				<IconButton onClick={() => {
					const _data = [ ...data ];
					_data.splice( index, 1 );
					setData?.( _data );
				}}><CloseIcon/></IconButton>
			</ListItemIcon>}
		</>;
		
		const totalSelected = selectable?.selected.length;
		
		const row = ( item, index ) => {
			const selected = selectable?.selected.includes( item?.id || index );
			return renderPanel
				? <Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon/>}
						classes={{
							root   : editing ? 'iconSpace' : undefined,
							content: 'center'
						}}>
						{itemRow( item, index )}
					</AccordionSummary>
					<AccordionDetails>
						{renderPanel( item, index )}
					</AccordionDetails>
				</Accordion>
				: selectable ? <ListItemButton
					divider
					selected={selected}
					onClick={selectable.onSelect && ( () => {
						if ( selected ? totalSelected <= selectable?.min : totalSelected >= selectable?.max ) return;
						selectable.onSelect( item?.id || index, !selected );
					} )}
					className={editing ? 'iconSpace' : undefined}>
					{itemRow( item, index )}
				</ListItemButton> : <ListItem divider className={editing ? 'iconSpace' : undefined}>
					{itemRow( item, index )}
				</ListItem>;
		};
		
		return <TransitionGroup component={null}>
			{data.map( ( item, index ) => <CSSTransition
				key={item.id || index}
				timeout={theme.transitions.duration.standard}
				classNames='slide'>
				{row( item, index )}
			</CSSTransition> )}
		</TransitionGroup>;
	}, [ data, Boolean( editable ), sortable, editing ] );
	
	const sortItems = sortable
		? data.length ? <ReactSortable
			list={data as any}
			setList={setData as any}
			handle='.sortHandle'
			ghostClass='selectedSort'
			forceFallback
			animation={theme.transitions.duration.shorter}>
			{dataItems}
		</ReactSortable> : undefined
		: dataItems;
	
	return <List
		sx={{
			'& .center'   : { alignItems: 'center', my: 1 },
			'& .iconSpace': { pl: 0 },
			'& .slide'    : {
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
		}}
		subheader={Boolean( title || editable || sortable ) && <ActionTitle
			title={title}
			actions={editable || sortable ? [ {
				name     : editing ? 'Cancel' : 'Edit',
				onClick  : () => setEditing( !editing ),
				startIcon: editing ? <CloseIcon/> : <EditIcon/>
			}, ...( editable?.max ? data.length < editable.max : true ) ? [ {
				name     : 'Add',
				onClick  : async () => setData( [ ...data, { ...await editable.newData() } ] ),
				color    : 'primary' as any,
				startIcon: <AddIcon/>
			} ] : [] ] : undefined}
		/>}
		{...props}>
		{renderPanel ? sortItems : <Paper>{sortItems}</Paper>}
	</List>;
}
