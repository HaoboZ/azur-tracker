import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ActionTitle from '../components/actionTitle';
import PageContainer from '../components/page/container';
import SwipeableTabViews from '../components/swipeableTabViews';
import { researchData } from '../data/researchData';
import ResearchGroup from '../fragments/research/researchGroup';
import { setResearchLastTab } from '../lib/store/reducers/mainReducer';

// noinspection JSUnusedGlobalSymbols
export default function Research() {
	const researchLastTab = useSelector( ( { main } ) => main.researchLastTab );
	const dispatch = useDispatch();
	
	return <PageContainer>
		<ActionTitle>Research Tracker</ActionTitle>
		<SwipeableTabViews
			tab={researchLastTab}
			setTab={( index ) => dispatch( setResearchLastTab( index ) )}
			renderTabs={researchData.map( ( { name } ) => name )}
			renderContent={( index ) => <ResearchGroup researchShips={researchData[ index ].ships}/>}
			variant='fullWidth'
		/>
	</PageContainer>;
}
