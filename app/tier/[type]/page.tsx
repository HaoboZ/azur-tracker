import DataProvider from '@/src/layout/providers/data';
import axios from 'axios';
import csvtojson from 'csvtojson';
import { map, sortBy } from 'lodash-es';
import TierType from './index';

export default async function Page( { params }: { params: Record<string, string> } ) {
	const { data: tierTypesCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`, {
		params: {
			sheet: 'Tier',
			tqx  : 'out:csv',
			tq   : `SELECT B,C WHERE A='${params.type}'`
		}
	} );
	const tierTypes = JSON.parse( `[${tierTypesCSV}]` );
	const { data: equipCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`, {
		params: {
			sheet: 'Equip',
			tqx  : 'out:csv',
			key  : 0,
			tq   : `SELECT * WHERE G='${tierTypes[ 0 ]}'${tierTypes[ 1 ] ? ` OR G='${tierTypes[ 1 ]}'` : ''}`
		}
	} );
	
	return (
		<DataProvider data={{
			params,
			equipData: sortBy( ( await csvtojson().fromString( equipCSV ) )
				.map( ( { id, dps, ...val } ) => ( { id: +id, dps: +dps, ...val } ) ), 'dps', 'id' )
				.reverse()
		}}>
			<TierType/>
		</DataProvider>
	);
}

// noinspection JSUnusedGlobalSymbols
export async function generateStaticParams() {
	const { data } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`, {
		params: { sheet: 'Tier', tqx: 'out:csv' }
	} );
	
	return map( await csvtojson().fromString( data ), ( { type } ) => ( { type } ) );
}
