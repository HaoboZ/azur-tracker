import {
	Box,
	Button,
	Grid,
	Link,
	makeStyles,
	MenuItem,
	Select,
	Typography
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React from 'react';
import { useDispatch } from 'react-redux';

import shipRef, { mappedColors } from '../lib/reference/shipRef';
import { useTypedSelector } from '../lib/store';
import { ship_reset, ship_setShip } from '../lib/store/shipReducer';

const useStyles = makeStyles( () => ( {
	noPadding:     { padding: 0 },
	rainbow:       {
		background: 'linear-gradient(120deg, lightgoldenrodyellow, aquamarine, lightblue, plum)',
		color:      'black'
	},
	palegoldenrod: { backgroundColor: 'palegoldenrod', color: 'black' },
	plum:          { backgroundColor: 'plum', color: 'black' },
	lightblue:     { backgroundColor: 'lightblue', color: 'black' },
	lightgray:     { backgroundColor: 'lightgray', color: 'black' },
	wheat:         { backgroundColor: 'wheat', color: 'black' },
	darksalmon:    { backgroundColor: 'darksalmon', color: 'black' },
	lightpink:     { backgroundColor: 'lightpink', color: 'black' },
	lightgreen:    { backgroundColor: 'lightgreen', color: 'black' },
	paleturquoise: { backgroundColor: 'paleturquoise', color: 'black' },
	royalblue:     { backgroundColor: 'royalblue', color: 'black' },
	lavenderblush: { backgroundColor: 'lavenderblush', color: 'black' },
	whitesmoke:    { backgroundColor: 'whitesmoke', color: 'black' },
	goldenrod:     { backgroundColor: 'goldenrod', color: 'black' },
	indianred:     { backgroundColor: 'indianred', color: 'black' },
	mediumpurple:  { backgroundColor: 'mediumpurple', color: 'black' },
	pink:          { backgroundColor: 'pink', color: 'black' },
	thistle:       { backgroundColor: 'thistle', color: 'black' },
	dimgray:       { backgroundColor: 'dimgray', color: 'white' }
} ) );

export default function Ship() {
	const ship     = useTypedSelector( store => store.ship ),
	      dispatch = useDispatch();
	
	const classes = useStyles();
	
	return <Grid container spacing={ 2 } style={ { height: '100%' } }>
		<style global jsx>{ `
	      html, body, #__next {
	        height: 100%;
	      }
	      
	      #__next > .MuiContainer-root {
	         height: 90%;
	      }
	      
	      .MuiDataGrid-root .MuiDataGrid-cell {
	         padding: 0 8px !important;
	      }
    ` }</style>
		<Grid item xs={ 12 } container component={ Box } justifyContent='space-between'>
			<Typography variant='h5'>
				Ship Tracker
			</Typography>
			<Button
				variant='contained' color='secondary'
				onClick={ () => dispatch( ship_reset() ) }>Reset</Button>
		</Grid>
		<Grid item xs={ 12 } component={ Box } height='100%'>
			<DataGrid
				rows={ shipRef }
				columns={ [
					{
						field:      'name',
						headerName: 'Name',
						width:      150,
						renderCell: ( { value, row } ) =>
							            <Link
								            href={ row.link } target='_blank' color='textPrimary'>
								            <Box overflow='hidden'>
									            { value }
								            </Box>
							            </Link>
					},
					{
						field:         'rarity',
						headerName:    'Rarity',
						width:         110,
						cellClassName: ( { value } ) => classes[ mappedColors[ value as string ] ]
					},
					{
						field:         'nation',
						headerName:    'Nation',
						width:         150,
						cellClassName: ( { value } ) => classes[ mappedColors[ value as string ] ]
					},
					{
						field:         'type',
						headerName:    'Type',
						width:         150,
						cellClassName: ( { value } ) => classes[ mappedColors[ value as string ] ]
					},
					{
						field:          'tier',
						type:           'number',
						headerName:     'Tier',
						description:    'From ENCTL',
						width:          80,
						hideSortIcons:  true,
						valueFormatter: ( { value } ) => value === 3 ? 'N' : value
					},
					{
						field:         'love',
						type:          'number',
						headerName:    'Love',
						description:   '♡ (1) for 100 affinity, 💍 for married, 💍♡ for 200 affinity',
						width:         90,
						align:         'center',
						hideSortIcons: true,
						valueGetter:   ( { row } ) => {
							let _ship = ship.ships[ row.id ];
							return ( _ship && _ship.love ) || 0;
						},
						renderCell:    ( { field, getValue, row } ) => {
							const val = getValue( field ) as number;
							return <Select
								fullWidth
								value={ val }
								onChange={ ( e ) =>
									dispatch( ship_setShip( row.id as string, { love: e.target.value as number } ) ) }>
								<MenuItem value={ 0 }>-</MenuItem>
								<MenuItem value={ 1 }>♡</MenuItem>
								<MenuItem value={ 2 }>💍</MenuItem>
								<MenuItem value={ 3 }>💍♡</MenuItem>
							</Select>;
						}
					},
					{
						field:         'level',
						type:          'number',
						headerName:    'MxLvl',
						description:   'Maximum level that is possible, ✰ for lvl 120 (121)',
						width:         90,
						align:         'center',
						hideSortIcons: true,
						valueGetter:   ( { row } ) => {
							let _ship = ship.ships[ row.id ];
							return ( _ship && _ship.lvl ) || 70;
						},
						renderCell:    ( { field, getValue, row } ) => {
							const val = getValue( field ) as number;
							return <Select
								fullWidth
								value={ val }
								onChange={ ( e ) =>
									dispatch( ship_setShip( row.id as string, { lvl: e.target.value as number } ) ) }>
								<MenuItem value={ 70 }>70</MenuItem>
								<MenuItem value={ 80 }>80</MenuItem>
								<MenuItem value={ 90 }>90</MenuItem>
								<MenuItem value={ 100 }>100</MenuItem>
								<MenuItem value={ 105 }>105</MenuItem>
								<MenuItem value={ 110 }>110</MenuItem>
								<MenuItem value={ 115 }>115</MenuItem>
								<MenuItem value={ 120 }>120</MenuItem>
								<MenuItem value={ 121 }>✰</MenuItem>
							</Select>;
						}
					}
					// {
					// 	field:         'equip',
					// 	headerName:    'Equips',
					// 	width:         150,
					// 	cellClassName: classes.noPadding,
					// 	valueGetter:   () => 'test'
					// }
				] }
				density='compact'
				columnBuffer={ 2 }
				// onCellClick={ ( { field, row } ) => {
				// 	if ( field === 'equip' ) {
				// 		console.log( row );
				// 	}
				// } }
				sortModel={ [ { field: 'tier', sort: 'asc' } ] }/>
		</Grid>
	</Grid>;
}
