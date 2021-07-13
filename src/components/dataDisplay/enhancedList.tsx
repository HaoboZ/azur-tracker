import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListProps,
	Paper
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
	const [ editing, setEditing ] = React.useState( false );
	
	const contents = editable
		? data.length ? <ReactSortable
			list={data as any}
			setList={setData as any}
			handle='.sortHandle'
			ghostClass='selectedSort'
			forceFallback
			animation={150}>
			<TransitionGroup component={null}>
				{data.map( ( item, index ) => {
					const itemRow = <>
						{editing && <ListItemIcon>
							<IconButton onClick={() => {
								const _data = [ ...data ];
								_data.splice( index, 1 );
								setData?.( _data );
							}}><CloseIcon/></IconButton>
							<IconButton className='sortHandle'><MenuIcon/></IconButton>
						</ListItemIcon>}
						{renderRow( item, index )}
					</>;
					
					return <CSSTransition
						key={item.id || index}
						timeout={200}
						mountOnEnter
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
			'& .center'   : { alignItems: 'center', marginY: 1 },
			'& .iconSpace': { paddingLeft: 0 },
			'& .slide'    : {
				'&-enter'       : { opacity: 0 },
				'&-enter-active': { opacity: 1, transition: 'all 200ms ease-in-out' },
				'&-exit'        : { opacity: 1 },
				'&-exit-active' : { opacity: 0, transition: 'all 200ms ease-in-out' }
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
