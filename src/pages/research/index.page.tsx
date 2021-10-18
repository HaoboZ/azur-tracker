import Head from 'next/head';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageContainer from '../../components/page/container';
import PageTitle from '../../components/page/title';
import SwipeableTabViews from '../../components/swipeableTabViews';
import { setResearchLastTab } from '../../lib/store/reducers/mainReducer';
import researchData from './data';
import ResearchSeries from './series';

// noinspection JSUnusedGlobalSymbols
export default function Research() {
	const researchLastTab = useSelector( ( { main } ) => main.researchLastTab );
	const dispatch = useDispatch();
	
	return <PageContainer>
		<Head><title>Research | Azur Lane Tracker</title></Head>
		<PageTitle>Research Tracker</PageTitle>
		<SwipeableTabViews
			tab={researchLastTab}
			setTab={( index ) => dispatch( setResearchLastTab( index ) )}
			renderTabs={researchData.map( ( { name } ) => name )}
			renderContent={( index ) => <ResearchSeries researchShips={researchData[ index ].ships}/>}
			variant='fullWidth'
		/>
	</PageContainer>;
}