import { Box, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';

import { mappedColorClasses, rarityColors } from '../../lib/reference/colors';
import { equips, typeNames } from '../../lib/reference/equipRef';

const useStyles = makeStyles( () => mappedColorClasses );

export default function Filter() {
	const classes = useStyles();
	
	return <>
		<Grid item xs={ 8 }>
			<Autocomplete
				multiple
				options={ [ 'test1', 'test2' ] }
				getOptionLabel={ ( option ) => option }
				freeSolo
				renderInput={ ( params ) => {
					return <TextField
						{ ...params }
						label='Quick Search Ships'
						margin='normal'
						variant='outlined'
						InputProps={ {
							...params.InputProps,
							startAdornment: <><SearchIcon/>{ params.InputProps.startAdornment }</>,
							type:           'search'
						} }
					/>;
				} }/>
		</Grid>
		<Grid item xs={ 4 }>
			<Autocomplete
				options={ Object.values( equips ) }
				getOptionLabel={ ( option ) => option.name }
				renderOption={ ( option ) => <>
					<img
						src={ `/images/equips/${ option.image }` } alt={ option.name }
						height={ 50 }
						className={ classes[ rarityColors[ option.rarity ] ] }/>
					<Box pl={ 1 }><Typography>{ option.name }</Typography></Box>
				</> }
				groupBy={ ( option ) => typeNames[ option.type ] }
				renderInput={ ( params ) => {
					return <TextField
						{ ...params }
						label='Equipment'
						margin='normal'
						variant='outlined'
						InputProps={ {
							...params.InputProps,
							startAdornment: <><SearchIcon/>{ params.InputProps.startAdornment }</>,
							type:           'search'
						} }
					/>;
				} }/>
		</Grid>
	</>;
}
