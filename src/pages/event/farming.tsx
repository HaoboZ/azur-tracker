import { Autocomplete, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import EnhancedDisplay from '../../components/enhancedDisplay';
import FormattedTextField from '../../components/formattedTextField';
import { event_modifyFarming, event_setFarming } from '../../lib/store/reducers/eventReducer';
import eventData from './data';

export default function EventFarming( { remainingPoints }: { remainingPoints: number } ) {
	const farming = useSelector( ( { event } ) => event.farming );
	const dispatch = useDispatch();
	
	return <EnhancedDisplay
		title='Farming'
		items={farming}
		extraData={remainingPoints}
		setItems={( items ) => dispatch( event_setFarming( items ) )}
		editable={{
			newData: () => ( { id: nanoid(), points: 0, oil: 0 } )
		}}
		sortable
		tableProps={{
			headers: [
				'Points/Run',
				'Oil Cost/Run',
				'Required Plays',
				'Total Oil Cost'
			],
			columns: ( item, index ) => {
				const plays = Math.ceil( remainingPoints ? remainingPoints / item.points : 0 ),
				      oil   = plays * item.oil;
				return [
					<Autocomplete
						key='points'
						id={!index ? 'farmPoints' : undefined}
						freeSolo
						autoSelect
						value={item.points.toString()}
						onChange={( e, value ) => dispatch( event_modifyFarming( {
							id    : item.id,
							points: parseInt( value )
						} ) )}
						options={Object.keys( eventData.stages ).reverse()}
						renderOption={( props, option ) => <MenuItem {...props}>{eventData.stages[ option ]}</MenuItem>}
						renderInput={( params ) => <TextField
							{...params}
							type='number'
							inputProps={{ ...params.inputProps, inputMode: 'numeric' }}
						/>}
					/>,
					<FormattedTextField
						key='oil'
						id={!index ? 'farmCost' : undefined}
						type='number'
						inputProps={{ inputMode: 'numeric' }}
						value={item.oil}
						onChange={( { target } ) => dispatch( event_modifyFarming( {
							id : item.id,
							oil: parseInt( target.value )
						} ) )}
					/>,
					<Typography key='plays' id={!index ? 'farmPlays' : undefined}>
						{plays}
					</Typography>,
					<Typography key='cost' id={!index ? 'farmOil' : undefined}>
						{isFinite( oil ) ? oil : Infinity}
					</Typography>
				];
			}
		}}
		listProps={{
			renderRow: ( item, index ) => {
				const plays = Math.ceil( remainingPoints ? remainingPoints / item.points : 0 ),
				      oil   = plays * item.oil;
				return <Grid container spacing={2}>
					<Grid item xs>
						<Autocomplete
							key='points'
							id={!index ? 'farmPoints' : undefined}
							freeSolo
							autoSelect
							value={item.points.toString()}
							onChange={( e, value ) => dispatch( event_modifyFarming( {
								id    : item.id,
								points: parseInt( value )
							} ) )}
							options={Object.keys( eventData.stages )}
							renderOption={( props, option ) => <MenuItem {...props}>{eventData.stages[ option ]}</MenuItem>}
							renderInput={( params ) => <TextField
								{...params}
								type='number'
								inputProps={{ ...params.inputProps, inputMode: 'numeric' }}
								label='Points/Run'
							/>}
						/>
					</Grid>
					<Grid item xs>
						<FormattedTextField
							id={!index ? 'farmCost' : undefined}
							type='number'
							inputProps={{ inputMode: 'numeric' }}
							label='Oil/Run'
							value={item.oil}
							onChange={( { target } ) => dispatch( event_modifyFarming( {
								id : item.id,
								oil: parseInt( target.value )
							} ) )}
						/>
					</Grid>
					<Grid item xs={5}>
						<Typography id={!index ? 'farmPlays' : undefined}>
							{plays} Play{plays === 1 ? '' : 's'}
						</Typography>
						<Typography id={!index ? 'farmOil' : undefined}>
							{isFinite( oil ) ? oil : Infinity} Oil Cost
						</Typography>
					</Grid>
				</Grid>;
			}
		}}
	/>;
}
