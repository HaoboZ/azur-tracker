import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageContainer from '../components/pageContainer';
import EventFields from '../fragments/event/eventFields';
import FarmingCalc from '../fragments/event/farmingCalc';
import eventRef from '../lib/reference/eventRef';
import { event_newEvent } from '../lib/store/reducers/eventReducer';

export default function Event() {
	const event = useSelector( state => state.event );
	const dispatch = useDispatch();
	
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
		<EventFields
			time={time}
			neededPoints={neededPoints}
		/>
		<FarmingCalc remainingPoints={remainingPoints}/>
	</PageContainer>;
}