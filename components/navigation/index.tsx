import { makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';

import BottomBar from './bottomBar';
import TitleBar from './titleBar';

const useStyles = makeStyles( {
	view     : { minHeight: '100vh' },
	safeArea : {
		paddingLeft  : 'env(safe-area-inset-left)',
		paddingRight : 'env(safe-area-inset-right)',
		paddingBottom: 'env(safe-area-inset-bottom)'
	},
	statusBar: {
		width : '100%',
		height: 'env(safe-area-inset-top)'
	}
} );

export default function Navigation( { children } ) {
	const classes = useStyles();
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	
	return <div className={classes.view}>
		{wide ? <TitleBar/> :
			<div className={classes.statusBar}/>}
		<div className={classes.safeArea}>
			{children}
		</div>
		{!wide && <BottomBar/>}
	</div>;
}
