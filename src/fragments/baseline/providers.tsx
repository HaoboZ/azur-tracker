import createCache, { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Close as CloseIcon } from '@mui/icons-material';
import { IconButton, ThemeProvider } from '@mui/material';
import { Provider as AuthProvider } from 'next-auth/client';
import { SnackbarProvider } from 'notistack';
import React from 'react';

import useTheme from '../../lib/hooks/useTheme';
import { provider, ProviderComposer } from '../../lib/providers';
import IndicatorProvider from '../../lib/providers/indicator';
import ModalProvider from '../../lib/providers/modal';

const clientCache = createCache( { key: 'css', prepend: true } );

export default function Providers( { pageProps, cache = clientCache, children }: {
	pageProps,
	cache: EmotionCache,
	children?: React.ReactNode
} ) {
	const theme = useTheme();
	
	const notistackRef = React.useRef<SnackbarProvider>();
	
	return <ProviderComposer
		providers={[
			// styling
			provider( CacheProvider, { value: cache } ),
			provider( ThemeProvider, { theme } ),
			// app
			provider( AuthProvider, { session: pageProps.session } ),
			// content
			provider( ModalProvider ),
			provider( SnackbarProvider, {
				ref             : notistackRef,
				preventDuplicate: true,
				action          : ( key ) => <IconButton onClick={() => notistackRef.current.closeSnackbar( key )}>
					<CloseIcon/>
				</IconButton>
			} ),
			provider( IndicatorProvider )
		]}>
		{children}
	</ProviderComposer>;
}
