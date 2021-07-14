import { Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import PageContainer from '../components/pageContainer';
import ResearchGroup from '../fragments/research/researchGroup';
import { researchShips } from '../lib/reference/researchRef';
import { setResearchLastTab } from '../lib/store/reducers/mainReducer';

// noinspection JSUnusedGlobalSymbols
export default function Research() {
	const researchLastTab = useSelector( state => state.main.researchLastTab );
	const dispatch = useDispatch();
	
	const [ swipeFix, setSwipeFix ] = React.useState<any>();
	React.useEffect( () => {
		setTimeout( () =>
			setSwipeFix( { transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s' } ), 1000 );
	}, [] );
	
	return <PageContainer title='Research Tracker'>
		<Tabs
			variant='fullWidth'
			value={researchLastTab.toString()}
			onChange={( e, value ) => dispatch( setResearchLastTab( +value ) )}>
			{Object.keys( researchShips ).map( ( label, index ) =>
				<Tab key={index} label={label} value={index.toString()}/> )}
		</Tabs>
		<SwipeableViews
			index={researchLastTab}
			onChangeIndex={( index ) => dispatch( setResearchLastTab( index ) )}
			containerStyle={swipeFix}>
			{Object.values( researchShips ).map( ( researchData, index ) =>
				<ResearchGroup key={index} researchData={researchData}/>
			)}
		</SwipeableViews>
	</PageContainer>;
}
