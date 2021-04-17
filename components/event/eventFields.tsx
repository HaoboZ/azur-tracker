import {
	Box,
	Grid,
	InputAdornment,
	Link,
	makeStyles,
	TextField,
	Typography
} from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import eventRef from '../../lib/reference/eventRef';
import { event_setPoints } from '../../lib/store/reducers/eventReducer';
import DailyDialog from './dailyDialog';
import ShopDialog from './shopDialog';

const useStyles = makeStyles( ( theme ) => ( {
	banner:        {
		width:    '100%',
		maxWidth: 700,
		display:  'block',
		margin:   'auto'
	},
	rightInput:    {
		textAlign: 'right'
	},
	disabledInput: {
		'& .MuiInputBase-root.Mui-disabled':         {
			color: theme.palette.text.primary
		},
		'& .MuiFormLabel-root.Mui-disabled':         {
			color: theme.palette.text.secondary
		},
		'& .MuiInput-underline.Mui-disabled:before': {
			borderBottomStyle: 'none'
		}
	},
	numberInput:   {
		'&[type=number]':                                             {
			'-moz-appearance': 'textfield'
		},
		'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
			'-webkit-appearance': 'none',
			margin:               0
		}
	}
} ) );

export default function EventFields( { time, remainingDays, neededPoints }: {
	time: moment.Moment
	remainingDays: number
	neededPoints: number
} ) {
	const event    = useSelector( store => store.event ),
	      dispatch = useDispatch();
	const classes = useStyles();
	
	const [ shopDialog, setShopDialog ] = React.useState( false );
	const [ dailyDialog, setDailyDialog ] = React.useState( false );
	
	return <Grid container spacing={2}>
		<Grid item xs={12} component={Box} mx='auto'>
			<Link
				href={`https://azurlane.koumakan.jp/${eventRef.link}`}
				target='_blank'>
				<img
					src={`/images/events/${eventRef.image}`} alt='event banner'
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
						type='text' disabled className={classes.disabledInput} label='Current Date'
						value={time.format( 'l LT' )}
					/>
				</Grid>
				<Grid item sm={4} xs={6}>
					<TextField
						type='text' disabled className={classes.disabledInput} label='End Date'
						defaultValue={moment( eventRef.endDate ).format( 'l LT' )}
					/>
				</Grid>
				<Grid item sm={4} xs={12} component={Box} textAlign='center'>
					<Typography>
						{remainingDays} Day{remainingDays === 1 ? '' : 's'} Remaining
					</Typography>
				</Grid>
				<Grid item sm={3} xs={6}>
					<TextField
						type='text' label='Shop'
						InputProps={{
							startAdornment: <InputAdornment position='start'>Cost:</InputAdornment>,
							endAdornment:   <InputAdornment position='end'>Points</InputAdornment>
						}}
						inputProps={{ className: classes.rightInput }}
						value={event.shopExpectedCost}
						onClick={() => setShopDialog( true )}
					/>
					<ShopDialog open={shopDialog} onClose={() => setShopDialog( false )}/>
				</Grid>
				<Grid item sm={3} xs={6}>
					<TextField
						type='text' label='Daily Points'
						InputProps={{
							endAdornment: <InputAdornment position='end'>Points</InputAdornment>
						}}
						inputProps={{ className: classes.rightInput }}
						value={event.dailyExpected}
						onClick={() => setDailyDialog( true )}
					/>
					<DailyDialog open={dailyDialog} onClose={() => setDailyDialog( false )}/>
				</Grid>
				<Grid item sm={3} xs={6}>
					<TextField
						type='text' disabled className={classes.disabledInput} label='Required Points'
						InputProps={{
							endAdornment: <InputAdornment position='end'>Points</InputAdornment>
						}}
						inputProps={{ className: classes.rightInput }}
						defaultValue={neededPoints}
					/>
				</Grid>
				<Grid item sm={3} xs={6}>
					<TextField
						type='number'
						label='Current Points'
						inputProps={{ className: `${classes.numberInput} ${classes.rightInput}` }}
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
