import axios from 'axios';
import csvtojson from 'csvtojson';
import { map } from 'lodash-es';
import DataProvider from '../../src/layout/providers/data';
import Tier from './index';

export default async function Page() {
	const { data } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`, {
		params: { sheet: 'Tier', tqx: 'out:csv' }
	} );
	
	return (
		<DataProvider data={{
			tierTypesData: map( await csvtojson().fromString( data ), 'type' )
		}}>
			<Tier/>
		</DataProvider>
	);
}
