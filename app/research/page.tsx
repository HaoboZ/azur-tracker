import DataProvider from '@/src/providers/data';
import axios from 'axios';
import csvtojson from 'csvtojson';
import { groupBy, pick } from 'lodash-es';
import Research from './index';

export default async function ResearchPage() {
	const { data: researchCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`, {
		params: { sheet: 'Research', tqx: 'out:csv' }
	} );
	
	return (
		<DataProvider data={{
			researchData: groupBy( ( await csvtojson().fromString( researchCSV ) )
				.map( ( val ) => ( {
					...pick( val, [ 'series', 'name', 'image' ] ),
					type: +val.type,
					fate: +val.fate
				} ) ), 'series' )
		}}>
			<Research/>
		</DataProvider>
	);
}