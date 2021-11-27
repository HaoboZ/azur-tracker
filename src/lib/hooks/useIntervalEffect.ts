import { DependencyList, useEffect } from 'react';

export default function useIntervalEffect<TArgs extends any[]>(
	callback: ( ...args: TArgs ) => void,
	ms?: number,
	deps?: DependencyList,
	...args: TArgs
) {
	useEffect( () => {
		const interval = setInterval( callback, ms, ...args );
		return () => clearInterval( interval );
	}, deps );
}
