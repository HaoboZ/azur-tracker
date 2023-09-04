import type { TabsProps } from '@mui/material';
import { Box, Tab, Tabs } from '@mui/material';
import type { EmblaCarouselType } from 'embla-carousel-react';
import useEmblaCarousel from 'embla-carousel-react';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { useDidUpdate } from 'rooks';
import useControlled from '../hooks/useControlled';
import useEventListener from '../hooks/useEventListener';

type SwipeableTabViewsProps = {
	tab?: number;
	setTab?: (index: number) => void;
	renderTabs: ReactNode[];
	renderContent: (index: number) => ReactNode;
} & TabsProps;

export default function SwipeableTabViews({
	tab = 0,
	setTab,
	renderTabs,
	renderContent,
	...props
}: SwipeableTabViewsProps) {
	const [tabValue, setTabValue] = useControlled(tab, setTab);
	const startIndex = useMemo(() => tab, []);

	const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex });

	useEventListener(emblaApi, 'select', (emblaApi: EmblaCarouselType) => {
		setTabValue(emblaApi.selectedScrollSnap());
	});

	useDidUpdate(() => {
		emblaApi.scrollTo(tabValue);
	}, [tabValue]);

	return (
		<Box>
			<Tabs
				variant='scrollable'
				value={tabValue}
				onChange={(e, index) => setTabValue(index)}
				{...props}>
				{renderTabs.map((label, index) => (
					<Tab key={index} label={label} />
				))}
			</Tabs>
			<Box ref={emblaRef} overflow='hidden'>
				<Box display='flex'>
					{[...Array(renderTabs.length)].map((_, index) => (
						<Box key={index} flex='0 0 100%' minWidth={0}>
							{renderContent(index)}
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	);
}
