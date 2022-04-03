import axios from 'axios';
import csvtojson from 'csvtojson';
import { pickBy } from 'lodash-es';
import { GetStaticProps } from 'next';
import Event from './event';

// noinspection JSUnusedGlobalSymbols
export default Event;

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps = async () => {
	const { data: eventData } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq?sheet=Event&tqx=out:csv` );
	const { data: eventShop } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq?sheet=Event%20Shop&tqx=out:csv` );
	const { data: eventStages } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq?sheet=Event%20Stages&tqx=out:csv` );
	
	return {
		revalidate: 6 * 60 * 60,
		props     : {
			eventData  : ( await csvtojson().fromString( eventData ) )[ 0 ],
			eventShop  : await csvtojson().fromString( eventShop ),
			eventStages: pickBy( ( await csvtojson().fromString( eventStages ) )[ 0 ], Boolean )
		}
	};
};
