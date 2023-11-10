import prisma from '@/prisma/index';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import { mapValues } from 'remeda';
import { auth } from '../../auth';
import ClientStoreProvider from './clientStoreProvider';

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

	return <ClientStoreProvider serverData={serverData}>{children}</ClientStoreProvider>;
}
