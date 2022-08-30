import { Search as SearchIcon } from '@mui/icons-material';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { rarityColors } from '../../../colors';
import type { EquipType } from './type';

const typeNames = {
	T  : 'Torpedo',
	AA : 'Anti-Air Gun',
	DD : 'Destroyer Gun',
	M  : 'Missile',
	CL : 'Light Cruiser Gun',
	CA : 'Heavy Cruiser Gun',
	CB : 'Large Cruiser Gun',
	SS : 'Submarine Gun',
	BB : 'Battleship Gun',
	F  : 'Fighter',
	DB : 'Dive Bomber',
	TB : 'Torpedo Bomber',
	ST : 'Submarine Torpedo',
	SP : 'Sea Plane',
	SPS: 'Sea Plane',
	A  : 'Auxiliary',
	C  : 'Cargo'
};

export default function EquipFilter( { equipList, value, setValue }: {
	equipList: EquipType[],
	value?: EquipType,
	setValue: ( value: EquipType ) => void
} ) {
	return (
		<Autocomplete<EquipType>
			fullWidth
			options={equipList}
			getOptionLabel={( { name }: EquipType ) => name}
			isOptionEqualToValue={( option, value ) => option.id === value?.id}
			value={value}
			renderOption={( props, option ) => (
				<li {...props} key={option.id}>
					<Box pr={1}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={`https://azurlane.netojuu.com/images/${option.image}`}
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
