import prisma from '@/prisma';
import pget from '@/src/helpers/pget';
import DataProvider from '@/src/providers/data';
import axios from 'axios';
import csvtojson from 'csvtojson';
import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import hash from 'object-hash';
import { indexBy, mapValues, omit, pick, pipe, sortBy } from 'remeda';
import Fleet from './index';

export const metadata: Metadata = { title: 'Fleet | Azur Lane Tracker' };

const getCachedData = unstable_cache(
	async () => {
		const { data: fleetCSV } = await axios.get(
			`https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`,
			{ params: { sheet: 'Fleet', tqx: 'out:csv' } },
		);
		const { data: equipCSV } = await axios.get(
			`https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`,
			{ params: { sheet: 'Equip', tqx: 'out:csv' } },
		);
		const { data: equippableCSV } = await axios.get(
			`https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`,
			{ params: { sheet: 'Equippable', tqx: 'out:csv' } },
		);

		const equipTier = indexBy(await prisma.tier.findMany(), pget('type'));

		const equipTierData = mapValues(equipTier, (tiers) =>
			Object.values(omit(tiers, ['type', 'tN'])).reduce(
				(acc, equips, tier) => {
					equips?.forEach((equip, index) => (acc[equip] = [tier, index]));
					return acc;
				},
				{} as Record<number, [number, number]>,
			),
		);

		return {
			fleetData: indexBy(
				(await csvtojson().fromString(fleetCSV)).map((val) => ({
					...(pick(val, ['id', 'name', 'rarity', 'faction', 'type']) as any),
					tier: +val.tier,
					special: JSON.parse(val.special),
					equipType: [val.equip1, val.equip2, val.equip3, val.equip4, val.equip5],
				})),
				pget('id'),
			),
			equipData: pipe(
				(await csvtojson().fromString(equipCSV)).map(({ id, ...val }) => ({ id: +id, ...val })),
				sortBy(pget('id')),
				sortBy(pget('type')),
			),
			equippableData: indexBy(
				(await csvtojson().fromString(equippableCSV)).map((value) => ({
					...(pick(value, ['type', 'tier']) as any),
					equip: [
						value.equip1,
						value.equip2,
						value.equip3,
						value.equip4,
						value.equip5,
						value.equip6,
					].filter(Boolean),
				})),
				pget('type'),
			),
			equipTierData,
			equipTierHash: hash(equipTierData),
		};
	},
	['fleet'],
	{ tags: ['sheets'] },
);

export default async function FleetPage() {
	return (
		<DataProvider data={await getCachedData()}>
			<Fleet />
		</DataProvider>
	);
}
