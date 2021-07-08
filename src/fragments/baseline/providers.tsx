import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import React from 'react';

import IndicatorProvider from '../../lib/providers/indicator';

const cache = createCache( {
	key    : 'css',
	prepend: true
} );

// const useStyles = makeStyles( ( theme ) => ( {
// 	snack: {
// 		[ theme.breakpoints.down( 'sm' ) ]: {
// 			top: 'env(safe-area-inset-top)'
// 		}
// 	}
// } ) );

export default function Providers( { children }: { children?: React.ReactNode } ) {
	// const classes = useStyles();
	// const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ), { noSsr: true } );
	//
	// return <SnackbarProvider
	// 	maxSnack={2}
	// 	anchorOrigin={{ vertical: wide ? 'bottom' : 'top', horizontal: 'center' }}
	// 	classes={{ root: classes.snack }}>
	return <IndicatorProvider>
		<CacheProvider value={cache}>
			{children}
		</CacheProvider>
	</IndicatorProvider>;
	// </SnackbarProvider>;
}
