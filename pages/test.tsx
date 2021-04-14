import { Button, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React from 'react';
import {
	LeadingActions,
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
	Type
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import EnhancedList from '../components/enhancedList';

const data = [ ...Array( 10 ) ].map( ( _, i ) => ( { name: `Item ${i}` } ) );

export default function Test() {
	const [ list, setList ] = React.useState( data );
	
	return <SwipeableList type={Type.IOS}>
		<SwipeableListItem
			leadingActions={<LeadingActions>
				<SwipeAction onClick={() => console.info( 'swipe action triggered' )}>
					Action name
				</SwipeAction>
			</LeadingActions>}
			trailingActions={<TrailingActions>
				<SwipeAction
					destructive={true}
					onClick={() => console.info( 'swipe action triggered' )}>
					Delete
				</SwipeAction>
			</TrailingActions>}>
			Item content
		</SwipeableListItem>
		<SwipeableListItem
			leadingActions={<LeadingActions>
				<SwipeAction onClick={() => console.info( 'swipe action triggered' )}>
					Action name
				</SwipeAction>
			</LeadingActions>}
			trailingActions={<TrailingActions>
				<SwipeAction
					destructive={true}
					onClick={() => console.info( 'swipe action triggered' )}>
					Delete
				</SwipeAction>
			</TrailingActions>}>
			Item content
		</SwipeableListItem>
		<SwipeableListItem
			leadingActions={<LeadingActions>
				<SwipeAction onClick={() => console.info( 'swipe action triggered' )}>
					Action name
				</SwipeAction>
			</LeadingActions>}
			trailingActions={<TrailingActions>
				<SwipeAction
					destructive={true}
					onClick={() => console.info( 'swipe action triggered' )}>
					Delete
				</SwipeAction>
			</TrailingActions>}>
			Item content
		</SwipeableListItem>
	</SwipeableList>;
	
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
