import { Grid, InputAdornment, InputLabel, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormattedTextField from '../../components/formattedTextField';
import eventRef from '../../lib/reference/eventRef';
import { event_setPoints } from '../../lib/store/reducers/eventReducer';
import DailyModal from './dailyModal';
import ShopModal from './shopModal';

const useStyles = makeStyles( {
	rightInput : {
		textAlign: 'right'
	},
	numberInput: {
		'&[type=number]'                                            : {
			'-moz-appearance': 'textfield'
		},
		'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
			'-webkit-appearance': 'none',
			margin              : 0
		}
	}
} );

export default function EventFields( { time, neededPoints }: {
	time: moment.Moment,
	neededPoints: number
} ) {
	const event = useSelector( state => state.event );
	const dispatch = useDispatch();
	const classes = useStyles();
	
	const [ shopModalVisible, setShopModalVisible ] = React.useState( false );
	const [ dailyModalVisible, setDailyModalVisible ] = React.useState( false );
	
	return <Grid container spacing={2} px={2}>
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
				inputProps={{ className: classes.rightInput }}
				InputProps={{
					readOnly    : true,
					endAdornment: <InputAdornment position='end'>Points</InputAdornment>
				}}
				value={event.shopExpectedCost}
				onClick={() => setShopModalVisible( true )}
			/>
			<ShopModal open={shopModalVisible} onClose={() => setShopModalVisible( false )}/>
		</Grid>
		<Grid item sm={3} xs={6}>
			<TextField
				type='text'
				label='Daily Points'
				inputProps={{ className: classes.rightInput }}
				InputProps={{
					readOnly    : true,
					endAdornment: <InputAdornment position='end'>Points</InputAdornment>
				}}
				value={event.dailyExpected}
				onClick={() => setDailyModalVisible( true )}
			/>
			<DailyModal open={dailyModalVisible} onClose={() => setDailyModalVisible( false )}/>
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
					className: clsx( classes.numberInput, classes.rightInput ),
					onFocus  : ( e ) => e.target.select()
				}}
				InputProps={{
					endAdornment: <InputAdornment position='end'>Points</InputAdornment>
				}}
				value={event.points}
				onChange={( e ) =>
					dispatch( event_setPoints( parseInt( e.target.value ) ) )}
			/>
		</Grid>
	</Grid>;
}
