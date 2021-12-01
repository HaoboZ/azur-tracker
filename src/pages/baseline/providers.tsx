import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Close as CloseIcon } from '@mui/icons-material';
import { IconButton, ThemeProvider } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import { SnackbarProvider } from 'notistack';
import { ReactNode, useRef } from 'react';
import { component, ComponentComposer } from '../../lib/helpers/chainedCall';
import useTheme from '../../lib/hooks/useTheme';
import IndicatorProvider from '../../lib/providers/indicator';
import ModalProvider from '../../lib/providers/modal';

const clientCache = createCache( { key: 'css', prepend: true } );

export default function Providers( { pageProps, children }: { pageProps, children?: ReactNode } ) {
	const theme = useTheme();
	
	const snackbarRef = useRef<SnackbarProvider>();
	
	return (
		<ComponentComposer
			components={[
				// styling
				component( CacheProvider, { value: pageProps.emotionCache || clientCache } ),
				component( ThemeProvider, { theme } ),
				// app
				component( SessionProvider, { session: pageProps.session } ),
				// content
				component( ModalProvider ),
				component( SnackbarProvider, {
					ref             : snackbarRef,
					preventDuplicate: true,
					action          : ( key ) => (
						<IconButton onClick={() => snackbarRef.current.closeSnackbar( key )}>
							<CloseIcon/>
						</IconButton>
					)
				} ),
				component( IndicatorProvider )
			]}>
			{children}
		</ComponentComposer>
	);
}
