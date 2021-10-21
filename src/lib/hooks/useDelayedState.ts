import { throttle } from 'lodash';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export default function useDelayedState<S>( initialState?: S, delay = 250 ): [ S, S, Dispatch<SetStateAction<S>> ] {
	const [ value, setValue ] = useState( initialState );
	const [ delayedValue, setDelayedValue ] = useState( initialState );
	const setDelay = useCallback( throttle( setDelayedValue, delay ), [ delay ] );
	
	return [ value, delayedValue, ( value ) => {
		setValue( value );
		setDelay( value );
	} ];
}
