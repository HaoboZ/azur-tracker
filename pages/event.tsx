import {
	Button,
	Grid,
	InputAdornment,
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography
} from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';

import EventDailyDialog from '../components/eventDailyDialog';
import EventShopDialog from '../components/eventShopDialog';
import eventRef from '../lib/eventRef';
import { useTypedSelector } from '../lib/store';
import {
	event_addFarming,
	event_modifyFarming,
	event_newEvent,
	event_reset,
	event_setPoints
} from '../lib/store/eventReducer';

const useStyles = makeStyles( ( theme ) => ( {
	spacedTitle:   {
		justifyContent: 'space-between'
	},
	centerItems:   {
		textAlign: 'center'
	},
	rightItems:    {
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
	shopInput:     { textAlign: 'right' },
	table:         {
		'& tr:nth-of-type(odd),& th': {
			backgroundColor: theme.palette.type === 'dark'
				                 ? theme.palette.action.hover : theme.palette.action.focus
		}
	}
} ) );

export default function Event() {
	const event    = useTypedSelector( store => store.event ),
	      dispatch = useDispatch();
	
	const classes = useStyles();
	
	const [ shopDialog, setShopDialog ] = React.useState( false );
	const [ dailyDialog, setDailyDialog ] = React.useState( false );
	
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
		<Grid item xs={ 12 } container className={ classes.spacedTitle }>
			<Typography variant='h5'>
				Event Tracker
			</Typography>
			<Button
				variant='contained' color='secondary'
				onClick={ () => dispatch( event_reset() ) }>Reset</Button>
		</Grid>
		<Grid item xs={ 12 } className={ classes.centerItems }>
			<img
				src={ eventRef.image } alt='event banner'
				style={ { width: '100%', maxWidth: 700, display: 'block', margin: 'auto' } }/>
		</Grid>
		<Grid item xs={ 12 } className={ classes.centerItems }>
			<Typography variant='h6'>{ eventRef.name }</Typography>
		</Grid>
		<Grid item sm={ 4 } xs={ 6 }>
			<TextField
				type='text' disabled className={ classes.disabledInput } label='Current Date'
				defaultValue={ moment().format( 'l LT' ) }/>
		</Grid>
		<Grid item sm={ 4 } xs={ 6 }>
			<TextField
				type='text' disabled className={ classes.disabledInput } label='End Date'
				defaultValue={ moment( eventRef.endDate ).format( 'l LT' ) }/>
		</Grid>
		<Grid item sm={ 4 } xs={ 6 }>
			<TextField
				type='text' disabled className={ classes.disabledInput } label='Days Remaining'
				InputProps={ {
					endAdornment: <InputAdornment position='end'>Days</InputAdornment>
				} }
				inputProps={ { className: classes.rightItems } }
				defaultValue={ Math.floor( remainingDays ) }/>
		</Grid>
		<Grid item sm={ 4 } xs={ 6 }>
			<TextField
				type='text' label='Shop'
				InputProps={ {
					startAdornment: <InputAdornment position='start'>Cost:</InputAdornment>,
					endAdornment:   <InputAdornment position='end'>Points</InputAdornment>
				} }
				inputProps={ { className: classes.rightItems } }
				value={ event.shopExpectedCost }
				onClick={ () => setShopDialog( true ) }/>
			<EventShopDialog status={ shopDialog } closeDialog={ () => setShopDialog( false ) }/>
		</Grid>
		<Grid item sm={ 4 } xs={ 6 }>
			<TextField
				type='text' label='Daily Points'
				InputProps={ {
					endAdornment: <InputAdornment position='end'>Points</InputAdornment>
				} }
				inputProps={ { className: classes.rightItems } }
				value={ event.dailyExpected }
				onClick={ () => setDailyDialog( true ) }/>
			<EventDailyDialog status={ dailyDialog } closeDialog={ () => setDailyDialog( false ) }/>
		</Grid>
		<Grid item sm={ 4 } xs={ 6 }>
			<TextField
				type='number' label='Current Points'
				inputProps={ { className: classes.rightItems } }
				InputProps={ {
					endAdornment: <InputAdornment position='end'>Points</InputAdornment>
				} }
				value={ event.points }
				onChange={ ( e ) =>
					dispatch( event_setPoints( parseInt( e.currentTarget.value ) ) ) }/>
		</Grid>
		<Grid item xs={ 12 }>
			<Typography variant='h6'>Farming</Typography>
		</Grid>
		<Grid item xs={ 12 }>
			<TableContainer component={ Paper }>
				<Table className={ classes.table }>
					<TableHead>
						<TableRow>
							<TableCell colSpan={ 2 }/>
							<TableCell>Points/Run</TableCell>
							<TableCell>Oil Cost/Run</TableCell>
							<TableCell>Required Plays</TableCell>
							<TableCell>Total Oil Cost</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ event.farming.map( ( item, index ) => {
							const plays = Math.ceil( remainingPoints ? remainingPoints / item.points : 0 ),
							      oil   = plays * item.oil;
							return <TableRow key={ index }>
								<TableCell>
									<Button
										variant='contained'
										onClick={ () => dispatch( event_addFarming( index ) ) }>
										<AddIcon/>
									</Button>
								</TableCell>
								<TableCell>
									<Button
										variant='contained'
										onClick={ () => dispatch( event_addFarming( index, true ) ) }>
										<RemoveIcon/>
									</Button>
								</TableCell>
								<TableCell>
									<TextField
										type='number'
										value={ item.points }
										onChange={ ( e ) =>
											dispatch( event_modifyFarming( index,
												{ points: parseInt( e.currentTarget.value ) } ) ) }/>
								</TableCell>
								<TableCell>
									<TextField
										type='number'
										value={ item.oil }
										onChange={ ( e ) =>
											dispatch( event_modifyFarming( index,
												{ oil: parseInt( e.currentTarget.value ) } ) ) }/>
								</TableCell>
								<TableCell><Typography>{ plays }</Typography></TableCell>
								<TableCell><Typography>{ isFinite( oil ) ? oil : Infinity }</Typography></TableCell>
							</TableRow>;
						} ) }
						<TableRow>
							<TableCell colSpan={ 6 }>
								<Button
									variant='contained'
									onClick={ () => dispatch( event_addFarming( event.farming.length ) ) }>
									<AddIcon/>
								</Button>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	</Grid>;
}
