import { Fab, useScrollTrigger, Zoom } from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import React from 'react';

export default function ScrollTop() {
	const trigger = useScrollTrigger( { disableHysteresis: true } );
	
	return <Zoom in={trigger}>
		<Fab
			color='secondary'
			size='medium'
			sx={{
				position    : 'fixed',
				zIndex      : 1400,
				bottom      : 'calc(env(safe-area-inset-bottom) + 24px)',
				right       : 'calc(env(safe-area-inset-right) + 24px)',
				marginBottom: {
					xs: 8,
					sm: 0
				}
			}}
			onClick={() => window.scrollTo( { top: 0, behavior: 'smooth' } )}>
			<KeyboardArrowUpIcon/>
		</Fab>
	</Zoom>;
}
