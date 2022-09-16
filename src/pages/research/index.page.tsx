import axios from 'axios';
import csvtojson from 'csvtojson';
import { groupBy, pick } from 'lodash-es';
import type { GetStaticProps } from 'next';
import Page from '../../components/page';
import SwipeableTabViews from '../../components/swipeableTabViews';
import { useData } from '../../providers/data';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { research_setLastTab } from '../../store/reducers/researchReducer';
import ResearchSeries from './series';
import type { ResearchType } from './type';

// noinspection JSUnusedGlobalSymbols
export default function Research() {
	const lastTab = useAppSelector( ( { research } ) => research.lastTab );
	const dispatch = useAppDispatch();
	const { researchData } = useData<ResearchType>();
	
	return (
		<Page title='Research Tracker' titleBar='Research'>
			<SwipeableTabViews
				tab={lastTab}
				setTab={( index ) => dispatch( research_setLastTab( index ) )}
				renderTabs={Object.keys( researchData )}
				renderContent={( index ) => <ResearchSeries researchShips={Object.values( researchData )[ index ]}/>}
			/>
		</Page>
	);
}

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps = async () => {
	const { data: researchCSV } = await axios.get( `https://docs.google.com/spreadsheets/d/${process.env.SHEETS}/gviz/tq`, {
		params: { sheet: 'Research', tqx: 'out:csv' }
	} );
	
	return {
		props: {
			researchData: groupBy( ( await csvtojson().fromString( researchCSV ) )
				.map( ( val ) => ( {
					...pick( val, [ 'series', 'name', 'image' ] ),
					type: +val.type,
					fate: +val.fate
				} ) ), 'series' )
		}
	};
};
