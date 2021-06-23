import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	IconButton,
	Menu,
	MenuItem,
	TextField,
	Theme,
	useMediaQuery
} from '@material-ui/core';
import { MoreVert as MoreVertIcon, Search as SearchIcon } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncDebounce } from 'react-table';

import { equips } from '../../lib/reference/equipRef';
import { ship_setFilter } from '../../lib/store/reducers/shipReducer';
import EquipFilter from './equipFilter';

export default function Filters( { table, resetEquip } ) {
	const ship = useSelector( state => state.ship );
	const dispatch = useDispatch();
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ), { noSsr: true } );
	
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
	
	return <Box mx={3} mb={2}>
		<Grid container spacing={2}>
			<Grid item xs>
				<EquipFilter
					equipList={equips}
					setValue={( equip ) => {
						resetEquip();
						table.setFilter( 'equip', equip );
					}}
				/>
			</Grid>
			<Grid item xs>
				<Autocomplete
					options={[]}
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
			<Grid item md={1} xs={2}>
				{wide
					? <Button
						variant='contained'
						fullWidth
						onClick={( e ) => setAnchorEl( e.currentTarget )}>
						More
					</Button>
					: <IconButton onClick={( e ) => setAnchorEl( e.currentTarget )}>
						<MoreVertIcon/>
					</IconButton>}
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
						color='primary'
						checked={ship.filter.levelMax}
						onChange={( e ) => dispatch( ship_setFilter( { levelMax: e.target.checked } ) )}
					/>}
					label='Maxed Level'
				/>
			</MenuItem>
			<MenuItem>
				<FormControlLabel
					control={<Checkbox
						color='primary'
						checked={ship.filter.equipMax}
						onChange={( e ) => dispatch( ship_setFilter( { equipMax: e.target.checked } ) )}
					/>}
					label='Maxed Equip'
				/>
			</MenuItem>
			<MenuItem>
				<FormControlLabel
					control={<Checkbox
						color='primary'
						checked={ship.filter.level0}
						onChange={( e ) => dispatch( ship_setFilter( { level0: e.target.checked } ) )}
					/>}
					label='0 Level'
				/>
			</MenuItem>
		</Menu>
	</Box>;
}
