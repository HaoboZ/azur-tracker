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
} from '@material-ui/core';
import { MoreVert as MoreVertIcon, Search as SearchIcon } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TableInstance, useAsyncDebounce } from 'react-table';

import { equips } from '../../data/equipData';
import { ship_setFilter } from '../../lib/store/reducers/shipReducer';
import EquipFilter from './equipFilter';

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

export default function Filters( { table }: { table: TableInstance } ) {
	const { filter, ships } = useSelector( ( { ship } ) => ship );
	const dispatch = useDispatch();
	
	const globalFilter = useAsyncDebounce( ( value ) =>
		table.setGlobalFilter( value ), 250 );
	
	const [ search, setSearch ] = React.useState( '' );
	const [ anchorEl, setAnchorEl ] = React.useState<HTMLElement>( null );
	const searchRef = React.useRef<HTMLInputElement>();
	
	// keydown listener for search
	React.useEffect( () => {
		function search( e: KeyboardEvent ) {
			if ( !searchRef.current ) return;
			if ( e.ctrlKey && e.key === 'f' ) {
				if ( document.activeElement === searchRef.current ) {
					searchRef.current.select();
				} else {
					searchRef.current.focus();
				}
				e.preventDefault();
			}
		}
		window.addEventListener( 'keydown', search );
		return () => window.removeEventListener( 'keydown', search );
	}, [] );
	
	// resets filter when ships change
	React.useEffect( () => {
		table.setFilter( 'equip', ( filter ) => filter && { ...filter } );
	}, [ ships ] );
	
	return <Box mx={2} mb={2}>
		<Grid container spacing={2}>
			<Grid item md xs={12}>
				<EquipFilter
					equipList={equips}
					setValue={( equip ) => table.setFilter( 'equip', equip )}
				/>
			</Grid>
			<Grid item md xs={10}>
				<Autocomplete
					options={searchOptions}
					fullWidth
					freeSolo
					inputValue={search}
					onInputChange={( e, value ) => {
						// TODO: temporary fix until mui autocomplete freeSolo works
						if ( e ) {
							setSearch( value );
							globalFilter( value );
						}
					}}
					renderInput={( params ) => <TextField
						inputRef={searchRef}
						{...params}
						label='Search'
						InputProps={{
							...params.InputProps,
							startAdornment: <SearchIcon/>
						}}
					/>}
				/>
			</Grid>
			<Grid item container xs={2} alignContent='center'>
				<Button
					variant='contained'
					fullWidth
					sx={{ display: { xs: 'none', sm: 'block' } }}
					onClick={( { currentTarget } ) => setAnchorEl( currentTarget )}>
					More
				</Button>
				<IconButton
					sx={{ display: { xs: 'block', sm: 'none' } }}
					onClick={( { currentTarget } ) => setAnchorEl( currentTarget )}>
					<MoreVertIcon/>
				</IconButton>
			</Grid>
		</Grid>
		<Menu
			anchorEl={anchorEl}
			keepMounted
			open={Boolean( anchorEl )}
			onClose={() => setAnchorEl( null )}>
			<MenuItem>
				<FormControlLabel
					control={<Checkbox
						checked={filter.levelMax}
						onChange={( { target } ) => dispatch( ship_setFilter( { levelMax: target.checked } ) )}
					/>}
					label='Maxed Level'
				/>
			</MenuItem>
			<MenuItem>
				<FormControlLabel
					control={<Checkbox
						checked={filter.equipMax}
						onChange={( { target } ) => dispatch( ship_setFilter( { equipMax: target.checked } ) )}
					/>}
					label='Maxed Equip'
				/>
			</MenuItem>
			<MenuItem>
				<FormControlLabel
					control={<Checkbox
						checked={filter.level0}
						onChange={( { target } ) => dispatch( ship_setFilter( { level0: target.checked } ) )}
					/>}
					label='0 Level'
				/>
			</MenuItem>
		</Menu>
	</Box>;
}
