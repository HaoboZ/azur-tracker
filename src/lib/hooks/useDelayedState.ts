import { throttle } from 'lodash';
import React from 'react';

export default function useDelayedState( initialState, delay = 250 ) {
	const [ value, setValue ] = React.useState( initialState );
	const [ delayedValue, setDelayedValue ] = React.useState( initialState );
	const setDelay = React.useCallback( throttle( setDelayedValue, delay ), [ delay ] );
	
	return [ value, delayedValue, ( value ) => {
		setValue( value );
		setDelay( value );
	} ];
}
