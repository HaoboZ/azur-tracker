import { Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { event_modifyFarming, event_setFarming } from '../../lib/store/reducers/eventReducer';
import EnhancedTable from '../enhancedTable';

const useStyles = makeStyles( {
	numberInput: {
		'&[type=number]':                                             {
			'-moz-appearance': 'textfield'
		},
		'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
			'-webkit-appearance': 'none',
			margin:               0
		}
	}
} );

export default function FarmingTable( { remainingPoints }: {
	remainingPoints: number
} ) {
	const event    = useSelector( store => store.event ),
	      dispatch = useDispatch();
	const classes = useStyles();
	
	return <>
		<Grid item xs={12}>
			<Typography variant='h6'>Farming</Typography>
		</Grid>
		<Grid item xs={12}>
			<EnhancedTable
				data={event.farming}
				columnHeader={[
					'Points/Run',
					'Oil Cost/Run',
					'Required Plays',
					'Total Oil Cost'
				]}
				columns={( item, index ) => {
					const plays = Math.ceil( remainingPoints ? remainingPoints / item.points : 0 ),
					      oil   = plays * item.oil;
					return [ <TextField
						type='number'
						inputProps={{ className: classes.numberInput }}
						value={item.points}
						onChange={( e ) =>
							dispatch( event_modifyFarming( index,
								{ points: parseInt( e.target.value ) } ) )}
					/>,
						<TextField
							type='number'
							inputProps={{ className: classes.numberInput }}
							value={item.oil}
							onChange={( e ) =>
								dispatch( event_modifyFarming( index,
									{ oil: parseInt( e.target.value ) } ) )}
						/>,
						plays,
						isFinite( oil ) ? oil : Infinity
					];
				}}
				setData={( items ) => dispatch( event_setFarming( items ) )}
				newData={() => ( { points: 0, oil: 0 } )}
				sortable
				editable
			/>
		</Grid>
	</>;
}
