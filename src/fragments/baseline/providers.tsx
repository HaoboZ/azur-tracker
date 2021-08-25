import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { StyledEngineProvider, ThemeProvider } from '@material-ui/core';
import { Provider as AuthProvider } from 'next-auth/client';
import React from 'react';

import useTheme from '../../lib/hooks/useTheme';
import { provider, ProviderComposer } from '../../lib/providers';
import IndicatorProvider from '../../lib/providers/indicator';
import ModalProvider from '../../lib/providers/modal';
import SnackbarProvider from '../../lib/providers/snackbar';

export default function Providers( { pageProps, children }: { pageProps, children?: React.ReactNode } ) {
	const theme = useTheme();
	
	const [ cache ] = React.useState( () => createCache( { key: 'css', prepend: true } ) );
	
	return <ProviderComposer
		providers={[
			// styling
			provider( StyledEngineProvider, { injectFirst: true } ),
			provider( CacheProvider, { value: cache } ),
			provider( ThemeProvider, { theme } ),
			// app
			provider( AuthProvider, { session: pageProps.session } ),
			// content
			provider( ModalProvider ),
			provider( SnackbarProvider ),
			provider( IndicatorProvider )
		]}>
		{children}
	</ProviderComposer>;
}
