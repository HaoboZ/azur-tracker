'use client';
import PageContainer from '@/components/page/container';
import PageTitle from '@/components/page/title';
import pget from '@/src/helpers/pget';
import useInterval from '@/src/hooks/useInterval';
import { useData } from '@/src/providers/data';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { eventActions } from '@/src/store/reducers/eventReducer';
import { Link, Stack, Typography } from '@mui/material';
import { differenceInDays } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import EventFarming from './farming';
import EventFields from './fields';
import type { EventType } from './type';

export default function Event() {
	const event = useAppSelector(pget('event'));
	const dispatch = useAppDispatch();
	const { eventData, eventShopData } = useData<EventType>();

	const [time, setTime] = useState(() => new Date());

	// resets event
	useEffect(() => {
		if (event.name === eventData.name) return;
		dispatch(
			eventActions.newEvent({
				...event,
				name: eventData.name,
				shopExpectedCost: eventShopData.reduce(
					(total, item) =>
						total + item.cost * Math.min(item.amount, event.shop[item.name] || 0),
					0,
				),
				points: 0,
			}),
		);
	}, []);

	useInterval(() => setTime(new Date()), 15 * 1000);

	// number of days until end of event
	const remainingDays = Math.max(differenceInDays(new Date(eventData.endDate), time), 0);

	// number of points needed until only dailies are enough
	const neededPoints = event.shopExpectedCost - remainingDays * event.dailyExpected,
		// points still needed to be farmed
		remainingPoints = Math.max(neededPoints - event.points, 0);

	return (
		<PageContainer>
			<PageTitle>Event Tracker</PageTitle>
			<Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Link href={eventData.href} target='_blank'>
					<Image
						src={eventData.image}
						alt='event banner'
						width={600}
						height={200}
						style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
					/>
				</Link>
				<Typography variant='h3'>{eventData.name}</Typography>
			</Stack>
			<EventFields time={time} neededPoints={neededPoints} />
			<EventFarming remainingPoints={remainingPoints} />
		</PageContainer>
	);
}
