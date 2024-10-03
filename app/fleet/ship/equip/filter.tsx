import { VirtualGroupedListbox } from '@/components/virtualListbox';
import pget from '@/src/helpers/pget';
import { Search as SearchIcon } from '@mui/icons-material';
import type { AutocompleteProps } from '@mui/material';
import { Autocomplete, ListItem, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { rarityColors } from '../../../colors';
import type { EquipType } from './type';

const typeNames = {
	T: 'Torpedo',
	AA: 'Anti-Air Gun',
	DD: 'Destroyer Gun',
	M: 'Missile',
	CL: 'Light Cruiser Gun',
	CA: 'Heavy Cruiser Gun',
	CB: 'Large Cruiser Gun',
	SS: 'Submarine Gun',
	BB: 'Battleship Gun',
	F: 'Fighter',
	DB: 'Dive Bomber',
	TB: 'Torpedo Bomber',
	ST: 'Submarine Torpedo',
	SP: 'Sea Plane',
	SPS: 'Sea Plane',
	A: 'Auxiliary',
	ASW: 'Anti-Submarine',
	C: 'Cargo',
};

export default function EquipFilter({
	equipList,
	value,
	setValue,
	...props
}: { equipList: EquipType[]; value?: EquipType; setValue: (value: EquipType) => void } & Partial<
	AutocompleteProps<EquipType, false, false, false>
>) {
	return (
		<Autocomplete
			fullWidth
			slots={{ listbox: VirtualGroupedListbox }}
			options={equipList}
			getOptionKey={pget('id')}
			getOptionLabel={pget('name')}
			isOptionEqualToValue={({ id }, value) => id === value?.id}
			value={value}
			renderInput={(params) => {
				params.InputProps.startAdornment = <SearchIcon />;
				return <TextField label='Equipment' {...params} />;
			}}
			renderOption={(props, option) => (
				<ListItem {...props} key={props.id}>
					<Image
						src={`https://azurlane.netojuu.com/images/${option.image}`}
						alt={option.name}
						height={48}
						width={48}
						style={{ borderRadius: 4 }}
						className={`color-${rarityColors[option.rarity]}`}
					/>
					<Typography sx={{ pl: 1 }}>{option.name}</Typography>
				</ListItem>
			)}
			groupBy={({ type }) => typeNames[type]}
			onChange={(_, newValue: EquipType) => setValue(newValue || undefined)}
			{...props}
		/>
	);
}
