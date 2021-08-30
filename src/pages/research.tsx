import { Tab, Tabs, useTheme } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import ActionTitle from '../components/actionTitle';
import PageContainer from '../components/pageContainer';
import { researchShips } from '../data/researchData';
import ResearchGroup from '../fragments/research/researchGroup';
import { setResearchLastTab } from '../lib/store/reducers/mainReducer';

// noinspection JSUnusedGlobalSymbols
export default function Research() {
	const researchLastTab = useSelector( ( { main } ) => main.researchLastTab );
	const dispatch = useDispatch();
	const theme = useTheme();
	
	const [ swipeFix, setSwipeFix ] = React.useState<React.CSSProperties>();
	
	React.useEffect( () => {
		setTimeout( () => setSwipeFix( {
			transition: theme.transitions.create( 'transform' )
		} ), 1000 );
	}, [] );
	
	return <PageContainer>
		<ActionTitle>Research Tracker</ActionTitle>
		<Tabs
			variant='fullWidth'
			selectionFollowsFocus
			value={researchLastTab.toString()}
			onChange={( e, value ) => dispatch( setResearchLastTab( +value ) )}>
			{Object.keys( researchShips ).map( ( label, index ) =>
				<Tab key={index} label={label} value={index.toString()}/> )}
		</Tabs>
		<SwipeableViews
			index={researchLastTab}
			onChangeIndex={index => dispatch( setResearchLastTab( index ) )}
			containerStyle={swipeFix}>
			{Object.values( researchShips ).map( ( researchData, index ) =>
				<ResearchGroup key={index} researchData={researchData}/>
			)}
		</SwipeableViews>
	</PageContainer>;
}
