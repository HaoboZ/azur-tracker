import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	IconButton,
	List,
	ListItem,
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
	renderRow,
	renderPanel,
	editable,
	sortable,
	setData = () => null,
	newData = () => ( {} as Item ),
	...props
}: {
	title?: React.ReactNode,
	data: Item[],
	renderRow: ( item: Item, index: number ) => React.ReactNode,
	renderPanel?: ( item: Item, index: number ) => React.ReactNode,
	editable?: boolean,
	sortable?: boolean,
	setData?: ( items: Item[] ) => void, // required if sortable or editable is true
	newData?: () => Item | Promise<Item>  // required if editable is true
} & ListProps ) {
	const theme = useTheme();
	
	const [ editing, setEditing ] = React.useState( false );
	
	const dataItems = React.useMemo( () => {
		const itemRow = ( item, index ) => <>
			{sortable && editing && <ListItemIcon>
				<IconButton className='sortHandle'><MenuIcon/></IconButton>
			</ListItemIcon>}
			{renderRow( item, index )}
			{editable && editing && <ListItemIcon sx={{ minWidth: 'unset' }}>
				<IconButton onClick={() => {
					const _data = [ ...data ];
					_data.splice( index, 1 );
					setData?.( _data );
				}}><CloseIcon/></IconButton>
			</ListItemIcon>}
		</>;
		
		const row = ( item, index ) => renderPanel
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
			: <ListItem divider className={editing ? 'iconSpace' : undefined}>
				{itemRow( item, index )}
			</ListItem>;
		
		return <TransitionGroup component={null}>
			{data.map( ( item, index ) => <CSSTransition
				key={item.id || index}
				timeout={theme.transitions.duration.standard}
				classNames='slide'>
				{row( item, index )}
			</CSSTransition> )}
		</TransitionGroup>;
	}, [ data, editable, sortable, editing ] );
	
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
		subheader={( title || editable || sortable ) && <ActionTitle
			title={title}
			actions={editable || sortable ? [ {
				name     : editing ? 'Cancel' : 'Edit',
				onClick  : () => setEditing( !editing ),
				startIcon: editing ? <CloseIcon/> : <EditIcon/>
			}, {
				name     : 'Add',
				onClick  : async () => setData?.( [ ...data, { ...await newData?.() } ] ),
				color    : 'primary',
				startIcon: <AddIcon/>
			} ] : undefined}
		/>}
		{...props}>
		{renderPanel ? sortItems : <Paper>{sortItems}</Paper>}
	</List>;
}
