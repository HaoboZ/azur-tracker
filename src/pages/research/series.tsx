import { Avatar, Grid, InputAdornment, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import Image from 'next/image';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EnhancedDisplay from '../../components/enhancedDisplay';
import FormattedTextField from '../../components/formattedTextField';
import { research_modifyShip } from '../../lib/store/reducers/researchReducer';
import researchData, { devLevels, fateLevels } from './data';

export default function ResearchSeries( { researchShips }: { researchShips: typeof researchData[number]['ships'] } ) {
	const ships = useSelector( ( { research } ) => research.ships );
	const dispatch = useDispatch();
	
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
		<>
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
							<>
								<Avatar variant='rounded' sx={{ width: 60, height: 60 }}>
									<Image src={item.image} alt={item.name}/>
								</Avatar>
								<Typography>{item.name}</Typography>
							</>,
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
							<>
								<ListItemAvatar>
									<Avatar variant='rounded'>
										<Image src={item.image} alt={item.name}/>
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={item.name}
									secondary={`Needs: ${ devPrints + fatePrints } Prints`}
								/>
							</>
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
		</>
	);
}
