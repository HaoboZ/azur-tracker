import firebaseServerApp from '@/src/firebase/server';
import DataProvider from '@/src/providers/data';
import axios from 'axios';
import csvtojson from 'csvtojson';
import { getDatabase } from 'firebase-admin/database';
import { keyBy, mapValues, omit, pick, sortBy } from 'lodash';
import type { Metadata } from 'next';
import objectHash from 'object-hash';
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

	const equipTierData = mapValues(equipTier, (tiers) =>
		Object.values(omit(tiers, 'N')).reduce((acc, equips, tier) => {
			equips?.forEach((equip, index) => (acc[equip] = [tier, index]));
			return acc;
		}, {}),
	);

	return (
		<DataProvider
			data={{
				fleetData: keyBy(
					sortBy(await csvtojson().fromString(fleetCSV), ({ num }) => +num).map((val) => ({
						...pick(val, ['id', 'name', 'rarity', 'faction', 'type']),
						tier: +val.tier,
						special: JSON.parse(val.special),
						equipType: [val.equip1, val.equip2, val.equip3, val.equip4, val.equip5],
					})),
					'id',
				),
				equipData: sortBy(
					(await csvtojson().fromString(equipCSV)).map(({ id, ...val }) => ({
						id: +id,
						...val,
					})),
					'type',
					'id',
				),
				equippableData: keyBy(
					(await csvtojson().fromString(equippableCSV)).map((value) => ({
						...pick(value, ['type', 'tier']),
						equip: [value.equip1, value.equip2, value.equip3].filter(Boolean),
					})),
					'type',
				),
				equipTierData,
				equipTierHash: objectHash(equipTierData),
			}}>
			<Fleet />
		</DataProvider>
	);
}
