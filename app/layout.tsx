import prisma from '@/prisma/index';
import { auth } from '@/src/auth';
import Navigation from '@/src/layout/navigation';
import '@/src/layout/style.scss';
import Providers from '@/src/providers';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import { mapValues } from 'remeda';
import type { PackageJson } from 'type-fest';
import _packageJson from '../package.json';

const packageJson = _packageJson as PackageJson;

export const metadata: Metadata = {
	title: 'Azur Lane Tracker',
	description: packageJson.description,
	keywords: packageJson.keywords?.join(', '),
	authors: packageJson.author as any,
	appleWebApp: { capable: true, statusBarStyle: 'black-translucent' },
};

export const viewport: Viewport = {
	themeColor: '#039be5',
};

const roboto = Roboto({ subsets: ['latin'], weight: ['300', '400', '500', '700'] });

export default async function RootLayout({ children }: { children: ReactNode }) {
	const session = await auth();

	const serverData: { main?: Record<string, string>; data?: Record<string, string> } = {};
	if (session?.user) {
		const timestamps = (await prisma.data.findUnique({
			where: { userEmail: session.user.email },
			select: { main: true },
		})) as { main: Record<string, string> };

		if (timestamps) {
			serverData.main = timestamps.main;
			const cookieStore = cookies();
			const select = mapValues({ event: true, research: true, fleet: true }, (value, key) => {
				const cookie = cookieStore.get(`timestamp.${key}`)?.value;
				return (!cookie && Boolean(timestamps.main[key])) || timestamps.main[key] > cookie;
			});
			if (Object.values(select).some(Boolean)) {
				serverData.data = await prisma.data.findUnique({
					where: { userEmail: session.user.email },
					select,
				});
			}
		}
	}

	return (
		<html suppressHydrationWarning lang='en' className={roboto.className}>
			<body>
				{process.env.NEXT_PUBLIC_VERCEL && <Analytics />}
				<Providers serverData={serverData}>
					<Navigation>{children}</Navigation>
				</Providers>
			</body>
		</html>
	);
}
