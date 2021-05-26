import React from 'react';

export default function usePageHeight() {
	const [ height, setHeight ] = React.useState( window.innerHeight );
	
	React.useEffect( () => {
		const updateDimensions = () => setHeight( window.innerHeight );
		window.addEventListener( 'resize', updateDimensions );
		return () => window.removeEventListener( 'resize', updateDimensions );
	}, [] );
	
	return height;
}
