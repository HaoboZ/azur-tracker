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
		// eslint-disable-next-line @typescript-eslint/dot-notation
		const add = event[ 'on' ] || event[ 'addListener' ] || event[ 'addEventListener' ];
		// eslint-disable-next-line @typescript-eslint/dot-notation
		const remove = event[ 'off' ] || event[ 'removeListener' ] || event[ 'removeEventListener' ];
		
		if ( callOnce ) listener();
		add.bind( event )( eventName, listener );
		return () => {
			remove.bind( event )( eventName, listener );
		};
	}, deps );
}
