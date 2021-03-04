import { Box, Grid, Link, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React from 'react';
import { useDispatch } from 'react-redux';

import Filter from '../components/armada/filter';
import PageTitleReset from '../components/pageTitleReset';
import {
	mappedColorClasses,
	nationColors,
	rarityColors,
	typeColors
} from '../lib/reference/colors';
import shipRef from '../lib/reference/shipRef';
import { useTypedSelector } from '../lib/store';
import { ship_reset, ship_setShip } from '../lib/store/shipReducer';

const useStyles = makeStyles( () => ( {
	noPadding: { padding: 0 },
	...mappedColorClasses
} ) );

export default function Armada() {
	const ship     = useTypedSelector( store => store.ship ),
	      dispatch = useDispatch();
	
	const classes = useStyles();
	
	return <Grid container spacing={ 2 } component={ Box } height='100%'>
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
		<PageTitleReset name='Armada Tracker' reset={ ship_reset }/>
		<Filter/>
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
						cellClassName: ( { value } ) => classes[ rarityColors[ value as string ] ]
					},
					{
						field:         'nation',
						headerName:    'Nation',
						width:         130,
						cellClassName: ( { value } ) => classes[ nationColors[ value as string ] ]
					},
					{
						field:         'type',
						headerName:    'Type',
						width:         130,
						cellClassName: ( { value } ) => classes[ typeColors[ value as string ] ]
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
						description:   '♥ (1) for 100 affinity, 💍 (2) for married, 💍♥ (3) for 200 affinity',
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
								<MenuItem value={ 0 }>♡</MenuItem>
								<MenuItem value={ 1 }>♥</MenuItem>
								<MenuItem value={ 2 }>💍</MenuItem>
								<MenuItem value={ 3 }>💍♥</MenuItem>
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
								<MenuItem value={ 121 }>★</MenuItem>
							</Select>;
						}
					},
					{
						field:         'equip',
						headerName:    'Equips',
						width:         110,
						cellClassName: classes.noPadding,
						renderCell:    ( { row } ) => <Typography variant='h6'>★✮☆✦✧⊝</Typography>
					}
				] }
				density='compact'
				columnBuffer={ 2 }
				onCellClick={ ( { field, row } ) => {
					if ( field === 'equip' ) {
						console.log( row );
					}
				} }
				sortModel={ [ { field: 'tier', sort: 'asc' } ] }
				sortingOrder={ undefined }
				columnTypes={ undefined }
				headerHeight={ undefined }
				localeText={ undefined }
				rowHeight={ undefined }/>
		</Grid>
	</Grid>;
}
