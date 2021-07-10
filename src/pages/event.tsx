import { Box, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageContainer from '../components/pageContainer';
import EventFields from '../fragments/event/eventFields';
import FarmingCalc from '../fragments/event/farmingCalc';
import eventRef from '../lib/reference/eventRef';
import { event_newEvent } from '../lib/store/reducers/eventReducer';

const useStyles = makeStyles( {
	banner: {
		width   : '100%',
		maxWidth: 700,
		margin  : 'auto'
	}
} );

export default function Event() {
	const event = useSelector( state => state.event );
	const dispatch = useDispatch();
	const classes = useStyles();
	
	const [ time, setTime ] = React.useState( moment() );
	
	React.useEffect( () => {
		if ( event.name != eventRef.name )
			dispatch( event_newEvent() );
		
		const interval = setInterval( () => setTime( moment() ), 15 * 1000 );
		return () => clearInterval( interval );
	}, [] );
	
	if ( event.name != eventRef.name )
		return null;
	
	// number of days until end of event
	const remainingDays = Math.floor( Math.max(
		moment( eventRef.endDate ).local().diff( time, 'day', true )
		, 0 ) );
	
	// number of points needed until only dailies are enough
	const neededPoints    = event.shopExpectedCost - remainingDays * event.dailyExpected,
	      // points still needed to be farmed
	      remainingPoints = Math.max( neededPoints - event.points, 0 );
	
	return <PageContainer title='Event Tracker'>
		<Box display='flex' justifyContent='center'>
			<Link href={eventRef.link} target='_blank'>
				<img
					src={`/images/events/${eventRef.image}`}
					alt='event banner'
					className={classes.banner}
				/>
			</Link>
		</Box>
		<EventFields
			time={time}
			neededPoints={neededPoints}
		/>
		<FarmingCalc remainingPoints={remainingPoints}/>
	</PageContainer>;
}
