'use client';
import Page from '@/components/page';
import SwipeableTabViews from '@/components/swipeableTabViews';
import { useData } from '@/src/providers/data';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { research_setLastTab } from '@/src/store/reducers/researchReducer';
import ResearchSeries from './series';
import type { ResearchType } from './type';

// noinspection JSUnusedGlobalSymbols
export default function Research() {
	const lastTab = useAppSelector( ( { research } ) => research.lastTab );
	const dispatch = useAppDispatch();
	const { researchData } = useData<ResearchType>();
	
	return (
		<Page title='Research Tracker'>
			<SwipeableTabViews
				sx={{ bgcolor: ( { palette } ) => palette.divider }}
				tab={lastTab}
				setTab={( index ) => dispatch( research_setLastTab( index ) )}
				renderTabs={Object.keys( researchData )}
				renderContent={( index ) => <ResearchSeries researchShips={Object.values( researchData )[ index ]}/>}
			/>
		</Page>
	);
}
