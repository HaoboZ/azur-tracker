import firebaseServerApp from '@/src/firebase/server';
import pget from '@/src/helpers/pget';
import DataProvider from '@/src/providers/data';
import axios from 'axios';
import csvtojson from 'csvtojson';
import { getDatabase } from 'firebase-admin/database';
import type { Metadata } from 'next';
import objectHash from 'object-hash';
import { indexBy, mapValues, omit, pick, pipe, sortBy } from 'remeda';
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
		Object.values(omit(tiers, ['N'])).reduce((acc, equips, tier) => {
			equips?.forEach((equip, index) => (acc[equip] = [tier, index]));
			return acc;
		}, {}),
	);

	return (
		<DataProvider
			data={{
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
					(await csvtojson().fromString(equipCSV)).map(({ id, ...val }) => ({
						id: +id,
						...val,
					})),
					sortBy(pget('id')),
					sortBy(pget('type')),
				),
				equippableData: indexBy(
					(await csvtojson().fromString(equippableCSV)).map((value) => ({
						...(pick(value, ['type', 'tier']) as any),
						equip: [value.equip1, value.equip2, value.equip3].filter(Boolean),
					})),
					pget('type'),
				),
				equipTierData,
				equipTierHash: objectHash(equipTierData),
			}}>
			<Fleet />
		</DataProvider>
	);
}
