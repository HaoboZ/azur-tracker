import { Box, Container, makeStyles, Theme, Typography, useMediaQuery } from '@material-ui/core';
import React from 'react';

import usePageHeight from '../lib/hooks/usePageHeight';
import ScrollTop from './scrollTop';

const useStyles = makeStyles( {
	scroll   : {
		overflowY              : 'auto',
		WebkitOverflowScrolling: 'touch'
	},
	container: {
		display  : 'flex',
		flexFlow : 'column',
		overflowX: 'hidden'
	}
} );

export default function PageContainer( { title, children }: {
	title: string,
	children: React.ReactNode
} ) {
	const classes = useStyles();
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	const height = usePageHeight();
	
	const targetRef = React.useRef<HTMLDivElement>();
	
	React.useEffect( () => {
		if ( !targetRef.current ) return;
		// disableBodyScroll( targetRef.current );
	}, [ targetRef ] );
	
	return <div
		// id='scroller'
		// ref={targetRef}
		// className={classes.scroll}
		style={{ minHeight: height }}>
		<ScrollTop/>
		<Container
			maxWidth='md'
			disableGutters={!wide}
			className={classes.container}>
			<Typography variant='h6' component={Box} p={2}>{title}</Typography>
			{children}
		</Container>
	</div>;
}
