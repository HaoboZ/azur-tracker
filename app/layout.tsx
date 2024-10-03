import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import type { ReactNode } from 'react';
import type { PackageJson } from 'type-fest';
import _packageJson from '../package.json';
import Providers from './_layout/providers';

const packageJson = _packageJson as PackageJson;

export const metadata: Metadata = {
	title: 'Azur Lane Tracker',
	description: packageJson.description,
	keywords: packageJson.keywords,
	authors: packageJson.author as any,
	appleWebApp: { capable: true, statusBarStyle: 'black-translucent' },
};

export const viewport: Viewport = {
	themeColor: '#039be5',
	viewportFit: 'cover',
	userScalable: false,
};

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-roboto',
});

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html suppressHydrationWarning lang='en'>
			<body className={roboto.variable}>
				{process.env.NEXT_PUBLIC_VERCEL_ENV && <Analytics />}
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
