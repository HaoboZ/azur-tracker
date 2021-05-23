import { Box, Container, makeStyles, Theme, Typography, useMediaQuery } from '@material-ui/core';
import React from 'react';

import usePageHeight from '../lib/hooks/usePageHeight';

const useStyles = makeStyles( {
	container: {
		display  : 'flex',
		flexFlow : 'column',
		overflowX: 'hidden'
	}
} );

export default function PageContainer( { title, children, heightType = 'minHeight' }: {
	title: string,
	children: React.ReactNode,
	heightType?: string
} ) {
	const classes = useStyles();
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	const height = usePageHeight();
	
	return <Container
		maxWidth='md'
		disableGutters={!wide}
		className={classes.container}
		style={{ [ heightType ]: height }}>
		<Typography variant='h6' component={Box} p={2}>{title}</Typography>
		{children}
	</Container>;
}
