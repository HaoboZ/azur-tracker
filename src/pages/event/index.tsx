import { Box, Link, Typography } from '@mui/material';
import moment from 'moment';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import eventImage from '../../../public/images/event.png';
import HelpTourButton from '../../components/helpTourButton';
import PageContainer from '../../components/page/container';
import PageTitle from '../../components/page/title';
import useIntervalEffect from '../../lib/hooks/useIntervalEffect';
import { event_newEvent } from '../../lib/store/reducers/eventReducer';
import eventData from './data';
import EventFarming from './farming';
import EventFields from './fields';

export default function Event() {
	const event = useSelector( ( { event } ) => event );
	const dispatch = useDispatch();
	
	const [ time, setTime ] = useState( moment );
	
	// resets event
	useEffect( () => {
		if ( event.name != eventData.name )
			dispatch( event_newEvent() );
	}, [] );
	
	useIntervalEffect( () => setTime( moment() ), 15 * 1000, [] );
	
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
		<PageTitle actions={<HelpTourButton
			steps={[ {
				target   : '#help',
				content  : <>
					<Typography>This page will help you</Typography>
					<ul style={{ textAlign: 'start' }}>
						<li>track event information</li>
						<li>buy what you want from the shop</li>
						<li>and farm stages</li>
					</ul>
					<Typography>WITHOUT creating spreadsheets</Typography>
				</>,
				placement: 'center'
			}, {
				target : '#shop .MuiTextField-root',
				content: <>
					<Typography>Open to change what you are aiming to buy from the shop.</Typography>
					<br/>
					<Typography>This shows the total amount of points needed.</Typography>
				</>
			}, {
				target : '#daily .MuiTextField-root',
				content: <>
					<Typography>Open to change how many points you get daily. (missions, 3x, ...)</Typography>
					<br/>
					<Typography>This shows the total amount of points per day.</Typography>
				</>
			}, {
				target : '#required .MuiBox-root',
				content: <Typography>
					This is the calculated value of how many points you need by the end of today to get all items from
					shop when event ends.
				</Typography>
			}, {
				target : '#current .MuiTextField-root',
				content: <Typography>
					Enter the number of points you currently have.
				</Typography>
			}, {
				target : '#farmPoints',
				content: <Typography>
					Select the stage or enter the number points you get for farming a stage.
				</Typography>
			}, {
				target : '#farmCost',
				content: <Typography>
					Enter the amount of oil it costs to clear.
				</Typography>
			}, {
				target : '#farmPlays',
				content: <Typography>
					Calculates amount of plays needed to buy all wanted items.
				</Typography>
			}, {
				target : '#farmOil',
				content: <Typography>
					Calculates amount of oil needed.
				</Typography>
			} ]}
		/>}>Event Tracker</PageTitle>
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
