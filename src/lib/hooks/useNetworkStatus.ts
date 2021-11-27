import { useState } from 'react';
import useEventEffect from './useEventEffect';

export default function useNetworkStatus() {
	const [ networkStatus, setNetworkStatus ] = useState( navigator.onLine );
	
	useEventEffect( window, 'online', () => setNetworkStatus( navigator.onLine ), [] );
	useEventEffect( window, 'offline', () => setNetworkStatus( navigator.onLine ), [] );
	
	return networkStatus;
}
