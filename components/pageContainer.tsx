import { Box, Container, makeStyles, Theme, Typography, useMediaQuery } from '@material-ui/core';
import React from 'react';

import usePageHeight from '../lib/hooks/usePageHeight';
import ScrollTop from './scrollTop';

const useStyles = makeStyles<Theme, { height: number }>( ( theme ) => ( {
	scroll   : ( { height } ) => ( {
		// overflowY              : 'auto',
		// WebkitOverflowScrolling: 'touch'
		[ theme.breakpoints.up( 'sm' ) ]  : {
			minHeight: `min(calc(100vh - 64px - env(safe-area-inset-top) - env(safe-area-inset-bottom)), ${height - 64}px)`
		},
		[ theme.breakpoints.down( 'xs' ) ]: {
			minHeight: `min(calc(100vh - 56px - env(safe-area-inset-top) - env(safe-area-inset-bottom)), ${height - 56}px)`
		}
	} ),
	container: {
		display  : 'flex',
		flexFlow : 'column',
		overflowX: 'hidden'
	}
} ) );

export default function PageContainer( { title, children }: {
	title?: string,
	children?: React.ReactNode
} ) {
	const height = usePageHeight();
	const classes = useStyles( { height } );
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ), { noSsr: true } );
	
	// const targetRef = React.useRef<HTMLDivElement>();
	//
	// React.useEffect( () => {
	// 	if ( !targetRef.current ) return;
	// 	disableBodyScroll( targetRef.current );
	// }, [ targetRef ] );
	
	return <div
		// ref={targetRef}
		className={classes.scroll}>
		<ScrollTop/>
		<Container
			maxWidth='md'
			disableGutters={!wide}
			className={classes.container}>
			{title && <Typography variant='h6' component={Box} p={2}>{title}</Typography>}
			{children}
		</Container>
	</div>;
}
