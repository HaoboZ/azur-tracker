import firebaseServerApp from '@/src/firebase/server';
import pget from '@/src/helpers/pget';
import DataProvider from '@/src/providers/data';
import axios from 'axios';
import csvtojson from 'csvtojson';
import { getDatabase } from 'firebase-admin/database';
import type { Metadata } from 'next';
import { difference, groupBy, mapValues, pipe, sortBy, uniq } from 'remeda';
import Info from './index';

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

	const db = getDatabase(firebaseServerApp);
	const tiers = (await db.ref('tiers').get()).val();

	const farmData = sortBy(await csvtojson().fromString(farmCSV), ({ order }) => order).map(
		({ id0, id1, id2, id3, id4, id5, id6, id7, id8, id9, id10, ...props }) => ({
			...props,
			ids: [id0, id1, id2, id3, id4, id5, id6, id7, id8, id9, id10].filter(Boolean),
		}),
	);
	const equipTier: number[][] = [];
	for (const type of Object.values(tiers)) {
		for (const [tier, equips] of Object.entries(type)) {
			if (tier === 'N') continue;
			equipTier[tier] = uniq([...(equipTier[tier] ?? []), ...equips]);
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
				equipTier: equipTier.map((value) => {
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
