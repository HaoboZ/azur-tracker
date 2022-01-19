import { useEffect, useRef, useState } from 'react';

export default function useLoading( isLoading?: boolean, delay = 250 ) {
	const [ loading, setLoading ] = useState( false );
	
	const timeout = useRef<NodeJS.Timeout>();
	
	useEffect( () => {
		setLoading( false );
		if ( isLoading ) {
			timeout.current = setTimeout( () => setLoading( true ), delay );
		} else {
			clearTimeout( timeout.current );
		}
	}, [ isLoading ] );
	
	return loading;
}
