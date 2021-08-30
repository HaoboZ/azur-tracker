import { Grid, InputAdornment, InputLabel, TextField, Typography } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormattedTextField from '../../components/formattedTextField';
import eventRef from '../../data/eventData';
import { useModal } from '../../lib/providers/modal';
import { event_setPoints } from '../../lib/store/reducers/eventReducer';
import DailyModal from './dailyModal';
import ShopModal from './shopModal';

export default function EventFields( { time, neededPoints }: {
	time: moment.Moment,
	neededPoints: number
} ) {
	const event = useSelector( ( { event } ) => event );
	const dispatch = useDispatch();
	const { showModal } = useModal();
	
	return <Grid container spacing={2} px={2} sx={{ '& .rightInput': { textAlign: 'right' } }}>
		<Grid item container xs={12} justifyContent='center'>
			<Typography variant='h6' color='textPrimary'>
				{eventRef.name}
			</Typography>
		</Grid>
		<Grid item sm={4} xs={6}>
			<InputLabel shrink>Current Date</InputLabel>
			<Typography>{time.format( 'l LT' )}</Typography>
		</Grid>
		<Grid item sm={4} xs={6}>
			<InputLabel shrink>End Date</InputLabel>
			<Typography>{moment( eventRef.endDate ).format( 'l LT' )}</Typography>
		</Grid>
		<Grid item container sm={4} xs={12} justifyContent='center' alignItems='center'>
			<Typography>
				End{time.isBefore( eventRef.endDate ) ? 's' : 'ed'} {time.to( eventRef.endDate )}
			</Typography>
		</Grid>
		<Grid item sm={3} xs={6}>
			<FormattedTextField
				type='text'
				label='Shop Cost'
				inputProps={{ className: 'rightInput' }}
				InputProps={{
					readOnly    : true,
					endAdornment: <InputAdornment position='end'>Points</InputAdornment>
				}}
				value={event.shopExpectedCost}
				onClick={() => showModal( ShopModal )}
			/>
		</Grid>
		<Grid item sm={3} xs={6}>
			<TextField
				type='text'
				label='Daily Points'
				inputProps={{ className: 'rightInput' }}
				InputProps={{
					readOnly    : true,
					endAdornment: <InputAdornment position='end'>Points</InputAdornment>
				}}
				value={event.dailyExpected}
				onClick={() => showModal( DailyModal )}
			/>
		</Grid>
		<Grid item sm={3} xs={6}>
			<InputLabel shrink>Required Points</InputLabel>
			<Typography>{neededPoints} Points</Typography>
		</Grid>
		<Grid item sm={3} xs={6}>
			<FormattedTextField
				type='number'
				label='Current Points'
				inputProps={{
					inputMode: 'numeric',
					className: 'numberInput',
					onFocus  : ( { target } ) => target.select()
				}}
				InputProps={{
					endAdornment: <InputAdornment position='end'>Points</InputAdornment>
				}}
				value={event.points}
				onChange={( { target } ) => dispatch( event_setPoints( parseInt( target.value ) ) )}
			/>
		</Grid>
	</Grid>;
}
