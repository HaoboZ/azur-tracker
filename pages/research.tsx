import { Tab, Tabs, Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import ActionTitle from '../components/actionTitle';
import ResearchGroup from '../components/research/researchGroup';
import { researchShips } from '../lib/reference/researchRef';
import { research_reset, research_setLastTab } from '../lib/store/reducers/researchReducer';

export default function Research() {
	const research = useSelector( store => store.research ),
	      dispatch = useDispatch();
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	
	return <>
		<ActionTitle
			title='Research Tracker'
			actions={[ {
				name:    'Reset',
				onClick: () => {
					if ( confirm( 'Are you sure you want to reset this page?' ) )
						dispatch( research_reset() );
				}
			} ]}
		/>
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
				<ResearchGroup key={index} researchData={researchData} wide={wide}/>
			)}
		</SwipeableViews>
	</>;
}
