import axios from 'axios';
import csvtojson from 'csvtojson';
import { flatten, groupBy, keyBy, map, mapValues, sortBy, uniq } from 'lodash-es';
import type { GetStaticProps } from 'next';
import Page from '../../components/page';
import EquipDrop from './equipDrop';
import OpSiWeakness from './opSiWeakness';

// noinspection JSUnusedGlobalSymbols
export default function Info() {
	return (
		<Page hideBack title='Info'>
			<OpSiWeakness/>
			<EquipDrop/>
		</Page>
	);
}

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps = async () => {
	const { data: farmCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`, {
		params: { sheet: 'Farm', tqx: 'out:csv' }
	} );
	const { data: equipCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`, {
		params: { sheet: 'Equip', tqx: 'out:csv' }
	} );
	
	const farmData = sortBy( await csvtojson().fromString( farmCSV ), ( { order } ) => +order )
		.map( ( { id0, id1, id2, id3, id4, id5, id6, id7, ...props } ) =>
			( { ...props, ids: [ id0, id1, id2, id3, id4, id5, id6, id7 ].filter( Boolean ) } ) );
	const equipsIndex = keyBy( await csvtojson().fromString( equipCSV ), 'id' );
	
	return {
		props: {
			farmData : mapValues( groupBy( farmData, 'origin' ),
				( value ) => mapValues( groupBy( value, 'level' ),
					( value ) => mapValues( groupBy( value, 'stage' ),
						( value ) => value[ 0 ].ids ) ) ),
			equipList: sortBy( uniq( flatten( map( farmData, 'ids' ) ) )
				.map( ( val ) => equipsIndex[ val ] ), 'type', 'id' )
		}
	};
};
