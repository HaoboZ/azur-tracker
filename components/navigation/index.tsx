import { makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';

import BottomBar from './bottomBar';
import TitleBar from './titleBar';

const useStyles = makeStyles( ( theme ) => ( {
	safeArea: {
		paddingTop   : theme.breakpoints.up( 'sm' ) ? 0 : 'env(safe-area-inset-top)',
		paddingLeft  : 'env(safe-area-inset-left)',
		paddingRight : 'env(safe-area-inset-right)',
		paddingBottom: 'env(safe-area-inset-bottom)'
	}
} ) );

export default function Navigation( { children } ) {
	const classes = useStyles();
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	
	return <>
		{wide && <TitleBar/>}
		<div className={classes.safeArea}>
			{children}
		</div>
		{!wide && <BottomBar/>}
	</>;
}
