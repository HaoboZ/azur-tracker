import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Close as CloseIcon } from '@mui/icons-material';
import { IconButton, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { ReactNode, useRef } from 'react';
import { component, ComponentComposer } from '../../lib/helpers/chainedCall';
import useTheme from '../../lib/hooks/useTheme';
import AuthProvider from '../../lib/providers/auth';
import EventsProvider from '../../lib/providers/event';
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
				// static
				component( EventsProvider ),
				component( SnackbarProvider, {
					ref             : snackbarRef,
					preventDuplicate: true,
					action          : ( key ) => (
						<IconButton onClick={() => snackbarRef.current.closeSnackbar( key )}>
							<CloseIcon/>
						</IconButton>
					)
				} ),
				component( IndicatorProvider ),
				component( AuthProvider ),
				// interactive
				component( ModalProvider )
			]}>
			{children}
		</ComponentComposer>
	);
}
