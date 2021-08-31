import { Autocomplete, Box, TextField, Typography } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import Image from 'next/image';
import React from 'react';

import { rarityColors } from '../../data/colors';
import { equips, typeNames } from '../../data/equipData';

export default function EquipFilter( { equipList, value, setValue }: {
	equipList: typeof equips,
	value?: typeof equips[number],
	setValue: ( value: typeof equips[number] ) => void
} ) {
	return <Autocomplete
		options={equipList}
		getOptionLabel={( { name } ) => name}
		isOptionEqualToValue={( option, value ) => option.id === value?.id}
		fullWidth
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
					className={`color-${rarityColors[ option.rarity ]}`}
				/>
			</Box>
			<Typography>{option.name}</Typography>
		</li>}
		groupBy={( { type } ) => typeNames[ type ]}
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
