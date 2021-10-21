import { useEffect, useState } from 'react';

export default function useNetworkStatus() {
	const [ networkStatus, setNetworkStatus ] = useState( navigator.onLine );
	
	useEffect( () => {
		const updateNetwork = () => setNetworkStatus( navigator.onLine );
		window.addEventListener( 'online', updateNetwork );
		window.addEventListener( 'offline', updateNetwork );
		return () => {
			window.removeEventListener( 'online', updateNetwork );
			window.removeEventListener( 'offline', updateNetwork );
		};
	}, [] );
	
	return networkStatus;
}
