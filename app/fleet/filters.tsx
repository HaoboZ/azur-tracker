import pget from '@/src/helpers/pget';
import { useData } from '@/src/providers/data';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { fleetActions } from '@/src/store/reducers/fleetReducer';
import { Search as SearchIcon } from '@mui/icons-material';
import { Autocomplete, Box, Checkbox, Dropdown, ListItem, Menu, MenuButton, Stack } from '@mui/joy';
import type { Table } from '@tanstack/react-table';
import { useEffect, useRef } from 'react';
import { useDebounce, useWindowEventListener } from 'rooks';
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
];

export default function FleetFilters({ table }: { table: Table<Ship> }) {
	const { equipData } = useData<FleetType>();
	const { filter, ships } = useAppSelector(pget('fleet'));
	const dispatch = useAppDispatch();

	const globalFilter = useDebounce((value: string) => table.setGlobalFilter(value), 500);

	const searchRef = useRef<HTMLInputElement>();

	// keydown listener for search
	useWindowEventListener('keydown', (e: KeyboardEvent) => {
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
		<Box mx={2} mb={2}>
			<Stack direction='row' spacing={1}>
				<EquipFilter
					equipList={equipData}
					setValue={(equip) => table.getColumn('equip').setFilterValue(equip)}
				/>
				<Autocomplete
					freeSolo
					options={searchOptions}
					placeholder='Search'
					startDecorator={<SearchIcon />}
					sx={{ flex: 1 }}
					onInputChange={(_, value) => globalFilter(value)}
				/>
				<Dropdown>
					<MenuButton>Filter</MenuButton>
					<Menu>
						<ListItem>
							<Checkbox
								label='Maxed Level'
								checked={filter.levelMax}
								onChange={({ target }) => {
									dispatch(fleetActions.setFilter({ levelMax: target.checked }));
								}}
							/>
						</ListItem>
						<ListItem>
							<Checkbox
								label='Maxed Equip'
								checked={filter.equipMax}
								onChange={({ target }) => {
									dispatch(fleetActions.setFilter({ equipMax: target.checked }));
								}}
							/>
						</ListItem>
						<ListItem>
							<Checkbox
								label='0 Level'
								checked={filter.level0}
								onChange={({ target }) => {
									dispatch(fleetActions.setFilter({ level0: target.checked }));
								}}
							/>
						</ListItem>
					</Menu>
				</Dropdown>
			</Stack>
		</Box>
	);
}
