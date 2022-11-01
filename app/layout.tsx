import { Roboto } from '@next/font/google';
import type { ReactNode } from 'react';
import StoreSync from '../src/firebase/storeSync';
import Navigation from '../src/layout/navigation';
import Providers from '../src/layout/providers';

const roboto = Roboto( {
	weight: [ '300', '400', '500', '700' ]
} );

export default function RootLayout( { children }: { children: ReactNode } ) {
	return (
		<html lang='en' className={roboto.className}>
			<body>
				<Providers>
					<StoreSync keys={[ 'event', 'research', 'fleet' ]}/>
					<Navigation>{children}</Navigation>
				</Providers>
			</body>
		</html>
	);
}
