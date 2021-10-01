import { throttle } from 'lodash';
import React, { Dispatch, SetStateAction } from 'react';

export default function useDelayedState<S>( initialState?: S, delay = 250 ): [ S, S, Dispatch<SetStateAction<S>> ] {
	const [ value, setValue ] = React.useState( initialState );
	const [ delayedValue, setDelayedValue ] = React.useState( initialState );
	const setDelay = React.useCallback( throttle( setDelayedValue, delay ), [ delay ] );
	
	return [ value, delayedValue, ( value ) => {
		setValue( value );
		setDelay( value );
	} ];
}
