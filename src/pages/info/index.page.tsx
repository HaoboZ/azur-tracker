import axios from 'axios';
import csvtojson from 'csvtojson';
import { flatMap, groupBy, keyBy, map, mapValues, sortBy, uniq } from 'lodash-es';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import PageContainer from '../../components/page/container';
import PageTitle from '../../components/page/title';
import EquipDrop from './equipDrop';
import OpSiWeakness from './opSiWeakness';

// noinspection JSUnusedGlobalSymbols
export default function Info() {
	return (
		<PageContainer>
			<Head><title>Info | Azur Lane Tracker</title></Head>
			<PageTitle>Info</PageTitle>
			<OpSiWeakness/>
			<EquipDrop/>
		</PageContainer>
	);
}

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps = async () => {
	const { data: farmCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq?sheet=Farm&tqx=out:csv` );
	const { data: equipCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq?sheet=Equip&tqx=out:csv` );
	
	const farmData = sortBy( await csvtojson().fromString( farmCSV ), ( { order } ) => +order )
		.map( ( { id0, id1, id2, id3, id4, id5, id6, id7, ...props } ) =>
			( { ...props, ids: [ id0, id1, id2, id3, id4, id5, id6, id7 ].filter( Boolean ) } ) );
	const equipsIndex = keyBy( await csvtojson().fromString( equipCSV ), 'id' );
	
	return {
		revalidate: 6 * 60 * 60,
		props     : {
			farmData : mapValues( groupBy( farmData, 'origin' ),
				( value ) => mapValues( groupBy( value, 'level' ),
					( value ) => mapValues( groupBy( value, 'stage' ),
						( value ) => value[ 0 ].ids ) ) ),
			equipList: sortBy( uniq( flatMap( map( farmData, 'ids' ) ) )
				.map( ( val ) => equipsIndex[ val ] ), [ 'type', 'id' ] )
		}
	};
};
