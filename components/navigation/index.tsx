import { makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';

import BottomBar from './bottomBar';
import TitleBar from './titleBar';

const useStyles = makeStyles( {
	safeArea: {
		paddingTop:    'env(safe-area-inset-top)',
		paddingLeft:   'env(safe-area-inset-left)',
		paddingRight:  'env(safe-area-inset-right)',
		paddingBottom: 'env(safe-area-inset-bottom)'
	}
} );

export default function Navigation( { children } ) {
	const classes = useStyles();
	const size = useMediaQuery( ( theme: Theme ) => theme.breakpoints.up( 'sm' ) );
	
	return <>
		{size && <TitleBar/>}
		<div className={classes.safeArea}>
			{children}
		</div>
		{!size && <BottomBar/>}
	</>;
}
