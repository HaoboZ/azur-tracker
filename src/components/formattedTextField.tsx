import { TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';

export default function FormattedTextField( props: TextFieldProps ) {
	const [ text, setText ] = React.useState( props.value );
	
	return <TextField
		{...props}
		value={text}
		onChange={( e ) => {
			setText( e.target.value );
			props.onChange?.( e );
		}}
		onBlur={( e ) => {
			setText( props.value );
			props.onBlur?.( e );
		}}
	/>;
}
