'use server';
import prisma from '@/prisma/index';

export async function updateTier(type: string, tier: Record<string, number[]>) {
	await prisma.tier.update({ where: { type }, data: tier });
}
