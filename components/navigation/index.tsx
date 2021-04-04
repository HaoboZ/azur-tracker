import { Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';

import BottomBar from './bottomBar';
import TitleBar from './titleBar';

export default function Navigation() {
	const size = useMediaQuery( ( theme: Theme ) => theme.breakpoints.up( 'sm' ) );
	
	return size ? <TitleBar/> : <BottomBar/>;
}
