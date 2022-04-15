import axios from 'axios';
import csvtojson from 'csvtojson';
import { groupBy, pick } from 'lodash-es';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import PageContainer from '../../components/page/container';
import PageTitle from '../../components/page/title';
import SwipeableTabViews from '../../components/swipeableTabViews';
import { useData } from '../../providers/data';
import { research_setLastTab } from '../../store/reducers/researchReducer';
import { ResearchType } from './data';
import ResearchSeries from './series';

// noinspection JSUnusedGlobalSymbols
export default function Research() {
	const lastTab = useSelector( ( { research } ) => research.lastTab );
	const dispatch = useDispatch();
	const { researchData } = useData<ResearchType>();
	
	return (
		<PageContainer>
			<Head><title>Research | Azur Lane Tracker</title></Head>
			<PageTitle>Research Tracker</PageTitle>
			<SwipeableTabViews
				tab={lastTab}
				setTab={( index ) => dispatch( research_setLastTab( index ) )}
				renderTabs={Object.keys( researchData )}
				renderContent={( index ) => <ResearchSeries researchShips={Object.values( researchData )[ index ]}/>}
				variant='fullWidth'
			/>
		</PageContainer>
	);
}

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps = async () => {
	const { data } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq?sheet=Research&tqx=out:csv` );
	const json = await csvtojson().fromString( data );
	
	return {
		revalidate: 6 * 60 * 60,
		props     : {
			researchData: groupBy( json.map( ( val ) => ( {
				...pick( val, [ 'series', 'name', 'image' ] ),
				type: +val.type,
				fate: +val.fate
			} ) ), 'series' )
		}
	};
};
