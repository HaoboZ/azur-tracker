import DataProvider from '@/src/providers/data';
import axios from 'axios';
import csvtojson from 'csvtojson';
import type { Metadata } from 'next';
import { groupBy, path, pick } from 'rambdax';
import Research from './index';

export const metadata: Metadata = { title: 'Research | Azur Lane Tracker' };

export default async function ResearchPage() {
	const { data: researchCSV } = await axios.get(
		`https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`,
		{ params: { sheet: 'Research', tqx: 'out:csv' } },
	);

	return (
		<DataProvider
			data={{
				researchData: groupBy(
					path('series'),
					(await csvtojson().fromString(researchCSV)).map((val) => ({
						...pick(['series', 'name', 'image'], val),
						type: +val.type,
						fate: +val.fate,
					})),
				),
			}}>
			<Research />
		</DataProvider>
	);
}
