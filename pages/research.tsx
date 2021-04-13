import {
	Grid,
	InputAdornment,
	makeStyles,
	Tab,
	TableCell,
	TableRow,
	Tabs,
	TextField,
	Typography
} from '@material-ui/core';
import _ from 'lodash';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EnhancedTable from '../components/enhancedTable';
import PageTitle from '../components/pageTitle';
import { devLevels, fateLevels, researchShips } from '../lib/reference/researchRef';

import { research_modifyShip, research_reset, research_setLastTab } from '../lib/store/reducers/researchReducer';

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
		<Grid item xs={12}>
			<PageTitle title='Research Tracker' actions={[ {
				name:    'Reset',
				onClick: () => dispatch( research_reset() )
			} ]}/>
		</Grid>
		<Grid item xs={12}>
			<Tabs
				value={research.lastTab}
				onChange={( e, value ) => {
					dispatch( research_setLastTab( value ) );
				}}>
				{_.map( researchShips, ( _, key ) => <Tab key={key} label={key}/> )}
			</Tabs>
		</Grid>
		{Object.keys( researchShips ).map( ( key, index ) => {
			let totalPRDev = 0, totalPRFate = 0, totalDR = 0;
			return <EnhancedTable
				key={key}
				hidden={index !== research.lastTab}
				data={researchShips[ key ]}
				columnHeader={[
					'Name',
					'Dev Level',
					'Dev Stage',
					'Required Prints',
					'Fate Level',
					'Fate Stage',
					'Required Prints'
				]}
				columns={( item ) => {
					const ship = research.ships[ item.name ] || {} as any;
					const devLevel  = devLevels[ ship.devLevel || 0 ],
					      fateLevel = fateLevels[ ship.fateLevel || 0 ];
					const devPrints  = Math.max( Math.floor(
						devLevels[ 30 ][ item.type * 2 + 1 ]
						- devLevel[ item.type * 2 + 1 ] - ( ship.devStage || 0 ) / 10 ),
						0 ),
					      fatePrints = Math.max( Math.floor(
						      fateLevels[ 5 ][ 1 ]
						      - fateLevel[ 1 ] - Math.ceil( fateLevel[ 0 ] * ( ship.fateStage || 0 ) / 100 ) ),
						      0 );
					if ( item.type ) {
						totalDR += devPrints;
					} else {
						totalPRDev += devPrints;
						if ( item.fate ) totalPRFate += fatePrints;
					}
					return [
						<>
							<Image
								src={`/images/ships/${item.url}.png`}
								alt={item.name}
								height={60}
								width={60}
							/>
							<Typography>{item.name}</Typography>
						</>,
						<TextField
							type='number'
							value={ship.devLevel || 0}
							onChange={( e ) =>
								dispatch( research_modifyShip( item.name,
									{ devLevel: parseInt( e.target.value ) } ) )}
						/>,
						<TextField
							type='number'
							InputProps={{
								endAdornment:
									<InputAdornment position='end'>
										/{devLevel[ item.type * 2 ] * 10}
									</InputAdornment>
							}}
							inputProps={{ className: classes.numberInput }}
							value={ship.devStage || 0}
							onChange={( e ) =>
								dispatch( research_modifyShip( item.name,
									{ devStage: parseInt( e.target.value ) },
									devLevel[ item.type * 2 ] * 10 ) )}
						/>,
						devPrints,
						...( item.fate ? [ <TextField
							type='number'
							value={ship.fateLevel || 0}
							onChange={( e ) => {
								dispatch( research_modifyShip( item.name,
									{ fateLevel: parseInt( e.target.value ) } ) );
							}}
						/>,
							<TextField
								type='number'
								InputProps={{
									endAdornment:
										<InputAdornment position='end'>%</InputAdornment>
								}}
								inputProps={{ className: classes.numberInput }}
								value={ship.fateStage || 0}
								onChange={( e ) =>
									dispatch( research_modifyShip( item.name, { fateStage: parseInt( e.target.value ) } ) )}
							/>,
							fatePrints
						] : Array( 3 ) )
					];
				}}
				footer={<>
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
				</>}
			/>;
		} )}
	</Grid>;
}
