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
	
	const [ swipeFix, setSwipeFix ] = React.useState<any>();
	React.useEffect( () => {
		setTimeout( () =>
			setSwipeFix( { transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s' } ), 1000 );
	}, [] );
	
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
			onChangeIndex={( index ) => dispatch( research_setLastTab( index ) )}
			containerStyle={swipeFix}>
			{Object.values( researchShips ).map( ( researchData, index ) =>
				<ResearchGroup key={index} researchData={researchData}/>
			)}
		</SwipeableViews>
	</PageContainer>;
}
