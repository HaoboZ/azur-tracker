import prisma from '@/prisma';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import { mapValues } from 'remeda';
import { auth } from '../../auth';
import StoreProvider from './provider';

export default async function SyncStoreProvider({ children }: { children: ReactNode }) {
	const session = await auth();

	const serverData: { main?: Record<string, string>; data?: Record<string, string> } = {};
	if (session?.user) {
		const timestamps = (await prisma.data.findUnique({
			where: { userEmail: session.user.email },
			select: { main: true },
		})) as { main: Record<string, string> };

		if (timestamps) {
			serverData.main = timestamps.main;
			const cookieStore = await cookies();
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
		<StoreProvider authenticated={Boolean(session?.user)} serverData={serverData}>
			{children}
		</StoreProvider>
	);
}
