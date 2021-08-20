import { TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';

export default function FormattedTextField( props: TextFieldProps ) {
	const [ text, setText ] = React.useState( props.value );
	const [ focused, setFocused ] = React.useState( false );
	
	React.useEffect( () => {
		if ( !focused ) setText( props.value );
	}, [ focused, props.value ] );
	
	return <TextField
		{...props}
		value={text}
		onFocus={( e ) => {
			setFocused( true );
			props.onFocus?.( e );
		}}
		onChange={( e ) => {
			setText( e.target.value );
			props.onChange?.( e );
		}}
		onBlur={( e ) => {
			setText( props.value );
			setFocused( false );
			props.onBlur?.( e );
		}}
	/>;
}
