import { Avatar, Grid, InputAdornment, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataDisplay from '../../components/dataDisplay';
import FormattedTextField from '../../components/formattedTextField';
import { devLevels, fateLevels, researchShips } from '../../lib/reference/researchRef';
import { research_modifyShip } from '../../lib/store/reducers/researchReducer';

export default function ResearchGroup( { researchData }: { researchData: typeof researchShips[string] } ) {
	const research = useSelector( state => state.research );
	const dispatch = useDispatch();
	
	const { shipData, totalPR, totalDR } = React.useMemo( () => {
		let totalPR = 0, totalDR = 0;
		const shipData = researchData.map( ( item ) => {
			const ship = research.ships[ item.name ] || {};
			const devLevel  = devLevels[ ship.devLevel || 0 ],
			      fateLevel = fateLevels[ ship.fateLevel || 0 ];
			const devPrints = Math.max(
				Math.floor( devLevels[ 30 ][ item.type * 2 + 1 ]
					- devLevel[ item.type * 2 + 1 ] - ( ship.devStage || 0 ) / 10 ),
				0 );
			const fatePrints = item.fate ? Math.max(
				Math.floor( fateLevels[ 5 ][ 1 ] - fateLevel[ 1 ]
					- Math.ceil( fateLevel[ 0 ] * ( ship.fateStage || 0 ) / 100 ) ),
				0 ) : 0;
			
			if ( item.type ) {
				totalDR += devPrints;
			} else {
				totalPR += devPrints;
				if ( item.fate ) totalPR += fatePrints;
			}
			return { devLevel, devPrints, fatePrints };
		} );
		return { shipData, totalPR, totalDR };
	}, [ research.ships ] );
	
	return <>
		<DataDisplay
			data={researchData}
			tableProps={{
				columnHeader: [
					'Name',
					'Dev Level',
					'Dev Stage',
					'Required Prints',
					'Fate Level',
					'Fate Stage',
					'Required Prints'
				],
				columns     : ( item, index ) => {
					const ship = research.ships[ item.name ] || {};
					const { devLevel, devPrints, fatePrints } = shipData[ index ];
					return [
						<>
							<Avatar
								src={`/images/ships/${item.url}.png`}
								alt={item.name}
								variant='rounded'
								sx={{ width: 60, height: 60 }}
							/>
							<Typography>{item.name}</Typography>
						</>,
						<FormattedTextField
							key='devLevel'
							type='number'
							inputProps={{ inputMode: 'numeric' }}
							value={ship.devLevel || 0}
							onChange={( e ) => dispatch( research_modifyShip( {
								ship: item.name,
								item: { devLevel: parseInt( e.target.value ) }
							} ) )}
						/>,
						<FormattedTextField
							key='devStage'
							type='number'
							inputProps={{ inputMode: 'numeric', className: 'numberInput' }}
							InputProps={{
								endAdornment: <InputAdornment position='end'>
									/{devLevel[ item.type * 2 ] * 10}
								</InputAdornment>
							}}
							value={ship.devStage || 0}
							onChange={( e ) => dispatch( research_modifyShip( {
								ship  : item.name,
								item  : { devStage: parseInt( e.target.value ) },
								maxDev: devLevel[ item.type * 2 ] * 10
							} ) )}
						/>,
						<Typography key='devPrints'>{devPrints}</Typography>,
						...item.fate ? [
							<FormattedTextField
								key='fateLevel'
								type='number'
								inputProps={{ inputMode: 'numeric' }}
								value={ship.fateLevel || 0}
								onChange={( e ) => dispatch( research_modifyShip( {
									ship: item.name,
									item: { fateLevel: parseInt( e.target.value ) }
								} ) )}
							/>,
							<FormattedTextField
								key='fateStage'
								type='number'
								inputProps={{ inputMode: 'numeric', className: 'numberInput' }}
								InputProps={{
									endAdornment: <InputAdornment position='end'>%</InputAdornment>
								}}
								value={ship.fateStage || 0}
								onChange={( e ) => dispatch( research_modifyShip( {
									ship: item.name,
									item: { fateStage: parseInt( e.target.value ) }
								} ) )}
							/>,
							<Typography key='fatePrints'>{fatePrints}</Typography>
						] : Array( 3 )
					];
				}
			}}
			listProps={{
				renderRow( item, index ) {
					const { devPrints, fatePrints } = shipData[ index ];
					return <>
						<ListItemAvatar>
							<Avatar
								src={`/images/ships/${item.url}.png`}
								alt={item.name}
								variant='rounded'
							/>
						</ListItemAvatar>
						<ListItemText
							primary={item.name}
							secondary={`Needs: ${devPrints + fatePrints} Prints`}
						/>
					</>;
				},
				renderPanel( item, index ) {
					const ship = research.ships[ item.name ] || {};
					const { devLevel } = shipData[ index ];
					return <Grid container spacing={2}>
						<Grid item xs={6}>
							<FormattedTextField
								type='number'
								size='small'
								inputProps={{ inputMode: 'numeric' }}
								InputProps={{
									startAdornment: <InputAdornment position='start'>Dev Level</InputAdornment>
								}}
								value={ship.devLevel || 0}
								onChange={( e ) => dispatch( research_modifyShip( {
									ship: item.name,
									item: { devLevel: parseInt( e.target.value ) }
								} ) )}
							/>
							<FormattedTextField
								type='number'
								size='small'
								inputProps={{
									inputMode: 'numeric',
									className: 'numberInput',
									onFocus  : ( e ) => e.target.select()
								}}
								InputProps={{
									startAdornment: <InputAdornment position='start'>Stage</InputAdornment>,
									endAdornment  : <InputAdornment position='end'>
										/{devLevel[ item.type * 2 ] * 10}
									</InputAdornment>
								}}
								value={ship.devStage || 0}
								onChange={( e ) => dispatch( research_modifyShip( {
									ship  : item.name,
									item  : { devStage: parseInt( e.target.value ) },
									maxDev: devLevel[ item.type * 2 ] * 10
								} ) )}
							/>
						</Grid>
						{item.fate && <Grid item xs={6}>
							<FormattedTextField
								type='number'
								size='small'
								inputProps={{ inputMode: 'numeric' }}
								InputProps={{
									startAdornment: <InputAdornment position='start'>Fate Level</InputAdornment>
								}}
								value={ship.fateLevel || 0}
								onChange={( e ) => dispatch( research_modifyShip( {
									ship: item.name,
									item: { fateLevel: parseInt( e.target.value ) }
								} ) )}
							/>
							<FormattedTextField
								type='number'
								size='small'
								inputProps={{
									inputMode: 'numeric',
									className: 'numberInput',
									onFocus  : ( e ) => e.target.select()
								}}
								InputProps={{
									startAdornment: <InputAdornment position='start'>Stage</InputAdornment>,
									endAdornment  : <InputAdornment position='end'>%</InputAdornment>
								}}
								value={ship.fateStage || 0}
								onChange={( e ) => dispatch( research_modifyShip( {
									ship: item.name,
									item: { fateStage: parseInt( e.target.value ) }
								} ) )}
							/>
						</Grid>}
					</Grid>;
				}
			}}
		/>
		<Typography>Priority Prints Total: {totalPR}</Typography>
		<Typography>Decisive Prints Total: {totalDR}</Typography>
	</>;
}
