import DataProvider from '@/src/providers/data';
import axios from 'axios';
import csvtojson from 'csvtojson';
import { pickBy } from 'lodash';
import Event from './index';

export const revalidate = 3600;

export default async function EventPage() {
	const { data: eventCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`, {
		params: { sheet: 'Event', tqx: 'out:csv' }
	} );
	const { data: eventShopCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`, {
		params: { sheet: 'Event Shop', tqx: 'out:csv' }
	} );
	const { data: eventStagesCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`, {
		params: { sheet: 'Event Stages', tqx: 'out:csv' }
	} );
	
	return (
		<DataProvider data={{
			eventData      : ( await csvtojson().fromString( eventCSV ) )[ 0 ],
			eventShopData  : await csvtojson().fromString( eventShopCSV ),
			eventStagesData: pickBy( ( await csvtojson().fromString( eventStagesCSV ) )[ 0 ], ( val ) => val !== '_' )
		}}>
			<Event/>
		</DataProvider>
	);
}
