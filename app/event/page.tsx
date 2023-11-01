import DataProvider from '@/src/providers/data';
import axios from 'axios';
import csvtojson from 'csvtojson';
import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { pickBy } from 'remeda';
import Event from './index';

export const metadata: Metadata = { title: 'Event | Azur Lane Tracker' };

const getCachedData = unstable_cache(async () => {
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

	return {
		eventData: (await csvtojson().fromString(eventCSV))[0],
		eventShopData: await csvtojson().fromString(eventShopCSV),
		eventStagesData: pickBy(
			(await csvtojson().fromString(eventStagesCSV))[0],
			(val) => val !== '_',
		),
	};
}, ['sheets']);

export default async function EventPage() {
	return (
		<DataProvider data={await getCachedData()}>
			<Event />
		</DataProvider>
	);
}
