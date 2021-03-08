import { Box, makeStyles, TextField, Typography } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import Image from 'next/image';
import React from 'react';

import { rarityColors } from '../../lib/reference/colors';
import { equips, typeNames } from '../../lib/reference/equipRef';

const useStyles = makeStyles( () => ( {
	autoComplete: { paddingRight: 10 },
	popper:       { width: '300px !important' }
} ) );

export default function EquipFilter( { equipList, colors, value, setValue }: {
	equipList: typeof equips
	colors: Record<string, string>
	value: typeof equips[number]
	setValue: ( value: typeof equips[number] ) => void
} ) {
	const classes = useStyles();
	
	return <Autocomplete
		options={ equipList }
		className={ classes.autoComplete }
		getOptionLabel={ ( option ) => option.name }
		fullWidth
		classes={ { popper: classes.popper } }
		value={ value }
		onChange={ ( e, newValue ) =>
			setValue( newValue as any || equips[ 0 ] ) }
		renderOption={ ( option ) => <>
			<div>
				<Image
					src={ `/images/equips/${ option.image }` }
					alt={ option.name }
					layout='fixed'
					height={ 50 }
					width={ 50 }
					className={ colors[ rarityColors[ option.rarity ] ] }/>
			</div>
			<Typography component={ Box } pl={ 1 }>{ option.name }</Typography>
		</> }
		groupBy={ ( option ) => typeNames[ option.type ] }
		renderInput={ ( params ) => {
			return <TextField
				{ ...params }
				margin='normal'
				placeholder='Equipment'
				InputProps={ {
					...params.InputProps,
					startAdornment: <><SearchIcon/>{ params.InputProps.startAdornment }</>,
					type:           'search'
				} }
			/>;
		} }/>;
}
