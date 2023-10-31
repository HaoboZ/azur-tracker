import pget from '@/src/helpers/pget';
import axios from 'axios';
import csvtojson from 'csvtojson';
import type { Metadata } from 'next';
import { groupBy, pick } from 'remeda';
import Research from './index';
import type { ResearchShipType } from './type';

export const dynamic = 'force-static';

export const metadata: Metadata = { title: 'Research | Azur Lane Tracker' };

export default async function ResearchPage() {
	const { data: researchCSV } = await axios.get(
		`https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`,
		{ params: { sheet: 'Research', tqx: 'out:csv' } },
	);

	return (
		<Research
			researchData={groupBy(
				(await csvtojson().fromString(researchCSV)).map<ResearchShipType & { series: string }>(
					(val) => ({
						...pick(val, ['series', 'name', 'image']),
						type: +val.type,
						fate: Boolean(+val.fate),
					}),
				),
				pget('series'),
			)}
		/>
	);
}
