import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import React from 'react';

import IndicatorProvider from '../../lib/providers/indicator';

const cache = createCache( {
	key    : 'css',
	prepend: true
} );

export default function Providers( { children }: { children?: React.ReactNode } ) {
	// const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ), { noSsr: true } );
	//
	// return <SnackbarProvider
	// 	maxSnack={2}
	// 	anchorOrigin={{ vertical: wide ? 'bottom' : 'top', horizontal: 'center' }}
	// 	sx={{
	// 		'& .MuiSnackbar-root': {
	// 			top: {
	// 				xs: 'calc(env(safe-area-inset-top) + 24px)',
	// 				sm: 0
	// 			}
	// 		}
	// 	}}>
	return <IndicatorProvider>
		<CacheProvider value={cache}>
			{children}
		</CacheProvider>
	</IndicatorProvider>;
	// </SnackbarProvider>;
}
