'use client';
import PageContainer from '@/components/page/container';
import PageTitle from '@/components/page/title';
import SwipeableTabViews from '@/components/swipeableTabViews';
import pget from '@/src/helpers/pget';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { researchActions } from '@/src/store/reducers/researchReducer';
import ResearchSeries from './series';
import type { ResearchShipType } from './type';

export default function Research({
	researchData,
}: {
	researchData: Record<string, ResearchShipType[]>;
}) {
	const lastTab = useAppSelector(pget('research.lastTab'));
	const dispatch = useAppDispatch();

	return (
		<PageContainer>
			<PageTitle>Research Tracker</PageTitle>
			<SwipeableTabViews
				sx={{ bgcolor: pget('vars.palette.divider') }}
				tab={lastTab}
				setTab={(index) => dispatch(researchActions.setLastTab(index))}
				renderTabs={Object.keys(researchData)}
				renderContent={(index) => (
					<ResearchSeries researchShips={Object.values(researchData)[index]} />
				)}
			/>
		</PageContainer>
	);
}
