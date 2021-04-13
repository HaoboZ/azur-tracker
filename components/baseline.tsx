import { Box, Container, CssBaseline, Theme, ThemeProvider, useMediaQuery } from '@material-ui/core';
import _ from 'lodash';
import { useSession } from 'next-auth/client';
import React from 'react';
import { useSelector } from 'react-redux';

import { getBackup, setBackup } from '../lib/backup';
import SnackbarProvider from '../lib/provider/snackbarProvider';
import themes from '../lib/theme';
import Navigation from './navigation';

export default function Baseline( { children }: {
	children?: React.ReactNode
} ) {
	const { main, ...store } = useSelector( store => store );
	const [ session ] = useSession();
	
	const delayedSetBackup = React.useMemo( () => {
		return _.debounce( setBackup, main.autoSaveInterval );
	}, [ main.autoSaveInterval ] );
	
	React.useEffect( () => {
		if ( main.autoSave && session ) delayedSetBackup();
	}, Object.values( store ) );
	
	React.useEffect( () => {
		if ( main.autoLoad && session ) getBackup().then();
	}, [ session ] );
	
	React.useEffect( () => {
		const interval = setInterval( () => {
			if ( main.autoLoad && session ) getBackup().then();
		}, main.autoLoadInterval );
		return () => clearInterval( interval );
	}, [ main.autoLoadInterval ] );
	
	return <ThemeProvider theme={themes[ main.theme ]}>
		<SnackbarProvider>
			<CssBaseline/>
			<Content>
				{children}
			</Content>
		</SnackbarProvider>
	</ThemeProvider>;
}

function Content( { children } ) {
	const size = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	
	return <Navigation>
		{/*@ts-ignore*/}
		<Container maxWidth='md' disableGutters={!size} component={Box} overflow='hidden' pb={4}>
			{children}
		</Container>
	</Navigation>;
}
