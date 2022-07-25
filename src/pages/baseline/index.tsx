import { EmotionCache } from '@emotion/cache';
import { ReactNode } from 'react';
import StoreSync from '../../firebase/storeSync';
import Navigation from './navigation';
import Providers from './providers';
import RouterProgress from './routerProgress';

export default function Baseline( { emotionCache, children }: {
	emotionCache: EmotionCache,
	children: ReactNode
} ) {
	return (
		<Providers emotionCache={emotionCache}>
			<RouterProgress/>
			<StoreSync keys={[ 'event', 'research', 'fleet' ]}/>
			<Navigation>{children}</Navigation>
		</Providers>
	);
}
