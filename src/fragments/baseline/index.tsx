import { EmotionCache } from '@emotion/cache';
import { CssBaseline } from '@mui/material';
import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';

import { Icons } from '../../lib/icons';
import Providers from './providers';
import Wrapper from './wrapper';

export default function Baseline( { pageProps, cache, children }: {
	pageProps,
	cache: EmotionCache,
	children?: React.ReactNode
} ) {
	React.useEffect( () => {
		smoothscroll.polyfill();
	}, [] );
	
	return <Providers pageProps={pageProps} cache={cache}>
		<CssBaseline/>
		<Icons/>
		<Wrapper>{children}</Wrapper>
	</Providers>;
}
