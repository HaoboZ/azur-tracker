import { Box, Container, CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import SnackbarProvider from '../lib/provider/snackbarProvider';
import themes from '../lib/theme';
import Navigation from './navigation';

export default function Baseline( { children }: {
	children?: React.ReactElement<any, any>
} ) {
	const main = useSelector( store => store.main );
	
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
