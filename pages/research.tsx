import { Tab, Theme, useMediaQuery } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
			actions={[ { name: 'Reset', onClick: () => dispatch( research_reset() ) } ]}
		/>
		<TabContext value={research.lastTab.toString()}>
			<TabList
				variant='fullWidth'
				onChange={( e, value ) => dispatch( research_setLastTab( value ) )}>
				{Object.keys( researchShips ).map( ( label, index ) =>
					<Tab key={index} label={label} value={index.toString()}/> )}
			</TabList>
			{Object.values( researchShips ).map( ( researchData, index ) =>
				<TabPanel key={index} value={index.toString()} style={{ padding: 0 }}>
					<ResearchGroup researchData={researchData} wide={wide}/>
				</TabPanel> )}
		</TabContext>
	</>;
}
