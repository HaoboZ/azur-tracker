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
import { ship_reset } from '../lib/store/shipReducer';

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
	const ships    = useTypedSelector( store => store.ship ),
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
							            <Link href={ row.link } target='_blank'>{ value }</Link>
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
					{ field: 'tier', headerName: 'Tier', width: 80 },
					{
						field:      'level',
						headerName: 'Mx Lvl',
						width:      100,
						renderCell: ( { getValue, row } ) => <Box mx='auto'>
							<Select
								value={ 9 }
								onChange={ () => null }>
								<MenuItem value={ 0 }>70</MenuItem>
								<MenuItem value={ 1 }>80</MenuItem>
								<MenuItem value={ 2 }>90</MenuItem>
								<MenuItem value={ 3 }>100</MenuItem>
								<MenuItem value={ 5 }>105</MenuItem>
								<MenuItem value={ 6 }>110</MenuItem>
								<MenuItem value={ 7 }>115</MenuItem>
								<MenuItem value={ 8 }>120</MenuItem>
								<MenuItem value={ 9 }>✰</MenuItem>
							</Select>
						</Box>
					},
					{
						field:         'equip',
						headerName:    'Equips',
						width:         150,
						cellClassName: classes.noPadding
					}
				] }
				density='compact'
				columnBuffer={ 2 }
				columnTypes={ undefined }
				sortModel={ [ { field: 'tier', sort: 'asc' } ] }/>
		</Grid>
	</Grid>;
}
