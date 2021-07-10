import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import React from 'react';

import IndicatorProvider from '../../lib/providers/indicator';
import SnackbarProvider from '../../lib/providers/snack';

const cache = createCache( {
	key    : 'css',
	prepend: true
} );

export default function Providers( { children }: { children?: React.ReactNode } ) {
	return <SnackbarProvider>
		<IndicatorProvider>
			<CacheProvider value={cache}>
				{children}
			</CacheProvider>
		</IndicatorProvider>
	</SnackbarProvider>;
}
