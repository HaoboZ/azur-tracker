import { DependencyList, useEffect } from 'react';

export default function useEventEffect(
	event: { on: Function, off: Function }
		| { addListener: Function, removeListener: Function }
		| { addEventListener: Function, removeEventListener: Function },
	eventName: string | symbol | keyof WindowEventMap,
	listener: ( ...args: any[] ) => void,
	deps?: DependencyList,
	callOnce?: boolean
) {
	useEffect( () => {
		const add = event[ 'on' ] || event[ 'addListener' ] || event[ 'addEventListener' ];
		const remove = event[ 'off' ] || event[ 'removeListener' ] || event[ 'removeEventListener' ];
		
		if ( callOnce ) listener();
		add( eventName, listener );
		return () => {
			remove( eventName, listener );
		};
	}, deps );
}
