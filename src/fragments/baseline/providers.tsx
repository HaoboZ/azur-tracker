import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { StyledEngineProvider, ThemeProvider } from '@material-ui/core';
import { Provider as AuthProvider } from 'next-auth/client';
import React from 'react';

import useTheme from '../../lib/hooks/useTheme';
import IndicatorProvider from '../../lib/providers/indicator';
import ModalProvider from '../../lib/providers/modal';
import SnackbarProvider from '../../lib/providers/snack';

const cache = createCache( {
	key    : 'css',
	prepend: true
} );

export default function Providers( { pageProps, children }: { pageProps, children?: React.ReactNode } ) {
	const theme = useTheme();
	
	return <AuthProvider session={pageProps.session}>
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<ModalProvider>
					<SnackbarProvider>
						<IndicatorProvider>
							<CacheProvider value={cache}>
								{children}
							</CacheProvider>
						</IndicatorProvider>
					</SnackbarProvider>
				</ModalProvider>
			</ThemeProvider>
		</StyledEngineProvider>
	</AuthProvider>;
}
