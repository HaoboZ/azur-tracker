import { Box, Grid, InputAdornment, Link, makeStyles, TextField, Typography } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import eventRef from '../../lib/reference/eventRef';
import { event_setPoints } from '../../lib/store/reducers/eventReducer';
import DailyModal from './dailyModal';
import ShopModal from './shopModal';

const useStyles = makeStyles( ( theme ) => ( {
	banner     : {
		width   : '100%',
		maxWidth: 700,
		display : 'block',
		margin  : 'auto'
	},
	rightInput : {
		textAlign: 'right'
	},
	blankInput : {
		'& .MuiInputBase-root.Mui-disabled'        : {
			color: theme.palette.text.primary
		},
		'& .MuiFormLabel-root.Mui-disabled'        : {
			color: theme.palette.text.secondary
		},
		'& .MuiInput-underline.Mui-disabled:before': {
			borderBottomStyle: 'none'
		}
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
} ) );

export default function EventFields( { time, neededPoints }: {
	time: moment.Moment,
	neededPoints: number
} ) {
	const event = useSelector( state => state.event );
	const dispatch = useDispatch();
	const classes = useStyles();
	
	const [ shopModalVisible, setShopModalVisible ] = React.useState( false );
	const [ dailyModalVisible, setDailyModalVisible ] = React.useState( false );
	
	return <Grid container spacing={2}>
		<Grid item xs={12} component={Box} mx='auto'>
			<Link
				href={eventRef.link}
				target='_blank'>
				<img
					src={`/images/events/${eventRef.image}`}
					alt='event banner'
					className={classes.banner}
				/>
			</Link>
		</Grid>
		<Grid item xs={12} component={Box} textAlign='center'>
			<Typography variant='h6' color='textPrimary'>
				{eventRef.name}
			</Typography>
		</Grid>
		<Box mx={3}>
			<Grid container spacing={2}>
				<Grid item sm={4} xs={6}>
					<TextField
						type='text'
						disabled
						className={classes.blankInput}
						label='Current Date'
						value={time.format( 'l LT' )}
					/>
				</Grid>
				<Grid item sm={4} xs={6}>
					<TextField
						type='text'
						disabled
						className={classes.blankInput}
						label='End Date'
						defaultValue={moment( eventRef.endDate ).format( 'l LT' )}
					/>
				</Grid>
				<Grid item container sm={4} xs={12} justify='center' alignItems='center'>
					<Typography>
						End{time.isBefore( eventRef.endDate ) ? 's' : 'ed'} {time.to( eventRef.endDate )}
					</Typography>
				</Grid>
				<Grid item sm={3} xs={6}>
					<TextField
						type='text'
						label='Shop'
						inputProps={{ className: classes.rightInput }}
						InputProps={{
							readOnly      : true,
							startAdornment: <InputAdornment position='start'>Cost:</InputAdornment>,
							endAdornment  : <InputAdornment position='end'>Points</InputAdornment>
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
					<TextField
						type='text'
						label='Required Points'
						disabled
						className={classes.blankInput}
						inputProps={{ className: classes.rightInput }}
						InputProps={{
							endAdornment: <InputAdornment position='end'>Points</InputAdornment>
						}}
						value={neededPoints}
					/>
				</Grid>
				<Grid item sm={3} xs={6}>
					<TextField
						type='number'
						label='Current Points'
						inputProps={{
							inputMode: 'numeric',
							className: `${classes.numberInput} ${classes.rightInput}`,
							onFocus  : ( e ) => e.target.select()
						}}
						InputProps={{
							endAdornment: <InputAdornment position='end'>Points</InputAdornment>
						}}
						value={event.points}
						onChange={( e ) => dispatch( event_setPoints( parseInt( e.target.value ) ) )}
					/>
				</Grid>
			</Grid>
		</Box>
	</Grid>;
}