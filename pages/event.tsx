import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ActionTitle from '../components/actionTitle';
import EventFields from '../fragments/event/eventFields';
import FarmingCalc from '../fragments/event/farmingCalc';
import eventRef from '../lib/reference/eventRef';
import { event_newEvent, event_reset } from '../lib/store/reducers/eventReducer';

export default function Event() {
	const event    = useSelector( store => store.event ),
	      dispatch = useDispatch();
	
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
	
	return <>
		<ActionTitle
			title='Event Tracker'
			actions={[ {
				name:    'Reset',
				onClick: () => {
					if ( confirm( 'Are you sure you want to reset this page?' ) )
						dispatch( event_reset() );
				}
			} ]}
		/>
		<EventFields
			time={time}
			remainingDays={remainingDays}
			neededPoints={neededPoints}
		/>
		<FarmingCalc remainingPoints={remainingPoints}/>
	</>;
}
