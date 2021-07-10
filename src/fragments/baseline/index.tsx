import { CssBaseline } from '@material-ui/core';
import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';

import Effects from './effects';
import Providers from './providers';

export default function Baseline( { pageProps, children }: { pageProps, children?: React.ReactNode } ) {
	React.useEffect( () => {
		smoothscroll.polyfill();
	}, [] );
	
	return <Providers pageProps={pageProps}>
		<CssBaseline/>
		<Effects>
			{children}
		</Effects>
	</Providers>;
}
