import DataProvider from '@/src/providers/data';
import axios from 'axios';
import csvtojson from 'csvtojson';
import type { Metadata } from 'next';
import { filterObject } from 'rambdax';
import Event from './index';

export const metadata: Metadata = { title: 'Event | Azur Lane Tracker' };

export default async function EventPage() {
	const { data: eventCSV } = await axios.get(
		`https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`,
		{ params: { sheet: 'Event', tqx: 'out:csv' } },
	);
	const { data: eventShopCSV } = await axios.get(
		`https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`,
		{ params: { sheet: 'Event Shop', tqx: 'out:csv' } },
	);
	const { data: eventStagesCSV } = await axios.get(
		`https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`,
		{ params: { sheet: 'Event Stages', tqx: 'out:csv' } },
	);

	return (
		<DataProvider
			data={{
				eventData: (await csvtojson().fromString(eventCSV))[0],
				eventShopData: await csvtojson().fromString(eventShopCSV),
				eventStagesData: filterObject(
					(val) => val !== '_',
					(await csvtojson().fromString(eventStagesCSV))[0],
				),
			}}>
			<Event />
		</DataProvider>
	);
}
