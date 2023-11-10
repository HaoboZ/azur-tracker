'use server';
import prisma from '@/prisma/index';
import { auth } from '@/src/auth';

export async function updateTier(type: string, tier: Record<string, number[]>) {
	const session = await auth();
	if (session?.user.role !== 'ADMIN') throw new Error('Authentication Required');
	await prisma.tier.update({ where: { type }, data: tier });
}