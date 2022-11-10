import { useData } from '@/src/layout/providers/data';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { fleet_setFilter } from '@/src/store/reducers/fleetReducer';
import { MoreVert as MoreVertIcon, Search as SearchIcon } from '@mui/icons-material';
import {
	Autocomplete,
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	IconButton,
	Menu,
	MenuItem,
	TextField
} from '@mui/material';
import type { Table } from '@tanstack/react-table';
import { useEffect, useRef, useState } from 'react';
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
	'META'
].map( ( label, id ) => ( { id, label } ) );

export default function FleetFilters( { table }: { table: Table<Ship> } ) {
	const { equipData } = useData<FleetType>();
	const { filter, ships } = useAppSelector( ( { fleet } ) => fleet );
	const dispatch = useAppDispatch();
	
	const globalFilter = useDebounce( ( value ) => table.setGlobalFilter( value ), 500 );
	
	const [ anchorEl, setAnchorEl ] = useState<HTMLElement>( null );
	const searchRef = useRef<HTMLInputElement>();
	
	// keydown listener for search
	useWindowEventListener( 'keydown', ( e: KeyboardEvent ) => {
		if ( !searchRef.current ) return;
		if ( e.ctrlKey && e.key === 'f' ) {
			if ( document.activeElement === searchRef.current ) {
				searchRef.current.select();
			} else {
				searchRef.current.focus();
			}
			e.preventDefault();
		}
	} );
	
	// resets filter when ships change
	useEffect( () => {
		table.getColumn( 'equip' ).setFilterValue( ( filter ) => filter && { ...filter } );
	}, [ ships ] );
	
	return (
		<Box mx={2} mb={2}>
			<Grid container spacing={2}>
				<Grid item md xs={12}>
					<EquipFilter
						equipList={equipData}
						setValue={( equip ) => table.getColumn( 'equip' ).setFilterValue( equip )}
					/>
				</Grid>
				<Grid item md xs={10}>
					<Autocomplete
						fullWidth
						freeSolo
						options={searchOptions}
						renderInput={( params ) => (
							<TextField
								inputRef={searchRef}
								{...params}
								label='Search'
								InputProps={{
									...params.InputProps,
									startAdornment: <SearchIcon/>
								}}
							/>
						)}
						onInputChange={( e, value ) => globalFilter( value )}
					/>
				</Grid>
				<Grid item container xs={2} alignContent='center'>
					<Button
						fullWidth
						variant='contained'
						sx={{ display: { xs: 'none', sm: 'block' } }}
						onClick={( { currentTarget } ) => setAnchorEl( currentTarget )}>
						More
					</Button>
					<IconButton
						sx={{ display: { xs: 'block', sm: 'none' }, width: 40, height: 40 }}
						onClick={( { currentTarget } ) => setAnchorEl( currentTarget )}>
						<MoreVertIcon/>
					</IconButton>
				</Grid>
			</Grid>
			<Menu
				keepMounted
				anchorEl={anchorEl}
				open={Boolean( anchorEl )}
				onClose={() => setAnchorEl( null )}>
				<MenuItem>
					<FormControlLabel
						control={(
							<Checkbox
								checked={filter.levelMax}
								onChange={( { target } ) => dispatch( fleet_setFilter( { levelMax: target.checked } ) )}
							/>
						)}
						label='Maxed Level'
					/>
				</MenuItem>
				<MenuItem>
					<FormControlLabel
						control={(
							<Checkbox
								checked={filter.equipMax}
								onChange={( { target } ) => dispatch( fleet_setFilter( { equipMax: target.checked } ) )}
							/>
						)}
						label='Maxed Equip'
					/>
				</MenuItem>
				<MenuItem>
					<FormControlLabel
						control={(
							<Checkbox
								checked={filter.level0}
								onChange={( { target } ) => dispatch( fleet_setFilter( { level0: target.checked } ) )}
							/>
						)}
						label='0 Level'
					/>
				</MenuItem>
			</Menu>
		</Box>
	);
}
