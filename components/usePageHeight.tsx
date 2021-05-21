import { Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';

export default function usePageHeight() {
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	
	const [ height, setHeight ] = React.useState( window.innerHeight );
	
	const updateDimensions = () => setHeight( window.innerHeight );
	React.useEffect( () => {
		window.addEventListener( 'resize', updateDimensions );
		return () => window.removeEventListener( 'resize', updateDimensions );
	}, [] );
	
	return `calc(${height - ( wide ? 64 : 56 )}px - env(safe-area-inset-top) - env(safe-area-inset-bottom))`;
}
