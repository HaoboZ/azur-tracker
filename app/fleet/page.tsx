import firebaseServerApp from '@/src/firebase/server';
import DataProvider from '@/src/providers/data';
import axios from 'axios';
import csvtojson from 'csvtojson';
import { getDatabase } from 'firebase-admin/database';
import type { Metadata } from 'next';
import objectHash from 'object-hash';
import { indexBy, map, omit, pick, sortByProps } from 'rambdax';
import Fleet from './index';

export const metadata: Metadata = { title: 'Fleet | Azur Lane Tracker' };

export default async function FleetPage() {
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

	const db = getDatabase(firebaseServerApp);
	const equipTier = (await db.ref('tiers').get()).val();

	const equipTierData = map(
		(tiers) =>
			Object.values(omit('N', tiers)).reduce((acc, equips, tier) => {
				equips?.forEach((equip, index) => (acc[equip] = [tier, index]));
				return acc;
			}, {}),
		equipTier,
	);

	return (
		<DataProvider
			data={{
				fleetData: indexBy(
					'id',
					(await csvtojson().fromString(fleetCSV)).map((val) => ({
						...pick(['id', 'name', 'rarity', 'faction', 'type'], val),
						tier: +val.tier,
						special: JSON.parse(val.special),
						equipType: [val.equip1, val.equip2, val.equip3, val.equip4, val.equip5],
					})),
				),
				equipData: sortByProps(
					['type', 'id'],
					(await csvtojson().fromString(equipCSV)).map(({ id, ...val }) => ({
						id: +id,
						...val,
					})),
				),
				equippableData: indexBy(
					'type',
					(await csvtojson().fromString(equippableCSV)).map((value) => ({
						...pick(['type', 'tier'], value),
						equip: [value.equip1, value.equip2, value.equip3].filter(Boolean),
					})),
				),
				equipTierData,
				equipTierHash: objectHash(equipTierData),
			}}>
			<Fleet />
		</DataProvider>
	);
}
