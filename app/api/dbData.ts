'use server';
import prisma from '@/prisma';
import { auth } from '@/src/auth';

export async function getDBData() {
	const session = await auth();
	if (!session?.user) throw new Error('Not Authenticated');
	return prisma.data.findUnique({
		where: { userEmail: session.user.email },
		select: { main: true, event: true, research: true, fleet: true },
	});
}

export async function updateDBData(data) {
	const session = await auth();
	if (!session?.user) throw new Error('Not Authenticated');
	await prisma.data.upsert({
		where: { userEmail: session.user.email },
		create: { userEmail: session.user.email, ...data },
		update: data,
		select: { userEmail: true },
	});
}
