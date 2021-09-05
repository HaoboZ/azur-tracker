import { Box, Theme, useMediaQuery } from '@mui/material';
import React from 'react';

import BottomBar from './bottomBar';
import TitleBar from './titleBar';

export default function Navigation( { children } ) {
	if ( useMediaQuery<Theme>( ( { breakpoints } ) => breakpoints.up( 'sm' ) ) ) {
		return <TitleBar>
			<Box
				pl='env(safe-area-inset-left)'
				pr='env(safe-area-inset-right)'>
				{children}
			</Box>
		</TitleBar>;
	} else {
		return <BottomBar>
			<Box
				pl='env(safe-area-inset-left)'
				pr='env(safe-area-inset-right)'>
				{children}
			</Box>
		</BottomBar>;
	}
}
