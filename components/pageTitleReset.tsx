import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';

export default function PageTitleReset( { name, reset }: {
	name: string
	reset: () => any
} ) {
	const dispatch = useDispatch();
	
	return <Grid item xs={ 12 } container justify='space-between'>
		<Typography variant='h5'>{ name }</Typography>
		<Button
			variant='contained' color='secondary'
			onClick={ () => dispatch( reset() ) }>Reset</Button>
	</Grid>;
}
