import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';

export default function useLoading( isLoading?: boolean, delay = 250 ) {
	const [ loading, setLoading ] = useState( false );
	
	const isLoadingDebounced = useDebounce( isLoading, delay );
	
	useEffect( () => {
		setLoading( isLoading && isLoadingDebounced );
	}, [ isLoading, isLoadingDebounced ] );
	
	return loading;
}
