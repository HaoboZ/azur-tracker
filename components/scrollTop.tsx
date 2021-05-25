import { Fab, makeStyles, Theme, useMediaQuery, useScrollTrigger, Zoom } from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles( ( theme ) => ( {
	root: {
		position: 'fixed',
		zIndex  : 1400,
		bottom  : `calc(env(safe-area-inset-bottom) + ${theme.spacing( 3 )}px)`,
		right   : theme.spacing( 3 )
	}
} ) );

export default function ScrollTop() {
	const classes = useStyles();
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	
	const trigger = useScrollTrigger( { disableHysteresis: true } );
	
	return <Zoom in={trigger} style={{ marginBottom: wide ? 0 : 64 }}>
		<Fab
			className={classes.root}
			color='secondary'
			size='medium'
			onClick={() => window.scrollTo( { top: 0, behavior: 'smooth' } )}>
			<KeyboardArrowUpIcon/>
		</Fab>
	</Zoom>;
}
