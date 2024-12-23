import Dropdown from '@/components/dropdown';
import pget from '@/src/helpers/pget';
import useEventListener from '@/src/hooks/useEventListener';
import { useData } from '@/src/providers/data';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { fleetActions } from '@/src/store/reducers/fleetReducer';
import { Search as SearchIcon } from '@mui/icons-material';
import { Autocomplete, Checkbox, ListItem, ListItemText, Stack, TextField } from '@mui/material';
import type { Table } from '@tanstack/react-table';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useRef, useState } from 'react';
import EquipFilter from './ship/equip/filter';
import type { FleetType, Ship } from './type';

const searchOptions = [
	// rarity
	'Decisive',
	'Ultra Rare',
	'Priority',
	'Super Rare',
	'Elite',
	'Rare',
	'Common',
	// types
	'Destroyer',
	'Guided Missile Destroyer',
	'Light Cruiser',
	'Heavy Cruiser',
	'Large Cruiser',
	'Battlecruiser',
	'Battleship',
	'Aviation Battleship',
	'Light Aircraft Carrier',
	'Aircraft Carrier',
	'Monitor',
	'Submarine',
	'Submarine Carrier',
	'Repair Ship',
	'Munition Ship',
	'Sailing Frigate',
	// nations
	'Universal',
	'Eagle Union',
	'Royal Navy',
	'Sakura Empire',
	'Ironblood',
	'Dragon Empery',
	'Sardegna Empire',
	'Northern Parliament',
	'Iris Libre',
	'Vichya Dominion',
	'Neptunia',
	'KizunaAI',
	'Hololive',
	'Venus Vacation',
	'META',
	'SSSS',
	'Tempesta',
	'Atelier Ryza',
	'Senran Kagura',
];

export default function FleetFilters({ table }: { table: Table<Ship> }) {
	const { equipData } = useData<FleetType>();
	const { filter, ships } = useAppSelector(pget('fleet'));
	const dispatch = useAppDispatch();

	const [search, setSearch] = useState('');
	const debouncedSearch = useDebounce(search, 500);

	useEffect(() => {
		table.setGlobalFilter(debouncedSearch);
	}, [debouncedSearch]);

	const searchRef = useRef<HTMLInputElement>(undefined);

	// keydown listener for search
	useEventListener(window, 'keydown', (e: KeyboardEvent) => {
		if (!searchRef.current) return;
		if (e.ctrlKey && e.key === 'f') {
			if (document.activeElement === searchRef.current) {
				searchRef.current.select();
			} else {
				searchRef.current.focus();
			}
			e.preventDefault();
		}
	});

	// resets filter when ships change
	useEffect(() => {
		table.getColumn('equip').setFilterValue((filter) => filter && { ...filter });
	}, [ships]);

	return (
		<Stack direction='row' spacing={1}>
			<EquipFilter
				equipList={equipData}
				setValue={(equip) => table.getColumn('equip').setFilterValue(equip)}
			/>
			<Autocomplete
				fullWidth
				freeSolo
				options={searchOptions}
				renderInput={(params) => {
					params.InputProps.startAdornment = <SearchIcon />;
					return <TextField label='Search' {...params} />;
				}}
				onInputChange={(_, value) => setSearch(value)}
			/>
			<Dropdown button='Filter'>
				<ListItem>
					<Checkbox
						checked={filter.levelMax}
						onChange={({ target }) => {
							dispatch(fleetActions.setFilter({ levelMax: target.checked }));
						}}
					/>
					<ListItemText>Maxed Level</ListItemText>
				</ListItem>
				<ListItem>
					<Checkbox
						checked={filter.equipMax}
						onChange={({ target }) => {
							dispatch(fleetActions.setFilter({ equipMax: target.checked }));
						}}
					/>
					<ListItemText>Maxed Equip</ListItemText>
				</ListItem>
				<ListItem>
					<Checkbox
						checked={filter.level0}
						onChange={({ target }) => {
							dispatch(fleetActions.setFilter({ level0: target.checked }));
						}}
					/>
					<ListItemText>0 Level</ListItemText>
				</ListItem>
			</Dropdown>
		</Stack>
	);
}
