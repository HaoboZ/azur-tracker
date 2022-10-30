import type { ReactNode } from 'react';
import StoreSync from '../../firebase/storeSync';
import Navigation from './navigation';
import Providers from './providers';
import RouterProgress from './routerProgress';

export default function Layout( { children }: { children: ReactNode } ) {
	return (
		<Providers>
			<RouterProgress/>
			<StoreSync keys={[ 'event', 'research', 'fleet' ]}/>
			<Navigation>{children}</Navigation>
		</Providers>
	);
}
