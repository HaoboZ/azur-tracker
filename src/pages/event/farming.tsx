import { Autocomplete, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import EnhancedDisplay from '../../components/enhancedDisplay';
import FormattedTextField from '../../components/formattedTextField';
import { useData } from '../../providers/data';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { event_modifyFarming, event_setFarming } from '../../store/reducers/eventReducer';
import { EventType } from './type';

export default function EventFarming( { remainingPoints }: { remainingPoints: number } ) {
	const farming = useAppSelector( ( { event } ) => event.farming );
	const dispatch = useAppDispatch();
	const { eventStagesData } = useData<EventType>();
	
	return (
		<EnhancedDisplay
			sortable
			title='Farming'
			items={farming}
			extraData={remainingPoints}
			setItems={( items ) => dispatch( event_setFarming( items ) )}
			editable={{
				newData: () => ( { id: nanoid(), points: 0, oil: 0 } )
			}}
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
							freeSolo
							autoSelect
							id={!index ? 'farmPoints' : undefined}
							value={item.points.toString()}
							options={Object.keys( eventStagesData ).reverse()}
							renderOption={( props, option ) =>
								<MenuItem {...props}>{eventStagesData[ option ]}</MenuItem>}
							renderInput={( params ) => (
								<TextField
									{...params}
									type='number'
									inputProps={{ ...params.inputProps, inputMode: 'numeric' }}
								/>
							)}
							onChange={( e, value ) => dispatch( event_modifyFarming( {
								id    : item.id,
								points: parseInt( value )
							} ) )}
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
					return (
						<Grid container spacing={2}>
							<Grid item xs>
								<Autocomplete
									key='points'
									freeSolo
									autoSelect
									id={!index ? 'farmPoints' : undefined}
									value={item.points.toString()}
									options={Object.keys( eventStagesData )}
									renderOption={( props, option ) =>
										<MenuItem {...props}>{eventStagesData[ option ]}</MenuItem>}
									renderInput={( params ) => (
										<TextField
											{...params}
											type='number'
											inputProps={{ ...params.inputProps, inputMode: 'numeric' }}
											label='Points/Run'
										/>
									)}
									onChange={( e, value ) => dispatch( event_modifyFarming( {
										id    : item.id,
										points: parseInt( value )
									} ) )}
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
						</Grid>
					);
				}
			}}
		/>
	);
}
