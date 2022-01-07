import { EventEmitter } from 'events';
import { createContext, useContext, useState } from 'react';

const EventContext = createContext<EventEmitter>( null );
EventContext.displayName = 'Event';

export default function EventsProvider( { children } ) {
	const [ events ] = useState( () => new EventEmitter() );
	
	return <EventContext.Provider value={events}>{children}</EventContext.Provider>;
}

export function useEvents() {
	return useContext( EventContext );
}

export function withEvents( Component ) {
	return ( props ) => (
		<EventContext.Consumer>
			{( event ) => <Component event={event} {...props}/>}
		</EventContext.Consumer>
	);
}
