import {
	Grid,
	InputAdornment,
	makeStyles,
	Paper,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
	TextField,
	Typography
} from '@material-ui/core';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageTitleReset from '../components/pageTitleReset';
import { devLevels, fateLevels, researchShips } from '../lib/reference/researchRef';

import {
	research_modifyShip,
	research_reset,
	research_setLastTab
} from '../lib/store/reducers/researchReducer';

const useStyles = makeStyles( ( theme ) => ( {
	table:       {
		'& tr:nth-of-type(odd),& th': {
			backgroundColor: theme.palette.type === 'dark'
				                 ? theme.palette.action.hover : theme.palette.action.focus
		}
	},
	numberInput: {
		textAlign:                                                    'right',
		'&[type=number]':                                             {
			'-moz-appearance': 'textfield'
		},
		'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
			'-webkit-appearance': 'none',
			margin:               0
		}
	}
} ) );

export default function Research() {
	const research = useSelector( store => store.research ),
	      dispatch = useDispatch();
	
	const classes = useStyles();
	
	return <Grid container spacing={2}>
		<PageTitleReset name='Research Tracker' reset={research_reset}/>
		<Grid item xs={12}>
			<Tabs
				value={research.lastTab}
				onChange={( e, value ) => {
					dispatch( research_setLastTab( value ) );
				}}>
				{Object.keys( researchShips ).map( ( key ) => <Tab key={key} label={key}/> )}
			</Tabs>
		</Grid>
		{Object.keys( researchShips ).map( ( key, index ) => {
			let totalPRDev = 0, totalPRFate = 0, totalDR = 0;
			return <TableContainer key={key} component={Paper} hidden={index !== research.lastTab}>
				<Table size='small'>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Dev Level</TableCell>
							<TableCell>Dev Stage</TableCell>
							<TableCell>Required Prints</TableCell>
							<TableCell>Fate Level</TableCell>
							<TableCell>Fate Stage</TableCell>
							<TableCell>Required Prints</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{researchShips[ key ].map( ( item, index ) => {
							const ship = research.ships[ item[ 0 ] ] || {} as any;
							const devLevel  = devLevels[ ship.devLevel || 0 ],
							      fateLevel = fateLevels[ ship.fateLevel || 0 ];
							const devPrints  = Math.max( Math.floor(
								devLevels[ 30 ][ item[ 1 ] * 2 + 1 ]
								- devLevel[ item[ 1 ] * 2 + 1 ] - ( ship.devStage || 0 ) / 10 ),
								0 ),
							      fatePrints = Math.max( Math.floor(
								      fateLevels[ 5 ][ 1 ]
								      - fateLevel[ 1 ] - Math.ceil( fateLevel[ 0 ] * ( ship.fateStage || 0 ) / 100 ) ),
								      0 );
							if ( item[ 1 ] ) {
								totalDR += devPrints;
							} else {
								totalPRDev += devPrints;
								if ( item[ 2 ] ) totalPRFate += fatePrints;
							}
							
							return <TableRow key={index}>
								<TableCell className='text-center'>
									<Image
										src={`/images/ships/${item[ 3 ]}.png`}
										alt={item[ 0 ]}
										height={60}
										width={60}
									/>
									<Typography>{item[ 0 ]}</Typography>
								</TableCell>
								<TableCell>
									<TextField
										type='number'
										value={ship.devLevel || 0}
										onChange={( e ) =>
											dispatch( research_modifyShip( item[ 0 ],
												{ devLevel: parseInt( e.target.value ) } ) )}
									/>
								</TableCell>
								<TableCell>
									<TextField
										type='number'
										InputProps={{
											endAdornment:
												<InputAdornment position='end'>
													/{devLevel[ item[ 1 ] * 2 ] * 10}
												</InputAdornment>
										}}
										inputProps={{ className: classes.numberInput }}
										value={ship.devStage || 0}
										onChange={( e ) =>
											dispatch( research_modifyShip( item[ 0 ],
												{ devStage: parseInt( e.target.value ) },
												devLevel[ item[ 1 ] * 2 ] * 10 ) )}
									/>
								</TableCell>
								<TableCell>{devPrints}</TableCell>
								{
									item[ 2 ] && <>
										<TableCell>
											<TextField
												type='number'
												value={ship.fateLevel || 0}
												onChange={( e ) => {
													dispatch( research_modifyShip( item[ 0 ],
														{ fateLevel: parseInt( e.target.value ) } ) );
												}}
											/>
										</TableCell>
										<TableCell>
											<TextField
												type='number'
												InputProps={{
													endAdornment:
														<InputAdornment position='end'>%</InputAdornment>
												}}
												inputProps={{ className: classes.numberInput }}
												value={ship.fateStage || 0}
												onChange={( e ) =>
													dispatch( research_modifyShip( item[ 0 ], { fateStage: parseInt( e.target.value ) } ) )}
											/>
										</TableCell>
										<TableCell>{fatePrints}</TableCell>
									</>
								}
							</TableRow>;
						} )}
						<TableRow>
							<TableCell colSpan={3}>Priority Prints Total</TableCell>
							<TableCell>{totalPRDev}</TableCell>
							<TableCell colSpan={2}/>
							<TableCell>{totalPRFate}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={3}>Decisive Prints Total</TableCell>
							<TableCell>{totalDR}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>;
		} )}
	</Grid>;
}
