import axios from 'axios';
import csvtojson from 'csvtojson';
import { pickBy } from 'lodash-es';
import { GetStaticProps } from 'next';
import Event from './event';

// noinspection JSUnusedGlobalSymbols
export default Event;

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps = async () => {
	const { data: eventCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq?sheet=Event&tqx=out:csv` );
	const { data: eventShopCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq?sheet=Event%20Shop&tqx=out:csv` );
	const { data: eventStagesCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq?sheet=Event%20Stages&tqx=out:csv` );
	
	return {
		revalidate: 6 * 60 * 60,
		props     : {
			eventData      : ( await csvtojson().fromString( eventCSV ) )[ 0 ],
			eventShopData  : await csvtojson().fromString( eventShopCSV ),
			eventStagesData: pickBy( ( await csvtojson().fromString( eventStagesCSV ) )[ 0 ], ( val ) => val !== '_' )
		}
	};
};
