import { EventEmitter } from 'events';
import React from 'react';

const EventContext = React.createContext<EventEmitter>( null );
EventContext.displayName = 'Event';

export default function EventProvider( { children } ) {
	const [ events ] = React.useState( () => new EventEmitter() );
	
	return <EventContext.Provider value={events}>{children}</EventContext.Provider>;
}

export function useEvent() {
	return React.useContext( EventContext );
}

export function withEvent( Component ) {
	return ( props ) => <EventContext.Consumer>
		{( event ) => <Component event={event} {...props}/>}
	</EventContext.Consumer>;
}
