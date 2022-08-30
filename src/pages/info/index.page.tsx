import axios from 'axios';
import csvtojson from 'csvtojson';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { flatten, groupBy, indexBy, map, mapObject, sortBy, uniq } from 'underscore';
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
	const equipsIndex = indexBy( await csvtojson().fromString( equipCSV ), 'id' );
	
	return {
		props: {
			farmData : mapObject( groupBy( farmData, 'origin' ),
				( value ) => mapObject( groupBy( value, 'level' ),
					( value ) => mapObject( groupBy( value, 'stage' ),
						( value ) => value[ 0 ].ids ) ) ),
			equipList: sortBy( sortBy( uniq( flatten( map( farmData, 'ids' ) ) )
				.map( ( val ) => equipsIndex[ val ] ), 'id' ), 'type' )
		}
	};
};
