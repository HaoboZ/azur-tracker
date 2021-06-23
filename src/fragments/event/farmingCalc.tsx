import { Grid, TextField, Typography } from '@material-ui/core';
import { nanoid } from 'nanoid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataDisplay from '../../components/dataDisplay';
import { event_modifyFarming, event_setFarming } from '../../lib/store/reducers/eventReducer';

export default function FarmingCalc( { remainingPoints }: {
	remainingPoints: number
} ) {
	const event = useSelector( state => state.event );
	const dispatch = useDispatch();
	
	return <DataDisplay
		title='Farming'
		data={event.farming}
		tableProps={{
			columnHeader: [
				'Points/Run',
				'Oil Cost/Run',
				'Required Plays',
				'Total Oil Cost'
			],
			columns     : ( item, index ) => {
				const plays = Math.ceil( remainingPoints ? remainingPoints / item.points : 0 ),
				      oil   = plays * item.oil;
				return [
					<TextField
						key='points'
						type='number'
						inputProps={{ inputMode: 'numeric' }}
						value={item.points}
						onChange={( e ) => dispatch( event_modifyFarming( index,
							{ points: parseInt( e.target.value ) } ) )}
					/>,
					<TextField
						key='oil'
						type='number'
						inputProps={{ inputMode: 'numeric' }}
						value={item.oil}
						onChange={( e ) => dispatch( event_modifyFarming( index,
							{ oil: parseInt( e.target.value ) } ) )}
					/>,
					<Typography key='plays'>{plays}</Typography>,
					<Typography key='cost'>{isFinite( oil ) ? oil : Infinity}</Typography>
				];
			}
		}}
		listProps={{
			renderRow( item, index ) {
				const plays = Math.ceil( remainingPoints ? remainingPoints / item.points : 0 ),
				      oil   = plays * item.oil;
				return <Grid container spacing={2}>
					<Grid item xs>
						<TextField
							type='number'
							inputProps={{ inputMode: 'numeric' }}
							label='Points/Run'
							value={item.points}
							onChange={( e ) => dispatch( event_modifyFarming( index,
								{ points: parseInt( e.target.value ) } ) )}
						/>
					</Grid>
					<Grid item xs>
						<TextField
							type='number'
							inputProps={{ inputMode: 'numeric' }}
							label='Oil/Run'
							value={item.oil}
							onChange={( e ) => dispatch( event_modifyFarming( index,
								{ oil: parseInt( e.target.value ) } ) )}
						/>
					</Grid>
					<Grid item xs={5}>
						<Typography>{plays} Play{plays === 1 ? '' : 's'}</Typography>
						<Typography>{isFinite( oil ) ? oil : Infinity} Oil Cost</Typography>
					</Grid>
				</Grid>;
			}
		}}
		setData={( items ) => dispatch( event_setFarming( items ) )}
		newData={() => ( { id: nanoid( 16 ), points: 0, oil: 0 } )}
		editable
	/>;
}
