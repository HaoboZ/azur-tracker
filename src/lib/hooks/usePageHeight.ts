import { useState } from 'react';
import useEventEffect from './useEventEffect';

export default function usePageHeight() {
	const [ height, setHeight ] = useState( window.innerHeight );
	
	// window event listener resize event
	useEventEffect( window, 'resize', () => setHeight( window.innerHeight ), [] );
	
	return height;
}
