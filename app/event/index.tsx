'use client';
import HelpTourButton from '@/components/helpTourButton';
import PageContainer from '@/components/page/container';
import PageTitle from '@/components/page/title';
import { useData } from '@/src/providers/data';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { eventActions } from '@/src/store/reducers/eventReducer';
import { Box, Link, Typography } from '@mui/material';
import { differenceInDays } from 'date-fns';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { useIntervalWhen } from 'rooks';
import EventFarming from './farming';
import EventFields from './fields';
import type { EventType } from './type';

export default function Event() {
	const event = useAppSelector(({ event }) => event);
	const dispatch = useAppDispatch();
	const { eventData, eventShopData } = useData<EventType>();

	const [time, setTime] = useState(() => new Date());

	// resets event
	useEffect(() => {
		if (event.name !== eventData.name)
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

	useIntervalWhen(() => setTime(new Date()), 15 * 1000);

	if (event.name !== eventData.name) return null;

	// number of days until end of event
	const remainingDays = Math.max(differenceInDays(new Date(eventData.endDate), time), 0);

	// number of points needed until only dailies are enough
	const neededPoints = event.shopExpectedCost - remainingDays * event.dailyExpected,
		// points still needed to be farmed
		remainingPoints = Math.max(neededPoints - event.points, 0);

	return (
		<PageContainer noSsr>
			<PageTitle
				actions={
					<HelpTourButton
						steps={[
							{
								element: '#help',
								intro: (
									<Fragment>
										<Typography>This page will help you</Typography>
										<ul style={{ textAlign: 'start' }}>
											<li>track event information</li>
											<li>buy what you want from the shop</li>
											<li>and farm stages</li>
										</ul>
										<Typography>WITHOUT creating spreadsheets</Typography>
									</Fragment>
								),
							},
							{
								element: '#shop',
								intro: (
									<Fragment>
										<Typography>
											Open to change what you are aiming to buy from the shop.
										</Typography>
										<br />
										<Typography>This shows the total amount of points needed.</Typography>
									</Fragment>
								),
							},
							{
								element: '#daily',
								intro: (
									<Fragment>
										<Typography>
											Open to change how many points you get daily. (missions, 3x, ...)
										</Typography>
										<br />
										<Typography>
											This shows the total amount of points per day.
										</Typography>
									</Fragment>
								),
							},
							{
								element: '#required',
								intro: (
									<Typography>
										This is the calculated value of how many points you need by the end of
										today to get all items from shop when event ends.
									</Typography>
								),
							},
						]}
					/>
				}>
				Event Tracker
			</PageTitle>
			<Box display='flex' justifyContent='center'>
				<Link href={eventData.href} target='_blank'>
					<Image
						src={eventData.image}
						alt='event banner'
						width={513}
						height={185}
						style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
					/>
				</Link>
			</Box>
			<EventFields time={time} neededPoints={neededPoints} />
			<EventFarming remainingPoints={remainingPoints} />
		</PageContainer>
	);
}
