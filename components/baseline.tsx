import { Box, Container, CssBaseline, ThemeProvider } from '@material-ui/core';
import _ from 'lodash';
import { useSession } from 'next-auth/client';
import React from 'react';
import { useSelector } from 'react-redux';

import { getBackup, setBackup } from '../lib/backup';
import SnackbarProvider from '../lib/provider/snackbarProvider';
import themes from '../lib/theme';
import Navigation from './navigation';

export default function Baseline( { children }: {
	children?: React.ReactElement
} ) {
	const { main, ...store } = useSelector( store => store );
	const [ session ] = useSession();
	
	const delayedSetBackup = React.useMemo( () => {
		return _.debounce( setBackup, main.autoSaveInterval );
	}, [ main.autoSaveInterval ] );
	
	React.useEffect( () => {
		if ( main.autoBackup && session ) delayedSetBackup();
	}, Object.values( store ) );
	
	React.useEffect( () => {
		const interval = setInterval( () => {
			if ( main.autoBackup && session ) getBackup().then();
		}, main.autoLoadInterval );
		return () => clearInterval( interval );
	}, [ main.autoLoadInterval ] );
	
	return <ThemeProvider theme={themes[ main.theme ]}>
		<SnackbarProvider>
			<CssBaseline/>
			<Navigation/>
			{/*@ts-ignore*/}
			<Container maxWidth='md' component={Box} pt={2} pb={4}>
				{children}
			</Container>
		</SnackbarProvider>
	</ThemeProvider>;
}
