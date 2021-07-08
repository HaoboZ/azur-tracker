import { Autocomplete, Box, TextField, Typography } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import Image from 'next/image';
import React from 'react';

import { rarityColors, useMappedColorClasses } from '../../lib/reference/colors';
import { equips, typeNames } from '../../lib/reference/equipRef';

const useStyles = makeStyles( {
	popper: { width: '350px !important' }
} );

export default function EquipFilter( { equipList, value, setValue }: {
	equipList: typeof equips,
	value?: typeof equips[number],
	setValue: ( value: typeof equips[number] ) => void
} ) {
	const classes = useStyles();
	const colorClasses = useMappedColorClasses();
	
	return <Autocomplete
		options={equipList}
		getOptionLabel={( option ) => option.name}
		fullWidth
		classes={{ popper: classes.popper }}
		value={value}
		onChange={( e, newValue: typeof equips[number] ) => setValue( newValue || equips[ 0 ] )}
		renderOption={( props, option ) => <li {...props} key={option.id}>
			<Box pr={1}>
				<Image
					src={`/images/equips/${option.image}.png`}
					alt={option.name}
					layout='fixed'
					height={50}
					width={50}
					className={colorClasses[ rarityColors[ option.rarity ] ]}
				/>
			</Box>
			<Typography>{option.name}</Typography>
		</li>}
		groupBy={( option ) => typeNames[ option.type ]}
		renderInput={( params ) => <TextField
			{...params}
			label='Equipment'
			InputProps={{
				...params.InputProps,
				startAdornment: <SearchIcon/>
			}}
		/>}
	/>;
}
