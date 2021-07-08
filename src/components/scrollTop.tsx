import { Fab, useScrollTrigger, Zoom } from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles( ( theme ) => ( {
	scrollUp: {
		position                          : 'fixed',
		zIndex                            : 1400,
		bottom                            : `calc(env(safe-area-inset-bottom) + ${theme.spacing( 3 )})`,
		right                             : theme.spacing( 3 ),
		[ theme.breakpoints.down( 'sm' ) ]: { marginBottom: 64 }
	}
} ) );

export default function ScrollTop() {
	const classes = useStyles();
	const trigger = useScrollTrigger( { disableHysteresis: true } );
	
	return <Zoom in={trigger}>
		<Fab
			className={classes.scrollUp}
			color='secondary'
			size='medium'
			onClick={() => window.scrollTo( { top: 0, behavior: 'smooth' } )}>
			<KeyboardArrowUpIcon/>
		</Fab>
	</Zoom>;
}
