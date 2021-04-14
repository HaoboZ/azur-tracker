import { Grid } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EventFields from '../components/event/eventFields';
import FarmingCalc from '../components/event/farmingCalc';
import ActionTitle from '../components/actionTitle';
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
	const remainingDays = Math.max( moment( eventRef.endDate ).local().diff( time, 'day', true ), 0 );
	
	// number of points needed until only dailies are enough
	const neededPoints    = event.shopExpectedCost - Math.floor( remainingDays ) * event.dailyExpected,
	      // points still needed to be farmed
	      remainingPoints = Math.max( neededPoints - event.points, 0 );
	
	return <Grid container spacing={2}>
		<Grid item xs={12}>
			<ActionTitle
				title='Event Tracker'
				variant='h6'
				actions={[ { name: 'Reset', onClick: () => dispatch( event_reset() ) } ]}
			/>
		</Grid>
		<EventFields
			time={time}
			remainingDays={remainingDays}
			neededPoints={neededPoints}
		/>
		<FarmingCalc remainingPoints={remainingPoints}/>
	</Grid>;
}
