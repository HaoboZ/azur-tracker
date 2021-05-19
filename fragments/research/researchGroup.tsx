import {
	Avatar,
	Grid,
	InputAdornment,
	ListItemAvatar,
	ListItemText,
	makeStyles,
	TextField,
	Typography
} from '@material-ui/core';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataDisplay from '../../components/dataDisplay';

import { devLevels, fateLevels, researchShips } from '../../lib/reference/researchRef';
import { research_modifyShip } from '../../lib/store/reducers/researchReducer';

const useStyles = makeStyles( {
	numberInput: {
		textAlign                                                   : 'right',
		'&[type=number]'                                            : {
			'-moz-appearance': 'textfield'
		},
		'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
			'-webkit-appearance': 'none',
			margin              : 0
		}
	},
	avatar     : {
		width : 60,
		height: 60
	}
} );

export default function ResearchGroup( { researchData }: { researchData: typeof researchShips[string] } ) {
	const research = useSelector( store => store.research ),
	      dispatch = useDispatch();
	const classes = useStyles();
	
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
							<Avatar variant='rounded' className={classes.avatar}>
								<Image
									src={`/images/ships/${item.url}.png`}
									alt={item.name}
									layout='fill'
								/>
							</Avatar>
							<Typography>{item.name}</Typography>
						</>,
						<TextField
							key='devLevel'
							type='number'
							inputProps={{ inputMode: 'numeric' }}
							value={ship.devLevel || 0}
							onChange={( e ) => dispatch( research_modifyShip( item.name,
								{ devLevel: parseInt( e.target.value ) } ) )}
						/>,
						<TextField
							key='devStage'
							type='number'
							inputProps={{ inputMode: 'numeric', className: classes.numberInput }}
							InputProps={{
								endAdornment: <InputAdornment position='end'>
									/{devLevel[ item.type * 2 ] * 10}
								</InputAdornment>
							}}
							value={ship.devStage || 0}
							onChange={( e ) => dispatch( research_modifyShip( item.name,
								{ devStage: parseInt( e.target.value ) },
								devLevel[ item.type * 2 ] * 10 ) )}
						/>,
						<Typography key='devPrints'>{devPrints}</Typography>,
						...( item.fate ? [
							<TextField
								key='fateLevel'
								type='number'
								inputProps={{ inputMode: 'numeric' }}
								value={ship.fateLevel || 0}
								onChange={( e ) => dispatch( research_modifyShip( item.name,
									{ fateLevel: parseInt( e.target.value ) } ) )}
							/>,
							<TextField
								key='fateStage'
								type='number'
								inputProps={{ inputMode: 'numeric', className: classes.numberInput }}
								InputProps={{
									endAdornment: <InputAdornment position='end'>%</InputAdornment>
								}}
								value={ship.fateStage || 0}
								onChange={( e ) => dispatch( research_modifyShip( item.name,
									{ fateStage: parseInt( e.target.value ) } ) )}
							/>,
							<Typography key='fatePrints'>{fatePrints}</Typography>
						] : Array( 3 ) )
					];
				}
			}}
			listProps={{
				renderRow( item, index ) {
					const { devPrints, fatePrints } = shipData[ index ];
					return <>
						<ListItemAvatar>
							<Avatar variant='rounded'>
								<Image
									src={`/images/ships/${item.url}.png`}
									alt={item.name}
									layout='fill'
								/>
							</Avatar>
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
							<TextField
								type='number'
								size='small'
								inputProps={{ inputMode: 'numeric' }}
								InputProps={{
									startAdornment: <InputAdornment position='start'>Dev Level</InputAdornment>
								}}
								value={ship.devLevel || 0}
								onChange={( e ) => dispatch( research_modifyShip( item.name,
									{ devLevel: parseInt( e.target.value ) } ) )}
							/>
							<TextField
								type='number'
								size='small'
								inputProps={{
									inputMode: 'numeric',
									className: classes.numberInput,
									onFocus  : ( e ) => e.target.select()
								}}
								InputProps={{
									startAdornment: <InputAdornment position='start'>Stage</InputAdornment>,
									endAdornment  : <InputAdornment position='end'>
										/{devLevel[ item.type * 2 ] * 10}
									</InputAdornment>
								}}
								value={ship.devStage || 0}
								onChange={( e ) => dispatch( research_modifyShip( item.name,
									{ devStage: parseInt( e.target.value ) },
									devLevel[ item.type * 2 ] * 10 ) )}
							/>
						</Grid>
						{item.fate && <Grid item xs={6}>
							<TextField
								type='number'
								size='small'
								inputProps={{ inputMode: 'numeric' }}
								InputProps={{
									startAdornment: <InputAdornment position='start'>Fate Level</InputAdornment>
								}}
								value={ship.fateLevel || 0}
								onChange={( e ) => dispatch( research_modifyShip( item.name,
									{ fateLevel: parseInt( e.target.value ) } ) )}
							/>
							<TextField
								type='number'
								size='small'
								inputProps={{
									inputMode: 'numeric',
									className: classes.numberInput,
									onFocus  : ( e ) => e.target.select()
								}}
								InputProps={{
									startAdornment: <InputAdornment position='start'>Stage</InputAdornment>,
									endAdornment  : <InputAdornment position='end'>%</InputAdornment>
								}}
								value={ship.fateStage || 0}
								onChange={( e ) => dispatch( research_modifyShip( item.name,
									{ fateStage: parseInt( e.target.value ) } ) )}
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
