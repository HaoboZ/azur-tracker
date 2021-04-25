import { Box, Container, CssBaseline, Theme, ThemeProvider, useMediaQuery } from '@material-ui/core';
import _ from 'lodash';
import { useSession } from 'next-auth/client';
import React from 'react';
import { useSelector } from 'react-redux';

import { getBackup, setBackup } from '../lib/backup';
import IndicatorProvider, { useIndicator } from '../lib/provider/indicatorProvider';
import SnackbarProvider from '../lib/provider/snackbarProvider';
import useTheme from '../lib/useTheme';
import Navigation from '../components/navigation';

export default function Baseline( { children }: { children?: React.ReactNode } ) {
	const theme = useTheme();
	
	return <ThemeProvider theme={theme}>
		<SnackbarProvider>
			<IndicatorProvider>
				<CssBaseline/>
				<Content>{children}</Content>
			</IndicatorProvider>
		</SnackbarProvider>
	</ThemeProvider>;
}

function Content( { children } ) {
	const { main, ...store } = useSelector( store => store );
	const [ session ] = useSession();
	const indicator = useIndicator();
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	
	const delayedSetBackup = React.useMemo(
		() => _.debounce( () => indicator( setBackup() ), main.autoSaveInterval ),
		[ main.autoSaveInterval ] );
	
	React.useEffect( () => {
		if ( main.autoSave && session ) delayedSetBackup();
	}, Object.values( store ) );
	
	React.useEffect( () => {
		if ( main.autoLoad && session ) indicator( getBackup() ).then();
	}, [ session ] );
	
	React.useEffect( () => {
		const interval = setInterval( () => {
			if ( main.autoLoad && session ) indicator( getBackup() ).then();
		}, main.autoLoadInterval );
		return () => clearInterval( interval );
	}, [ main.autoLoadInterval ] );
	
	return <Navigation>
		{/*@ts-ignore*/}
		<Container maxWidth='md' disableGutters={!wide} component={Box} overflow='hidden' pb={4}>
			{children}
		</Container>
	</Navigation>;
}
