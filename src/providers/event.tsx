import { EventEmitter } from 'events';
import { createContext, DependencyList, useContext, useState } from 'react';
import useEventListener from '../hooks/useEventListener';

const EventsContext = createContext<EventEmitter>( null );
EventsContext.displayName = 'Events';

export default function EventsProvider( { children } ) {
	const [ events ] = useState( () => new EventEmitter() );
	
	return <EventsContext.Provider value={events}>{children}</EventsContext.Provider>;
}

export function useEvents(): EventEmitter;
export function useEvents(
	name: string | symbol | keyof WindowEventMap,
	listener: ( ...args: any[] ) => void,
	options?: { callOnce?: boolean, dependencies?: DependencyList }
);
export function useEvents(
	name?: string | symbol | keyof WindowEventMap,
	listener?: ( ...args: any[] ) => void,
	options?: { callOnce?: boolean, dependencies?: DependencyList }
) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	if ( !name ) return useContext( EventsContext );
	// eslint-disable-next-line react-hooks/rules-of-hooks
	return useEventListener( useContext( EventsContext ), name, listener, options );
}

export function withEvents( Component ) {
	return ( props ) => (
		<EventsContext.Consumer>
			{( events ) => <Component events={events} {...props}/>}
		</EventsContext.Consumer>
	);
}
