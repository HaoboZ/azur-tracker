import { Search as SearchIcon } from '@mui/icons-material';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { rarityColors } from '../../../colors';
import { EquipType, typeNames } from './data';

export default function EquipFilter( { equipList, value, setValue }: {
	equipList: EquipType[],
	value?: EquipType,
	setValue: ( value: EquipType ) => void
} ) {
	return (
		<Autocomplete
			fullWidth
			options={equipList}
			getOptionLabel={( { name } ) => name}
			isOptionEqualToValue={( option, value ) => option.id === value?.id}
			value={value}
			renderOption={( props, option ) => (
				<li {...props} key={option.id}>
					<Box pr={1}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={`https://azurlane.netojuu.com/w/images/${option.image}`}
							alt={option.name}
							height={50}
							width={50}
							className={`color-${rarityColors[ option.rarity ]}`}
						/>
					</Box>
					<Typography>{option.name}</Typography>
				</li>
			)}
			groupBy={( { type } ) => typeNames[ type ]}
			renderInput={( params ) => (
				<TextField
					{...params}
					label='Equipment'
					InputProps={{
						...params.InputProps,
						startAdornment: <SearchIcon/>
					}}
				/>
			)}
			onChange={( e, newValue: EquipType ) => setValue( newValue || null )}
		/>
	);
}
