import StoreSync from '@/src/firebase/storeSync';
import Navigation from '@/src/layout/navigation';
import '@/src/layout/style.scss';
import Providers from '@/src/providers';
import LoginEvent from '@/src/providers/auth/loginEvent';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import type { ReactNode } from 'react';
import type { PackageJson } from 'type-fest';
import _packageJson from '../package.json';

const packageJson = _packageJson as PackageJson;

export const metadata: Metadata = {
	title: 'Azur Lane Tracker',
	themeColor: '#039be5',
	description: packageJson.description,
	keywords: packageJson.keywords?.join(', '),
	authors: packageJson.author as any,
	appleWebApp: {
		capable: true,
		statusBarStyle: 'black-translucent',
	},
};

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en' className={roboto.className}>
			<body>
				{process.env.NEXT_PUBLIC_VERCEL && <Analytics />}
				<Providers>
					<StoreSync keys={['event', 'research', 'fleet']} />
					<LoginEvent />
					<Navigation>{children}</Navigation>
				</Providers>
			</body>
		</html>
	);
}
