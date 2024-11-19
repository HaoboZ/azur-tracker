'use client';
import type { TabsProps } from '@mui/material';
import { Box, Tab, Tabs } from '@mui/material';
import type { UseEmblaCarouselType } from 'embla-carousel-react';
import useEmblaCarousel from 'embla-carousel-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import useControlled from '../hooks/useControlled';
import useEffectAfter from '../hooks/useEffectAfter';
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

	useEffectAfter(() => {
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
				{renderTabs.map((text, index) => (
					<Tab key={index} label={text} />
				))}
			</Tabs>
			<Box ref={emblaRef} sx={{ overflow: 'hidden' }}>
				<Box sx={{ display: 'flex' }}>
					{[...Array(renderTabs.length)].map((_, index) => (
						<Box key={index} sx={{ flex: '0 0 100%', minWidth: 0 }}>
							{renderContent(index)}
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	);
}
