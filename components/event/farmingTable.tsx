import {
	Button,
	Grid,
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
import React from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../lib/store';
import { event_addFarming, event_modifyFarming } from '../../lib/store/eventReducer';

const useStyles = makeStyles( ( theme ) => ( {
	numberInput: {
		'&[type=number]':                                             {
			'-moz-appearance': 'textfield'
		},
		'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
			'-webkit-appearance': 'none',
			margin:               0
		}
	},
	table:       {
		'& tr:nth-of-type(odd),& th': {
			backgroundColor: theme.palette.type === 'dark'
				                 ? theme.palette.action.hover : theme.palette.action.focus
		}
	}
} ) );

export default function FarmingTable({remainingPoints}) {
	const event    = useTypedSelector( store => store.event ),
	      dispatch = useDispatch();
	
	const classes = useStyles();
	
	return <>
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
										inputProps={ { className: classes.numberInput } }
										value={ item.points }
										onChange={ ( e ) =>
											dispatch( event_modifyFarming( index,
												{ points: parseInt( e.target.value ) } ) ) }/>
								</TableCell>
								<TableCell>
									<TextField
										type='number'
										inputProps={ { className: classes.numberInput } }
										value={ item.oil }
										onChange={ ( e ) =>
											dispatch( event_modifyFarming( index,
												{ oil: parseInt( e.target.value ) } ) ) }/>
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
	</>;
}
