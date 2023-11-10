import _packageJson from '@/package.json';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import type { PackageJson } from 'type-fest';
import Providers from './_layout/providers';
import './_layout/style.scss';

const packageJson = _packageJson as PackageJson;

export const metadata: Metadata = {
	title: 'Azur Lane Tracker',
	description: packageJson.description,
	keywords: packageJson.keywords?.join(', '),
	authors: packageJson.author as any,
	appleWebApp: { capable: true, statusBarStyle: 'black-translucent' },
};

export const viewport: Viewport = { themeColor: '#039be5' };

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html suppressHydrationWarning lang='en'>
			<body>
				{process.env.NEXT_PUBLIC_VERCEL && <Analytics />}
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
