import createCache, { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Close as CloseIcon } from '@mui/icons-material';
import { IconButton, ThemeProvider } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
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
	
	const snackbarRef = React.useRef<SnackbarProvider>();
	
	return <ProviderComposer
		providers={[
			// styling
			provider( CacheProvider, { value: cache } ),
			provider( ThemeProvider, { theme } ),
			// app
			provider( SessionProvider, { session: pageProps.session } ),
			// content
			provider( ModalProvider ),
			provider( SnackbarProvider, {
				ref             : snackbarRef,
				preventDuplicate: true,
				action          : ( key ) => <IconButton onClick={() => snackbarRef.current.closeSnackbar( key )}>
					<CloseIcon/>
				</IconButton>
			} ),
			provider( IndicatorProvider )
		]}>
		{children}
	</ProviderComposer>;
}
