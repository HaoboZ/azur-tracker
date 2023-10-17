'use client';
import Page from '@/components/page';
import SwipeableTabViews from '@/components/swipeableTabViews';
import { useData } from '@/src/providers/data';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { researchActions } from '@/src/store/reducers/researchReducer';
import ResearchSeries from './series';
import type { ResearchType } from './type';

export default function Research() {
	const lastTab = useAppSelector(({ research }) => research.lastTab);
	const dispatch = useAppDispatch();
	const { researchData } = useData<ResearchType>();

	return (
		<Page noSsr hideBack title='Research Tracker'>
			<SwipeableTabViews
				sx={{ bgcolor: ({ vars }: any) => vars.palette.divider }}
				tab={lastTab}
				setTab={(index) => dispatch(researchActions.setLastTab(index))}
				renderTabs={Object.keys(researchData)}
				renderContent={(index) => (
					<ResearchSeries researchShips={Object.values(researchData)[index]} />
				)}
			/>
		</Page>
	);
}
