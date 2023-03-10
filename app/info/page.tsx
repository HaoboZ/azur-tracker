import firebaseServerApp from '@/src/firebase/server';
import DataProvider from '@/src/providers/data';
import axios from 'axios';
import csvtojson from 'csvtojson';
import { getDatabase } from 'firebase-admin/database';
import { difference, groupBy, keyBy, map, mapValues, sortBy, union } from 'lodash';
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
	const db = getDatabase( firebaseServerApp );
	const tiers = ( await db.ref( 'tiers' ).get() ).val();
	const equipTier: number[][] = [];
	for ( const type of Object.values( tiers ) ) {
		for ( const [ tier, equips ] of Object.entries( type ) ) {
			if ( tier === 'N' ) continue;
			equipTier[ tier ] = union( equipTier[ tier ], equips );
		}
	}
	const equipIndex = keyBy( await csvtojson().fromString( equipCSV ), 'id' );
	
	let found = [];
	return (
		<DataProvider data={{
			farmData   : mapValues( groupBy( farmData, 'origin' ),
				( value ) => mapValues( groupBy( value, 'level' ),
					( value ) => mapValues( groupBy( value, 'stage' ),
						( value ) => value[ 0 ].ids ) ) ),
			equipTier  : map( equipTier, ( value ) => {
				const result = sortBy( difference( value, found ) );
				found = union( found, value );
				return result;
			} ),
			equipList  : sortBy( equipIndex, 'type', 'id' )
		}}>
			<Info/>
		</DataProvider>
	);
}
