import { DependencyList, useEffect } from 'react';

export default function useEventEffect(
	event: { on: Function, off: Function }
	| { addListener: Function, removeListener: Function }
	| { addEventListener: Function, removeEventListener: Function },
	options: {
		name: string | symbol | keyof WindowEventMap,
		listener: ( ...args: any[] ) => void,
		callOnce?: boolean
	},
	deps?: DependencyList
) {
	useEffect( () => {
		// @ts-ignore
		const add = event.on || event.addListener || event.addEventListener;
		// @ts-ignore
		const remove = event.off || event.removeListener || event.removeEventListener;
		
		if ( options.callOnce ) options.listener();
		add.bind( event )( options.name, options.listener );
		return () => {
			remove.bind( event )( options.name, options.listener );
		};
	}, deps );
}
