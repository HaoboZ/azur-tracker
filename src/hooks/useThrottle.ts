import { throttle, ThrottleSettings } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

export default function useThrottle<S>( value?: S, delay = 250, options?: ThrottleSettings ) {
	const [ debouncedValue, setDebouncedValue ] = useState( value );
	
	const setValueThrottled = useCallback( throttle( setDebouncedValue, delay, options ), [ delay ] );
	
	useEffect( () => {
		setValueThrottled( value );
	}, [ value ] );
	
	return debouncedValue;
}
