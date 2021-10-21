import { useEffect, useState } from 'react';

export default function usePageHeight() {
	const [ height, setHeight ] = useState( window.innerHeight );
	
	// window event listener resize event
	useEffect( () => {
		const updateDimensions = () => setHeight( window.innerHeight );
		window.addEventListener( 'resize', updateDimensions );
		return () => window.removeEventListener( 'resize', updateDimensions );
	}, [] );
	
	return height;
}
