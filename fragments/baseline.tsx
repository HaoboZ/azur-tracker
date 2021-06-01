import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { debounce } from 'lodash';
import { useSession } from 'next-auth/client';
import React from 'react';
import { useSelector } from 'react-redux';
import smoothscroll from 'smoothscroll-polyfill';

import Navigation from '../components/navigation';
import { getBackup, setBackup } from '../lib/backup';
import useTheme from '../lib/hooks/useTheme';
import IndicatorProvider, { useIndicator } from '../lib/provider/indicatorProvider';
import SnackbarProvider from '../lib/provider/snackbarProvider';

export default function Baseline( { children }: { children?: React.ReactNode } ) {
	const theme = useTheme();
	
	React.useEffect( () => {
		smoothscroll.polyfill();
	}, [] );
	
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
	const { main, ...store } = useSelector( state => state );
	const [ session ] = useSession();
	const indicator = useIndicator();
	
	const delayedSetBackup = React.useCallback(
		debounce( () => indicator( setBackup() ), main.autoSaveInterval ),
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
		{children}
	</Navigation>;
}
