import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Close as CloseIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { ReactNode, useRef } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { component, ComponentComposer } from '../../lib/helpers/chainedCall';
import AuthProvider from '../../lib/providers/auth';
import EventsProvider from '../../lib/providers/event';
import IndicatorProvider from '../../lib/providers/indicator';
import ModalProvider from '../../lib/providers/modal';
import ThemeProvider from '../../lib/providers/theme';
import { persistor, store } from '../../lib/store';

const clientCache = createCache( { key: 'css', prepend: true } );

export default function Providers( { pageProps, children }: { pageProps, children?: ReactNode } ) {
	const snackbarRef = useRef<SnackbarProvider>();
	
	return (
		<ComponentComposer
			components={[
				// data
				component( StoreProvider, { store } ),
				component( PersistGate, { loading: null, persistor } ),
				// styling
				component( CacheProvider, { value: pageProps.emotionCache || clientCache } ),
				component( ThemeProvider ),
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
				// dynamic
				component( ModalProvider )
			]}>
			{children}
		</ComponentComposer>
	);
}
