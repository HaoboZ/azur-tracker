import { Box, Container, CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import { getBackup, setBackup } from '../lib/backup';
import SnackbarProvider from '../lib/provider/snackbarProvider';
import themes from '../lib/theme';
import Navigation from './navigation';

export default function Baseline( { children }: {
	children?: React.ReactElement<any, any>
} ) {
	const { main, ...store } = useSelector( store => store );
	
	React.useEffect( () => {
		if ( main.autoBackup ) setTimeout( setBackup, 500 );
		const interval = setInterval( () => {
			if ( main.autoBackup ) getBackup().then();
		}, 15 * 1000 );
		return () => clearInterval( interval );
	}, Object.values( store ) );
	
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
