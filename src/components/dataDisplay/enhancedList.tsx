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
	setData = () => null,
	newData = () => ( {} as Item ),
	...props
}: {
	title?: React.ReactNode,
	data: Item[],
	renderRow: ( item: Item, index: number ) => React.ReactNode,
	renderPanel?: ( item: Item, index: number ) => React.ReactNode,
	editable?: boolean,
	setData?: ( items: Item[] ) => void, // required if sortable or editable is true
	newData?: () => Item | Promise<Item>  // required if editable is true
} & ListProps ) {
	const theme = useTheme();
	
	const [ editing, setEditing ] = React.useState( false );
	
	const contents = editable
		? data.length ? <ReactSortable
			list={data as any}
			setList={setData as any}
			handle='.sortHandle'
			ghostClass='selectedSort'
			forceFallback
			animation={theme.transitions.duration.shorter}>
			<TransitionGroup component={null}>
				{data.map( ( item, index ) => {
					const itemRow = <>
						{editing && <ListItemIcon>
							<IconButton className='sortHandle'><MenuIcon/></IconButton>
						</ListItemIcon>}
						{renderRow( item, index )}
						{editing && <ListItemIcon sx={{ minWidth: 'unset' }}>
							<IconButton onClick={() => {
								const _data = [ ...data ];
								_data.splice( index, 1 );
								setData?.( _data );
							}}><CloseIcon/></IconButton>
						</ListItemIcon>}
					</>;
					
					return <CSSTransition
						key={item.id || index}
						timeout={theme.transitions.duration.standard}
						classNames='slide'>
						{renderPanel
							? <Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon/>}
									classes={{
										root   : editing ? 'iconSpace' : undefined,
										content: 'center'
									}}>
									{itemRow}
								</AccordionSummary>
								<AccordionDetails>
									{renderPanel( item, index )}
								</AccordionDetails>
							</Accordion>
							: <ListItem divider className={editing ? 'iconSpace' : undefined}>
								{itemRow}
							</ListItem>}
					</CSSTransition>;
				} )}
			</TransitionGroup>
		</ReactSortable> : undefined
		: data.map( ( item, index ) => renderPanel ? <Accordion key={item.id || index}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon/>}
				classes={{ content: 'center' }}>
				{renderRow( item, index )}
			</AccordionSummary>
			<AccordionDetails>
				{renderPanel( item, index )}
			</AccordionDetails>
		</Accordion> : <ListItem key={item.id || index} divider>
			{renderRow( item, index )}
		</ListItem> );
	
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
		subheader={( title || editable ) && <ActionTitle
			title={title}
			actions={editable ? [ {
				name   : editing ? 'Cancel' : 'Edit',
				onClick: () => setEditing( !editing ),
				props  : { startIcon: editing ? <CloseIcon/> : <EditIcon/> }
			}, {
				name   : 'Add',
				onClick: async () => setData?.( [ ...data, { ...await newData?.() } ] ),
				props  : { color: 'primary', startIcon: <AddIcon/> }
			} ] : []}
		/>}
		{...props}>
		{renderPanel ? contents : <Paper>{contents}</Paper>}
	</List>;
}
