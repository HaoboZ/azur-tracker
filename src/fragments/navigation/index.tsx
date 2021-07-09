import { Box, Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';

import BottomBar from './bottomBar';
import TitleBar from './titleBar';

export default function Navigation( { children } ) {
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ), { noSsr: true } );
	
	if ( wide ) {
		return <TitleBar>
			<Box sx={{
				paddingLeft : 'env(safe-area-inset-left)',
				paddingRight: 'env(safe-area-inset-right)'
			}}>{children}</Box>
		</TitleBar>;
	} else {
		return <BottomBar>
			<Box sx={{
				paddingLeft : 'env(safe-area-inset-left)',
				paddingRight: 'env(safe-area-inset-right)'
			}}>{children}</Box>
		</BottomBar>;
	}
}
