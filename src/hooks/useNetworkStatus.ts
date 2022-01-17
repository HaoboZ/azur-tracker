import { useState } from 'react';
import useEventEffect from './useEventEffect';

export default function useNetworkStatus() {
	const [ networkStatus, setNetworkStatus ] = useState( navigator.onLine );
	
	useEventEffect( window, {
		name    : 'online',
		listener: () => setNetworkStatus( navigator.onLine )
	}, [] );
	useEventEffect( window, {
		name    : 'offline',
		listener: () => setNetworkStatus( navigator.onLine )
	}, [] );
	
	return networkStatus;
}
