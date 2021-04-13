import { Button, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React from 'react';
import EnhancedList from '../components/enhancedList';

const data = [ ...Array( 10 ) ].map( ( _, i ) => ( { name: `Item ${i}` } ) );

export default function Test() {
	const [ list, setList ] = React.useState( data );
	
	return <EnhancedList
		data={list}
		renderRow={( item ) => <>
			<ListItemText primary={item.name} secondary='test'/>
			<ListItemSecondaryAction><Button>It works</Button></ListItemSecondaryAction>
			</>}
		setData={setList}
		newData={() => ( { name: 'New Item' } )}
		sortable
		editable
	/>;
}
