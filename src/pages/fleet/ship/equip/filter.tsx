import { Search as SearchIcon } from '@mui/icons-material';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { rarityColors } from '../../../colors';
import equipData, { typeNames } from './data';

export default function EquipFilter( { equipList, value, setValue }: {
	equipList: typeof equipData,
	value?: typeof equipData[number],
	setValue: ( value: typeof equipData[number] ) => void
} ) {
	return <Autocomplete
		options={equipList}
		getOptionLabel={( { name } ) => name}
		isOptionEqualToValue={( option, value ) => option.id === value?.id}
		fullWidth
		value={value}
		onChange={( e, newValue: typeof equipData[number] ) => setValue( newValue || equipData[ 0 ] )}
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
