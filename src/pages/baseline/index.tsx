import { EmotionCache } from '@emotion/cache';
import { CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
import Providers from './providers';
import RouterProgress from './routerProgress';
import Wrapper from './wrapper';

export default function Baseline( { emotionCache, children }: {
	emotionCache: EmotionCache,
	children: ReactNode
} ) {
	return (
		<Providers emotionCache={emotionCache}>
			<CssBaseline/>
			<RouterProgress/>
			<Wrapper>{children}</Wrapper>
		</Providers>
	);
}
