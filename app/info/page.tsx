import prisma from '@/prisma/index';
import pget from '@/src/helpers/pget';
import DataProvider from '@/src/providers/data';
import axios from 'axios';
import csvtojson from 'csvtojson';
import type { Metadata } from 'next';
import { difference, groupBy, mapValues, omit, pipe, sortBy, uniq } from 'remeda';
import Info from './index';

export const dynamic = 'force-static';

export const metadata: Metadata = { title: 'Info | Azur Lane Tracker' };

export default async function InfoPage() {
	const { data: farmCSV } = await axios.get(
		`https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`,
		{ params: { sheet: 'Farm', tqx: 'out:csv' } },
	);
	const { data: equipCSV } = await axios.get(
		`https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`,
		{ params: { sheet: 'Equip', tqx: 'out:csv' } },
	);

	const farmData = sortBy(await csvtojson().fromString(farmCSV), ({ order }) => order).map(
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
	return (
		<DataProvider
			data={{
				farmData: mapValues(groupBy(farmData, pget('origin')), (value) =>
					mapValues(groupBy(value, pget('level')), (value) =>
						mapValues(groupBy(value, pget('stage')), (value) => value[0].ids),
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
			}}>
			<Info />
		</DataProvider>
	);
}
