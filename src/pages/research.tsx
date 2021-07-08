import { Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import PageContainer from '../components/pageContainer';
import ResearchGroup from '../fragments/research/researchGroup';
import { researchShips } from '../lib/reference/researchRef';
import { research_setLastTab } from '../lib/store/reducers/researchReducer';

// noinspection JSUnusedGlobalSymbols
export default function Research() {
	const research = useSelector( state => state.research );
	const dispatch = useDispatch();
	
	return <PageContainer title='Research Tracker'>
		<Tabs
			variant='fullWidth'
			value={research.lastTab.toString()}
			onChange={( e, value ) => dispatch( research_setLastTab( +value ) )}>
			{Object.keys( researchShips ).map( ( label, index ) =>
				<Tab key={index} label={label} value={index.toString()}/> )}
		</Tabs>
		<SwipeableViews
			index={research.lastTab}
			onChangeIndex={( index ) => dispatch( research_setLastTab( index ) )}>
			{Object.values( researchShips ).map( ( researchData, index ) =>
				<ResearchGroup key={index} researchData={researchData}/>
			)}
		</SwipeableViews>
	</PageContainer>;
}
