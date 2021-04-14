import { Button, Divider, IconButton, List, ListItem, ListItemIcon, makeStyles } from '@material-ui/core';
import { Add as AddIcon, Close as CloseIcon, Edit as EditIcon, Menu as MenuIcon } from '@material-ui/icons';
import React from 'react';
import { ReactSortable } from 'react-sortablejs';

import ActionTitle from './actionTitle';

const useStyles = makeStyles( ( theme ) => ( {
	selectedSort: {
		backgroundColor: `${theme.palette.secondary.main} !important`
	}
} ) );

export default function EnhancedList<Item>( {
	title = 'List Title',
	data,
	renderRow,
	sortable,
	editable,
	setData,
	newData = () => ( {} as Item ),
	...props
}: {
	title?: string
	data: Item[]
	renderRow: ( ( item: Item, index: number ) => React.ReactNode )
	sortable?: boolean
	editable?: boolean
	setData?: ( items: Item[] ) => void // required if sortable or editable is true
	newData?: () => Item | Promise<Item>  // required if editable is true
} & React.ComponentProps<typeof List> ) {
	const classes = useStyles();
	
	const [ editing, setEditing ] = React.useState( false );
	
	const listData = data.map( ( item, index ) => <ListItem key={index} divider>
		<Divider/>
		{editing && <ListItemIcon>
			{editable && <IconButton onClick={() => {
				const _data = [ ...data ];
				_data.splice( index, 1 );
				setData( _data );
			}}><CloseIcon/></IconButton>}
			{sortable && <IconButton className='sortHandle'><MenuIcon/></IconButton>}
		</ListItemIcon>}
		{renderRow( item, index )}
	</ListItem> );
	
	return <List
		subheader={<ActionTitle title={title} actions={[ {
			name:    editing ? 'Cancel' : 'Edit',
			onClick: () => setEditing( !editing ),
			props:   { startIcon: editing ? <CloseIcon/> : <EditIcon/> }
		}, {
			name:    'Add',
			onClick: async () => setData( [ ...data, { ...await newData() } ] ),
			props:   { color: 'primary', startIcon: <AddIcon/> }
		} ]}/>}
		{...props}>
		{sortable ?
			<ReactSortable
				list={data as any}
				setList={setData as any}
				handle='.sortHandle'
				ghostClass={classes.selectedSort}
				forceFallback
				animation={150}>
				{listData}
			</ReactSortable>
			: listData}
	</List>;
}
