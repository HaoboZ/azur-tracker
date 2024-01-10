'use client';
import type { TabsProps } from '@mui/joy';
import { Box, Tab, TabList, Tabs } from '@mui/joy';
import type { UseEmblaCarouselType } from 'embla-carousel-react';
import useEmblaCarousel from 'embla-carousel-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
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
	const [startIndex] = useState(() => tab);

	const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex });

	useEventListener(emblaApi, 'select', (emblaApi: UseEmblaCarouselType[1]) => {
		setTabValue(emblaApi.selectedScrollSnap());
	});

	useDidUpdate(() => {
		emblaApi.scrollTo(tabValue);
	}, [tabValue]);

	return (
		<Box>
			<Tabs
				value={tabValue}
				onChange={(_, index: number) => setTabValue(index)}
				{...props}
				sx={{
					'overflow': 'auto',
					'scrollSnapType': 'x mandatory',
					'&::-webkit-scrollbar': { display: 'none' },
					...props.sx,
				}}>
				<TabList>
					{renderTabs.map((text, index) => (
						<Tab key={index}>{text}</Tab>
					))}
				</TabList>
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
