import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { StyledEngineProvider, ThemeProvider } from '@material-ui/core';
import { Provider as AuthProvider } from 'next-auth/client';
import React from 'react';

import useTheme from '../../lib/hooks/useTheme';
import IndicatorProvider from '../../lib/providers/indicator';
import ModalProvider from '../../lib/providers/modal';
import SnackBarProvider from '../../lib/providers/snack';

export const provider = <T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>>(
	provider: T,
	props: Omit<React.ComponentProps<T>, 'children'> = undefined
) => [ provider, props ];

export const ProviderComposer = ( { providers, children } ) => {
	let content = children;
	for ( let i = providers.length - 1; i >= 0; --i ) {
		const [ Provider, props ] = providers[ i ];
		content = <Provider {...props}>{content}</Provider>;
	}
	return content;
};

const cache = createCache( {
	key    : 'css',
	prepend: true
} );

export default function Providers( { pageProps, children }: { pageProps, children?: React.ReactNode } ) {
	const theme = useTheme();
	
	return <ProviderComposer
		providers={[
			// styling
			provider( StyledEngineProvider, { injectFirst: true } ),
			provider( CacheProvider, { value: cache } ),
			provider( ThemeProvider, { theme } ),
			// app specific
			provider( AuthProvider, { session: pageProps.session } ),
			// content
			provider( ModalProvider ),
			provider( SnackBarProvider ),
			provider( IndicatorProvider )
		]}>
		{children}
	</ProviderComposer>;
}
