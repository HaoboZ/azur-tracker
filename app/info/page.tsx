import firebaseServerApp from '@/src/firebase/server';
import DataProvider from '@/src/providers/data';
import axios from 'axios';
import csvtojson from 'csvtojson';
import { getDatabase } from 'firebase-admin/database';
import type { Metadata } from 'next';
import { difference, groupBy, map, path, sortBy, sortByProps, union } from 'rambdax';
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

	const farmData = sortBy(({ order }) => +order, await csvtojson().fromString(farmCSV)).map(
		({ id0, id1, id2, id3, id4, id5, id6, id7, id8, id9, id10, ...props }) => ({
			...props,
			ids: [id0, id1, id2, id3, id4, id5, id6, id7, id8, id9, id10].filter(Boolean),
		}),
	);
	const db = getDatabase(firebaseServerApp);
	const tiers = (await db.ref('tiers').get()).val();
	const equipTier: number[][] = [];
	for (const type of Object.values(tiers)) {
		for (const [tier, equips] of Object.entries(type)) {
			if (tier === 'N') continue;
			equipTier[tier] = union(equipTier[tier] ?? [], equips);
		}
	}

	let found = [];
	return (
		<DataProvider
			data={{
				farmData: map(
					(value: any[]) =>
						map(
							(value: any[]) => map((value) => value[0].ids, groupBy(path('stage'), value)),
							groupBy(path('level'), value),
						),
					groupBy(path('origin'), farmData),
				),
				equipTier: equipTier.map((value) => {
					const result = difference(value, found).sort();
					found = union(found, value);
					return result;
				}),
				equipList: sortByProps(['type', 'id'], await csvtojson().fromString(equipCSV)),
			}}>
			<Info />
		</DataProvider>
	);
}
