import { Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';

export default function usePageHeight() {
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	
	const [ height, setHeight ] = React.useState( window.innerHeight );
	
	React.useEffect( () => {
		const updateDimensions = () => setHeight( window.innerHeight );
		updateDimensions();
		window.addEventListener( 'resize', updateDimensions );
		return () => window.removeEventListener( 'resize', updateDimensions );
	}, [] );
	
	return `min(calc(100vh - ${wide ? 64 : 56}px - env(safe-area-inset-top) - env(safe-area-inset-bottom)), ${height - ( wide ? 64 : 56 )}px)`;
}
