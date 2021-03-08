import { Box, Container, CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';

import { useTypedSelector } from '../lib/store';
import themes from '../lib/theme';
import TitleBar from './titleBar';

export default function Baseline( { children }: {
	children?: React.ReactElement<any, any>
} ) {
	const main = useTypedSelector( store => store.main );
	
	return <ThemeProvider theme={ themes[ main.theme ] }>
		<CssBaseline/>
		<TitleBar/>
		{/*@ts-ignore*/ }
		<Container maxWidth='md' component={ Box } pt={ 2 } pb={ 4 }>
			{ children }
		</Container>
	</ThemeProvider>;
}
