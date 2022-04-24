import { Avatar, Grid, InputAdornment, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { Fragment, useMemo } from 'react';
import EnhancedDisplay from '../../components/enhancedDisplay';
import FormattedTextField from '../../components/formattedTextField';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { research_modifyShip } from '../../store/reducers/researchReducer';
import { ResearchShipsType } from './type';

const devLevels = [
	[ 2, 0, 3, 0 ],
	[ 2, 2, 3, 3 ],
	[ 2, 4, 3, 6 ],
	[ 2, 6, 3, 9 ],
	[ 5, 8, 8, 12 ],
	[ 4, 13, 6, 20 ],
	[ 4, 17, 6, 26 ],
	[ 4, 21, 6, 32 ],
	[ 4, 25, 6, 38 ],
	[ 8, 29, 12, 44 ],
	[ 6, 37, 9, 56 ],
	[ 6, 43, 9, 65 ],
	[ 6, 49, 9, 74 ],
	[ 6, 55, 9, 83 ],
	[ 12, 61, 18, 92 ],
	[ 10, 73, 15, 110 ],
	[ 10, 83, 15, 125 ],
	[ 10, 93, 15, 140 ],
	[ 10, 103, 15, 155 ],
	[ 20, 113, 30, 170 ],
	[ 15, 133, 22, 200 ],
	[ 15, 148, 22, 222 ],
	[ 15, 163, 22, 244 ],
	[ 15, 178, 22, 266 ],
	[ 30, 193, 45, 288 ],
	[ 20, 223, 30, 333 ],
	[ 20, 243, 30, 363 ],
	[ 20, 263, 30, 393 ],
	[ 20, 283, 30, 423 ],
	[ 40, 303, 60, 453 ],
	[ 0, 343, 0, 513 ]
];

const fateLevels = [
	[ 10, 0, 20, 0 ],
	[ 20, 10, 30, 20 ],
	[ 30, 30, 40, 50 ],
	[ 40, 60, 50, 90 ],
	[ 65, 100, 75, 140 ],
	[ 0, 165, 0, 215 ]
];

export default function ResearchSeries( { researchShips }: { researchShips: ResearchShipsType } ) {
	const ships = useAppSelector( ( { research } ) => research.ships );
	const dispatch = useAppDispatch();
	
	const { shipData, totalPR, totalDR } = useMemo( () => {
		let totalPR = 0, totalDR = 0;
		const shipData = researchShips.map( ( item ) => {
			const ship = ships[ item.name ] || {};
			const devLevel  = devLevels[ ship.devLevel || 0 ],
			      fateLevel = fateLevels[ ship.fateLevel || 0 ];
			const devPrints = Math.max( 0,
				Math.floor( devLevels[ 30 ][ item.type * 2 + 1 ]
					- devLevel[ item.type * 2 + 1 ] - ( ship.devStage || 0 ) / 10 ) );
			const fatePrints = !item.fate ? 0 : Math.max( 0,
				Math.floor( fateLevels[ 5 ][ 1 ] - fateLevel[ 1 ]
					- Math.ceil( fateLevel[ 0 ] * ( ship.fateStage || 0 ) / 100 ) ) );
			
			if ( item.type ) {
				totalDR += devPrints;
				if ( item.fate ) totalDR += fatePrints;
			} else {
				totalPR += devPrints;
				if ( item.fate ) totalPR += fatePrints;
			}
			return { devLevel, devPrints, fatePrints };
		} );
		return { shipData, totalPR, totalDR };
	}, [ ships ] );
	
	return (
		<Fragment>
			<EnhancedDisplay
				items={researchShips}
				extraData={ships}
				tableProps={{
					headers: [
						'Name',
						'Dev Level',
						'Dev Stage',
						'Required Prints',
						'Fate Level',
						'Fate Stage',
						'Required Prints'
					],
					columns: ( item, index ) => {
						const ship = ships[ item.name ] || {};
						const { devLevel, devPrints, fatePrints } = shipData[ index ];
						return [
							<Fragment key='ship'>
								<Avatar variant='rounded' src={item.image} sx={{ width: 60, height: 60 }}/>
								<Typography>{item.name}</Typography>
							</Fragment>,
							<FormattedTextField
								key='devLevel'
								type='number'
								inputProps={{ inputMode: 'numeric' }}
								value={ship.devLevel || 0}
								onChange={( { target } ) => dispatch( research_modifyShip( {
									ship: item.name,
									item: { devLevel: parseInt( target.value ) }
								} ) )}
							/>,
							<FormattedTextField
								key='devStage'
								type='number'
								inputMode='numeric'
								className='numberInput'
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											/{devLevel[ item.type * 2 ] * 10}
										</InputAdornment>
									)
								}}
								value={ship.devStage || 0}
								onChange={( { target } ) => dispatch( research_modifyShip( {
									ship  : item.name,
									item  : { devStage: parseInt( target.value ) },
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
									onChange={( { target } ) => dispatch( research_modifyShip( {
										ship: item.name,
										item: { fateLevel: parseInt( target.value ) }
									} ) )}
								/>,
								<FormattedTextField
									key='fateStage'
									type='number'
									inputMode='numeric'
									className='numberInput'
									InputProps={{
										endAdornment: <InputAdornment position='end'>%</InputAdornment>
									}}
									value={ship.fateStage || 0}
									onChange={( { target } ) => dispatch( research_modifyShip( {
										ship: item.name,
										item: { fateStage: parseInt( target.value ) }
									} ) )}
								/>,
								<Typography key='fatePrints'>{fatePrints}</Typography>
							] : Array( 3 )
						];
					}
				}}
				listProps={{
					renderRow: ( item, index ) => {
						const { devPrints, fatePrints } = shipData[ index ];
						return (
							<Fragment>
								<ListItemAvatar>
									<Avatar variant='rounded' src={item.image} sx={{ width: 60, height: 60, mr: 1 }}/>
								</ListItemAvatar>
								<ListItemText
									primary={item.name}
									secondary={`Needs: ${devPrints + fatePrints} Prints`}
								/>
							</Fragment>
						);
					},
					renderPanel( item, index ) {
						const ship = ships[ item.name ] || {};
						const { devLevel } = shipData[ index ];
						return (
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<FormattedTextField
										type='number'
										size='small'
										inputProps={{ inputMode: 'numeric' }}
										InputProps={{
											startAdornment: <InputAdornment position='start'>Dev Level</InputAdornment>
										}}
										value={ship.devLevel || 0}
										onChange={( { target } ) => dispatch( research_modifyShip( {
											ship: item.name,
											item: { devLevel: parseInt( target.value ) }
										} ) )}
									/>
									<FormattedTextField
										type='number'
										size='small'
										inputMode='numeric'
										className='numberInput'
										InputProps={{
											startAdornment: <InputAdornment position='start'>Stage</InputAdornment>,
											endAdornment  : (
												<InputAdornment position='end'>
													/{devLevel[ item.type * 2 ] * 10}
												</InputAdornment>
											)
										}}
										value={ship.devStage || 0}
										onChange={( { target } ) => dispatch( research_modifyShip( {
											ship  : item.name,
											item  : { devStage: parseInt( target.value ) },
											maxDev: devLevel[ item.type * 2 ] * 10
										} ) )}
										onFocus={( { target } ) => target.select()}
									/>
								</Grid>
								{item.fate && (
									<Grid item xs={6}>
										<FormattedTextField
											type='number'
											size='small'
											inputProps={{ inputMode: 'numeric' }}
											InputProps={{
												startAdornment: <InputAdornment position='start'>Fate Level</InputAdornment>
											}}
											value={ship.fateLevel || 0}
											onChange={( { target } ) => dispatch( research_modifyShip( {
												ship: item.name,
												item: { fateLevel: parseInt( target.value ) }
											} ) )}
										/>
										<FormattedTextField
											type='number'
											size='small'
											inputMode='numeric'
											className='numberInput'
											InputProps={{
												startAdornment: <InputAdornment position='start'>Stage</InputAdornment>,
												endAdornment  : <InputAdornment position='end'>%</InputAdornment>
											}}
											value={ship.fateStage || 0}
											onChange={( { target } ) => dispatch( research_modifyShip( {
												ship: item.name,
												item: { fateStage: parseInt( target.value ) }
											} ) )}
											onFocus={( { target } ) => target.select()}
										/>
									</Grid>
								)}
							</Grid>
						);
					}
				}}
			/>
			<Typography>Priority Prints Total: {totalPR}</Typography>
			<Typography>Decisive Prints Total: {totalDR}</Typography>
		</Fragment>
	);
}
