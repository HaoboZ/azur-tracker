import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import PageContainer from '../../components/page/container';
import PageTitle from '../../components/page/title';
import SwipeableTabViews from '../../components/swipeableTabViews';
import { research_setLastTab } from '../../store/reducers/researchReducer';
import researchData from './data';
import ResearchSeries from './series';

// noinspection JSUnusedGlobalSymbols
export default function Research() {
	const lastTab = useSelector( ( { research } ) => research.lastTab );
	const dispatch = useDispatch();
	
	return (
		<PageContainer>
			<Head><title>Research | Azur Lane Tracker</title></Head>
			<PageTitle>Research Tracker</PageTitle>
			<SwipeableTabViews
				tab={lastTab}
				setTab={( index ) => dispatch( research_setLastTab( index ) )}
				renderTabs={researchData.map( ( { name } ) => name )}
				renderContent={( index ) => <ResearchSeries researchShips={researchData[ index ].ships}/>}
				variant='fullWidth'
			/>
		</PageContainer>
	);
}
