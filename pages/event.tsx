import { Grid } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import EventFields from '../components/event/eventFields';

import FarmingTable from '../components/event/farmingTable';
import PageTitleReset from '../components/pageTitleReset';
import eventRef from '../lib/reference/eventRef';
import { useTypedSelector } from '../lib/store';
import { event_newEvent, event_reset } from '../lib/store/eventReducer';

export default function Event() {
	const event    = useTypedSelector( store => store.event ),
	      dispatch = useDispatch();
	
	React.useEffect( () => {
		if ( event.name != eventRef.name )
			dispatch( event_newEvent() );
	}, [] );
	
	if ( event.name != eventRef.name )
		return null;
	
	const remainingDays = Math.max( moment( eventRef.endDate ).local().diff( moment(), 'day', true ), 0 );
	
	const neededPoints    = event.shopExpectedCost - Math.floor( remainingDays ) * event.dailyExpected,
	      remainingPoints = Math.max( neededPoints - event.points, 0 );
	
	return <Grid container spacing={ 2 }>
		<PageTitleReset name='Event Tracker' reset={ event_reset }/>
		<EventFields remainingDays={ remainingDays } neededPoints={ neededPoints }/>
		<FarmingTable remainingPoints={ remainingPoints }/>
	</Grid>;
}
