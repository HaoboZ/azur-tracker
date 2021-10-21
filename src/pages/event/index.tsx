import { Box, Link } from '@mui/material';
import moment from 'moment';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import eventImage from '../../../public/images/event.png';
import PageContainer from '../../components/page/container';
import PageTitle from '../../components/page/title';
import { event_newEvent } from '../../lib/store/reducers/eventReducer';
import eventData from './data';
import EventFarming from './farming';
import EventFields from './fields';

export default function Event() {
	const event = useSelector( ( { event } ) => event );
	const dispatch = useDispatch();
	
	const [ time, setTime ] = useState( moment );
	
	// resets event and changes time
	useEffect( () => {
		if ( event.name != eventData.name )
			dispatch( event_newEvent() );
		
		const interval = setInterval( () => setTime( moment() ), 15 * 1000 );
		return () => clearInterval( interval );
	}, [] );
	
	if ( event.name != eventData.name )
		return null;
	
	// number of days until end of event
	const remainingDays = Math.floor( Math.max(
		moment( eventData.endDate ).local().diff( time, 'day', true )
		, 0 ) );
	
	// number of points needed until only dailies are enough
	const neededPoints    = event.shopExpectedCost - remainingDays * event.dailyExpected,
	      // points still needed to be farmed
	      remainingPoints = Math.max( neededPoints - event.points, 0 );
	
	return <PageContainer>
		<Head><title>Event | Azur Lane Tracker</title></Head>
		<PageTitle>Event Tracker</PageTitle>
		<Box
			display='flex'
			justifyContent='center'
			sx={{
				'& img': {
					width   : '100%',
					maxWidth: 700,
					m       : 'auto'
				}
			}}>
			<Link href={eventData.link} target='_blank'>
				<Image src={eventImage} alt='event banner'/>
			</Link>
		</Box>
		<EventFields
			time={time}
			neededPoints={neededPoints}
		/>
		<EventFarming remainingPoints={remainingPoints}/>
	</PageContainer>;
}
