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
import { useAsyncDebounce } from 'react-table';

import { equips } from '../../lib/reference/equipRef';
import { ship_setFilter } from '../../lib/store/reducers/shipReducer';
import EquipFilter from './equipFilter';

const searchOptions = [
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
	'Decisive',
	'Ultra Rare',
	'Priority',
	'Super Rare',
	'Elite',
	'Rare',
	'Common'
].map( ( label, id ) => ( { id, label } ) );

export default function Filters( { table, resetEquip } ) {
	const filter = useSelector( state => state.ship.filter );
	const dispatch = useDispatch();
	
	const globalFilter = useAsyncDebounce( ( value ) =>
		table.setGlobalFilter( value ), 250 );
	
	const [ anchorEl, setAnchorEl ] = React.useState<HTMLElement>( null );
	const searchRef = React.useRef<HTMLInputElement>();
	
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
	
	return <Box mx={2} mb={2}>
		<Grid container spacing={2}>
			<Grid item md xs={12}>
				<EquipFilter
					equipList={equips}
					setValue={( equip ) => {
						resetEquip();
						table.setFilter( 'equip', equip );
					}}
				/>
			</Grid>
			<Grid item md xs={10}>
				<Autocomplete
					options={searchOptions}
					fullWidth
					freeSolo
					onInputChange={( e, value ) => globalFilter( value )}
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
					onClick={( e ) => setAnchorEl( e.currentTarget )}>
					More
				</Button>
				<IconButton
					sx={{ display: { xs: 'block', sm: 'none' } }}
					onClick={( e ) => setAnchorEl( e.currentTarget )}>
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
						onChange={( e ) =>
							dispatch( ship_setFilter( { levelMax: e.target.checked } ) )}
					/>}
					label='Maxed Level'
				/>
			</MenuItem>
			<MenuItem>
				<FormControlLabel
					control={<Checkbox
						checked={filter.equipMax}
						onChange={( e ) =>
							dispatch( ship_setFilter( { equipMax: e.target.checked } ) )}
					/>}
					label='Maxed Equip'
				/>
			</MenuItem>
			<MenuItem>
				<FormControlLabel
					control={<Checkbox
						checked={filter.level0}
						onChange={( e ) =>
							dispatch( ship_setFilter( { level0: e.target.checked } ) )}
					/>}
					label='0 Level'
				/>
			</MenuItem>
		</Menu>
	</Box>;
}
