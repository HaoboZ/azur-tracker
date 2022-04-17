import { Box, Link, Typography } from '@mui/material';
import { differenceInDays } from 'date-fns';
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HelpTourButton from '../../components/helpTourButton';
import PageContainer from '../../components/page/container';
import PageTitle from '../../components/page/title';
import useInterval from '../../hooks/useInterval';
import { useData } from '../../providers/data';
import { event_newEvent } from '../../store/reducers/eventReducer';
import EventFarming from './farming';
import EventFields from './fields';
import { EventType } from './type';

export default function Event() {
	const event = useSelector( ( { event } ) => event );
	const dispatch = useDispatch();
	const { eventData, eventShopData } = useData<EventType>();
	
	const [ time, setTime ] = useState( () => new Date() );
	
	// resets event
	useEffect( () => {
		if ( event.name !== eventData.name )
			dispatch( event_newEvent( {
				...event,
				timestamp       : new Date().toISOString(),
				name            : eventData.name,
				shopExpectedCost: eventShopData.reduce( ( total, item ) =>
					total + item.cost * Math.min( item.amount, event.shop[ item.name ] || 0 ), 0 ),
				points          : 0
			} ) );
	}, [] );
	
	useInterval( () => setTime( new Date() ), { ms: 15 * 1000 }, [] );
	
	if ( event.name !== eventData.name )
		return null;
	
	// number of days until end of event
	const remainingDays = Math.max( differenceInDays( new Date( eventData.endDate ), time ), 0 );
	
	// number of points needed until only dailies are enough
	const neededPoints    = event.shopExpectedCost - remainingDays * event.dailyExpected,
	      // points still needed to be farmed
	      remainingPoints = Math.max( neededPoints - event.points, 0 );
	
	return (
		<PageContainer>
			<Head><title>Event | Azur Lane Tracker</title></Head>
			<PageTitle actions={(
				<HelpTourButton
					steps={[ {
						target   : '#help',
						content  : (
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
						placement: 'center'
					}, {
						target : '#shop',
						content: (
							<Fragment>
								<Typography>Open to change what you are aiming to buy from the shop.</Typography>
								<br/>
								<Typography>This shows the total amount of points needed.</Typography>
							</Fragment>
						)
					}, {
						target : '#daily',
						content: (
							<Fragment>
								<Typography>Open to change how many points you get daily. (missions, 3x, ...)</Typography>
								<br/>
								<Typography>This shows the total amount of points per day.</Typography>
							</Fragment>
						)
					}, {
						target : '#required',
						content: (
							<Typography>
								This is the calculated value of how many points you need by the end of today to get all items
								from shop when event ends.
							</Typography>
						)
					}, {
						target : '#current',
						content: (
							<Typography>
								Enter the number of points you currently have.
							</Typography>
						)
					}, {
						target : '#farmPoints',
						content: (
							<Typography>
								Select the stage or enter the number points you get for farming a stage.
							</Typography>
						)
					}, {
						target : '#farmCost',
						content: (
							<Typography>
								Enter the amount of oil it costs to clear.
							</Typography>
						)
					}, {
						target : '#farmPlays',
						content: (
							<Typography>
								Calculates amount of plays needed to buy all wanted items.
							</Typography>
						)
					}, {
						target : '#farmOil',
						content: (
							<Typography>
								Calculates amount of oil needed.
							</Typography>
						)
					} ]}
				/>
			)}>Event Tracker
			</PageTitle>
			<Box
				display='flex'
				justifyContent='center'
				sx={{
					img: {
						width   : '100%',
						maxWidth: 700,
						m       : 'auto'
					}
				}}>
				<Link href={eventData.href} target='_blank'>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={eventData.image} alt='event banner'/>
				</Link>
			</Box>
			<EventFields time={time} neededPoints={neededPoints}/>
			<EventFarming remainingPoints={remainingPoints}/>
		</PageContainer>
	);
}
