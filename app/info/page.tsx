import prisma from '@/prisma/index';
import pget from '@/src/helpers/pget';
import DataProvider from '@/src/providers/data';
import axios from 'axios';
import csvtojson from 'csvtojson';
import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { difference, groupBy, indexBy, mapValues, omit, pipe, sortBy, uniq } from 'remeda';
import Info from './index';

export const metadata: Metadata = { title: 'Info | Azur Lane Tracker' };

const getCachedData = unstable_cache(
	async () => {
		const { data: farmCSV } = await axios.get(
			`https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`,
			{ params: { sheet: 'Farm', tqx: 'out:csv' } },
		);
		const { data: equipCSV } = await axios.get(
			`https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`,
			{ params: { sheet: 'Equip', tqx: 'out:csv' } },
		);

		const farmData = (await csvtojson().fromString(farmCSV)).map(
			({ id0, id1, id2, id3, id4, id5, id6, id7, id8, id9, id10, ...props }) => ({
				...props,
				ids: [id0, id1, id2, id3, id4, id5, id6, id7, id8, id9, id10].filter(Boolean),
			}),
		);

		const equipTiers = await prisma.tier.findMany();
		const equipTier: Record<string, number[]> = { t1: [], t2: [], t3: [], t4: [] };
		for (const type of equipTiers) {
			for (const [tier, equips] of Object.entries(omit(type, ['type']))) {
				if (tier === 'tN') continue;
				equipTier[tier] = uniq([...(equipTier[tier] ?? []), ...(equips ?? [])]);
			}
		}

		let found = [];
		return {
			farmData: mapValues(groupBy(farmData, pget('origin')), (value) =>
				mapValues(
					indexBy(value, ({ level, stage }) => `${level}${stage}`),
					pget('ids'),
				),
			),
			equipTier: Object.values(equipTier).map((value) => {
				const result = difference(value, found).sort();
				found = uniq([...found, ...value]);
				return result;
			}),
			equipList: pipe(
				await csvtojson().fromString(equipCSV),
				sortBy(pget('id')),
				sortBy(pget('type')),
			),
		};
	},
	['info'],
	{ tags: ['sheets'] },
);

export default async function InfoPage() {
	return (
		<DataProvider data={await getCachedData()}>
			<Info />
		</DataProvider>
	);
}
