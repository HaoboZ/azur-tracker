import { rarityColors } from '@/app/colors';
import pget from '@/src/helpers/pget';
import { Search as SearchIcon } from '@mui/icons-material';
import type { AutocompleteProps } from '@mui/joy';
import { Autocomplete, AutocompleteOption, ListItemContent, ListItemDecorator } from '@mui/joy';
import Image from 'next/image';
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
			sx={{ flex: 1 }}
			multiple={false}
			options={equipList}
			getOptionLabel={pget('name')}
			isOptionEqualToValue={({ id }, value) => id === value?.id}
			value={value}
			renderOption={(props, option) => (
				<AutocompleteOption {...props} key={option.id}>
					<ListItemDecorator sx={{ pr: 1 }}>
						<Image
							src={`https://azurlane.netojuu.com/images/${option.image}`}
							alt={option.name}
							height={48}
							width={48}
							style={{ borderRadius: 4 }}
							className={`color-${rarityColors[option.rarity]}`}
						/>
					</ListItemDecorator>
					<ListItemContent>{option.name}</ListItemContent>
				</AutocompleteOption>
			)}
			groupBy={({ type }) => typeNames[type]}
			placeholder='Equipment'
			startDecorator={<SearchIcon />}
			onChange={(_, newValue: EquipType) => setValue(newValue || undefined)}
			{...props}
		/>
	);
}
