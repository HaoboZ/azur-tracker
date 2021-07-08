import { Theme, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import BottomBar from './bottomBar';
import TitleBar from './titleBar';

const useStyles = makeStyles( {
	safeArea: {
		paddingLeft : 'env(safe-area-inset-left)',
		paddingRight: 'env(safe-area-inset-right)'
	}
} );

export default function Navigation( { children } ) {
	const classes = useStyles();
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ), { noSsr: true } );
	
	if ( wide ) {
		return <TitleBar>
			<div className={classes.safeArea}>{children}</div>
		</TitleBar>;
	} else {
		return <BottomBar>
			<div className={classes.safeArea}>{children}</div>
		</BottomBar>;
	}
}
