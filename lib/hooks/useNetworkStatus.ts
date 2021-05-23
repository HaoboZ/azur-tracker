import React from 'react';

export default function useNetworkStatus() {
	const [ networkStatus, setNetworkStatus ] = React.useState( navigator.onLine );
	
	React.useEffect( () => {
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
