import DataProvider from '@/src/providers/data';
import axios from 'axios';
import csvtojson from 'csvtojson';
import { flatten, groupBy, keyBy, map, mapValues, sortBy, uniq } from 'lodash-es';
import Info from './index';

export default async function InfoPage() {
	const { data: farmCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`, {
		params: { sheet: 'Farm', tqx: 'out:csv' }
	} );
	const { data: equipCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`, {
		params: { sheet: 'Equip', tqx: 'out:csv' }
	} );
	
	const farmData = sortBy( await csvtojson().fromString( farmCSV ), ( { order } ) => +order )
		.map( ( { id0, id1, id2, id3, id4, id5, id6, id7, id8, id9, id10, ...props } ) =>
			( { ...props, ids: [ id0, id1, id2, id3, id4, id5, id6, id7, id8, id9, id10 ].filter( Boolean ) } ) );
	const equipsIndex = keyBy( await csvtojson().fromString( equipCSV ), 'id' );
	
	return (
		<DataProvider data={{
			farmData : mapValues( groupBy( farmData, 'origin' ),
				( value ) => mapValues( groupBy( value, 'level' ),
					( value ) => mapValues( groupBy( value, 'stage' ),
						( value ) => value[ 0 ].ids ) ) ),
			equipList: sortBy( uniq( flatten( map( farmData, 'ids' ) ) )
				.map( ( val ) => equipsIndex[ val ] ), 'type', 'id' )
		}}>
			<Info/>
		</DataProvider>
	);
}
