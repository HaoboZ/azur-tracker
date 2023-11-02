import pget from '@/src/helpers/pget';
import axios from 'axios';
import csvtojson from 'csvtojson';
import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { groupBy, pick } from 'remeda';
import Research from './index';
import type { ResearchShipType } from './type';

export const metadata: Metadata = { title: 'Research | Azur Lane Tracker' };

const getCachedData = unstable_cache(
	async () => {
		const { data: researchCSV } = await axios.get(
			`https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`,
			{ params: { sheet: 'Research', tqx: 'out:csv' } },
		);

		return groupBy(
			(await csvtojson().fromString(researchCSV)).map<ResearchShipType & { series: string }>(
				(val) => ({
					...pick(val, ['series', 'name', 'image']),
					type: +val.type,
					fate: Boolean(+val.fate),
				}),
			),
			pget('series'),
		);
	},
	['research'],
	{ tags: ['sheets'] },
);

export default async function ResearchPage() {
	return <Research researchData={await getCachedData()} />;
}
