import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	makeStyles,
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

import ActionTitle from './actionTitle';

const useStyles = makeStyles( ( theme ) => ( {
	center:       {
		alignItems:       'center',
		marginTop:        theme.spacing( 1 ),
		marginBottom:     theme.spacing( 1 ),
		'&.Mui-expanded': {
			marginTop:    theme.spacing( 2 ),
			marginBottom: theme.spacing( 2 )
		}
	},
	iconSpace:    {
		paddingLeft: 0
	},
	selectedSort: {
		backgroundColor: `${theme.palette.secondary.main} !important`
	},
	slide:        {
		'&-enter':        {
			overflowY:     'hidden',
			maxHeight:     0,
			paddingTop:    0,
			paddingBottom: 0
		},
		'&-enter-active': {
			maxHeight:     `${theme.spacing( 10 )}px !important`,
			paddingTop:    `${theme.spacing()}px !important`,
			paddingBottom: `${theme.spacing()}px !important`,
			transition:    'all 200ms ease-in-out'
		},
		'&-exit':         {
			maxHeight:     theme.spacing( 10 ),
			paddingTop:    theme.spacing(),
			paddingBottom: theme.spacing()
		},
		'&-exit-active':  {
			overflowY:     'hidden',
			maxHeight:     '0 !important',
			paddingTop:    '0 !important',
			paddingBottom: '0 !important',
			transition:    'all 200ms ease-in-out'
		}
	}
} ) );

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
	title?: React.ReactNode
	data: Item[]
	renderRow: ( item: Item, index: number ) => React.ReactNode
	renderPanel?: ( item: Item, index: number ) => React.ReactNode
	editable?: boolean
	setData?: ( items: Item[] ) => void // required if sortable or editable is true
	newData?: () => Item | Promise<Item>  // required if editable is true
} & React.ComponentProps<typeof List> ) {
	const classes = useStyles();
	
	const [ editing, setEditing ] = React.useState( false );
	
	return <List
		subheader={( title || editable ) && <ActionTitle title={title} actions={editable ? [ {
			name:    editing ? 'Cancel' : 'Edit',
			onClick: () => setEditing( !editing ),
			props:   { startIcon: editing ? <CloseIcon/> : <EditIcon/> }
		}, {
			name:    'Add',
			onClick: async () => setData?.( [ ...data, { ...await newData?.() } ] ),
			props:   { color: 'primary', startIcon: <AddIcon/> }
		} ] : []}/>}
		{...props}>
		<Paper>
			{editable ? <ReactSortable
				list={data as any}
				setList={setData as any}
				handle='.sortHandle'
				ghostClass={classes.selectedSort}
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
							classNames={classes.slide}>
							{renderPanel ? <Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon/>}
									classes={{
										root:    classes.iconSpace,
										content: classes.center
									}}>
									{itemRow}
								</AccordionSummary>
								<AccordionDetails>
									{renderPanel( item, index )}
								</AccordionDetails>
							</Accordion> : <ListItem divider className={classes.iconSpace}>
								{itemRow}
							</ListItem>}
						</CSSTransition>;
					} )}
				</TransitionGroup>
			</ReactSortable> : data.map( ( item, index ) => renderPanel ? <Accordion key={item.id || index}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon/>}
					classes={{ content: classes.center }}>
					{renderRow( item, index )}
				</AccordionSummary>
				<AccordionDetails>
					{renderPanel( item, index )}
				</AccordionDetails>
			</Accordion> : <ListItem key={item.id || index} divider>
				{renderRow( item, index )}
			</ListItem> )}
		</Paper>
	</List>;
}
