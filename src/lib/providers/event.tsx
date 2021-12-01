import { EventEmitter } from 'events';
import { createContext, useContext, useState } from 'react';

const EventContext = createContext<EventEmitter>( null );
EventContext.displayName = 'Event';

export default function EventProvider( { children } ) {
	const [ events ] = useState( () => new EventEmitter() );
	
	return <EventContext.Provider value={events}>{children}</EventContext.Provider>;
}

export function useEvent() {
	return useContext( EventContext );
}

export function withEvent( Component ) {
	return ( props ) => (
		<EventContext.Consumer>
			{( event ) => <Component event={event} {...props}/>}
		</EventContext.Consumer>
	);
}
