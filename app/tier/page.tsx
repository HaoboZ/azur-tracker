import DataProvider from '@/src/providers/data';
import axios from 'axios';
import csvtojson from 'csvtojson';
import type { Metadata } from 'next';
import { path } from 'rambdax';
import Tier from './index';

export const metadata: Metadata = { title: 'Tier | Azur Lane Tracker' };

export default async function TierPage() {
	const { data } = await axios.get(
		`https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`,
		{ params: { sheet: 'Tier', tqx: 'out:csv' } },
	);

	return (
		<DataProvider
			data={{ tierTypesData: (await csvtojson().fromString(data)).map(path('type')) }}>
			<Tier />
		</DataProvider>
	);
}
