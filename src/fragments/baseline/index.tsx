import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';

import useTheme from '../../lib/hooks/useTheme';
import Effects from './effects';
import Providers from './providers';

export default function Baseline( { children }: { children?: React.ReactNode } ) {
	const theme = useTheme();
	
	React.useEffect( () => {
		smoothscroll.polyfill();
	}, [] );
	
	return <ThemeProvider theme={theme}>
		<Providers>
			<CssBaseline/>
			<Effects>
				{children}
			</Effects>
		</Providers>
	</ThemeProvider>;
}
