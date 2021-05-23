import { makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';

import BottomBar from './bottomBar';
import TitleBar from './titleBar';

const useStyles = makeStyles( {
	safeArea : {
		paddingLeft : 'env(safe-area-inset-left)',
		paddingRight: 'env(safe-area-inset-right)'
		// overflowY              : 'auto',
		// WebkitOverflowScrolling: 'touch'
	},
	statusBar: {
		width : '100%',
		height: 'env(safe-area-inset-top)'
	}
} );

export default function Navigation( { children } ) {
	const classes = useStyles();
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	
	const targetRef = React.useRef<HTMLDivElement>();
	
	React.useEffect( () => {
		if ( !targetRef.current ) return;
		// disableBodyScroll( targetRef.current );
	}, [ targetRef ] );
	
	return <>
		{wide ? <TitleBar/> : <div className={classes.statusBar}/>}
		<div ref={targetRef} className={classes.safeArea}>{children}</div>
		{!wide && <BottomBar/>}
	</>;
}
