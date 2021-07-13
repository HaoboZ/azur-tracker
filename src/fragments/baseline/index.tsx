import { CssBaseline } from '@material-ui/core';
import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import Providers from './providers';

import Wrapper from './wrapper';

export default function Baseline( { pageProps, children }: { pageProps, children?: React.ReactNode } ) {
	React.useEffect( () => {
		smoothscroll.polyfill();
	}, [] );
	
	return <Providers pageProps={pageProps}>
		<CssBaseline/>
		<Wrapper>
			{children}
		</Wrapper>
	</Providers>;
}
