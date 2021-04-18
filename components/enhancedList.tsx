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
	}
} ) );

export default function EnhancedList<Item>( {
	title,
	data,
	renderRow,
	renderPanel,
	sortable,
	editable,
	setData = () => null,
	newData = () => ( {} as Item ),
	...props
}: {
	title?: React.ReactNode
	data: Item[]
	renderRow: ( item: Item, index: number ) => React.ReactNode
	renderPanel?: ( item: Item, index: number ) => React.ReactNode
	sortable?: boolean
	editable?: boolean
	setData?: ( items: Item[] ) => void // required if sortable or editable is true
	newData?: () => Item | Promise<Item>  // required if editable is true
} & React.ComponentProps<typeof List> ) {
	const classes = useStyles();
	
	const [ editing, setEditing ] = React.useState( false );
	
	const listData = data.map( ( item, index ) => {
		const hasIcon = editing || sortable;
		
		const itemRow = <>
			{hasIcon && <ListItemIcon>
				{editing && <IconButton onClick={() => {
					const _data = [ ...data ];
					_data.splice( index, 1 );
					setData?.( _data );
				}}><CloseIcon/></IconButton>}
				{sortable && <IconButton className='sortHandle'><MenuIcon/></IconButton>}
			</ListItemIcon>}
			{renderRow( item, index )}
		</>;
		
		if ( renderPanel ) {
			return <Accordion key={index}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon/>}
					classes={{
						root:    hasIcon && classes.iconSpace,
						content: classes.center
					}}>
					{itemRow}
				</AccordionSummary>
				<AccordionDetails>
					{renderPanel( item, index )}
				</AccordionDetails>
			</Accordion>;
		} else {
			return <ListItem key={index} divider className={hasIcon && classes.iconSpace}>
				{itemRow}
			</ListItem>;
		}
	} );
	
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
			{sortable ? <ReactSortable
				list={data as any}
				setList={setData as any}
				handle='.sortHandle'
				ghostClass={classes.selectedSort}
				forceFallback
				animation={150}>
				{listData}
			</ReactSortable> : listData}
		</Paper>
	</List>;
}
