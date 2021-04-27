import { Box, Checkbox, FormControlLabel, Grid, makeStyles } from '@material-ui/core';
import MaterialTable from 'material-table';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ActionTitle from '../components/actionTitle';
import DetailPanel from '../fragments/ship/detailPanel';
import EquipDialog from '../fragments/ship/equipDialog';
import EquipFilter from '../fragments/ship/equipFilter';
import TableColumns from '../fragments/ship/tableColumns';
import { mappedColorClasses } from '../lib/reference/colors';
import { equippable, equips, equipTier } from '../lib/reference/equipRef';
import shipRef from '../lib/reference/shipRef';
import { ship_checkVersion, ship_reset, ship_setFilter } from '../lib/store/reducers/shipReducer';
import tableIcons from '../lib/tableIcons';

const useStyles = makeStyles( () => mappedColorClasses as any );

export default function Ship() {
	const ship     = useSelector( store => store.ship ),
	      dispatch = useDispatch();
	const classes = useStyles();
	
	React.useEffect( () => {
		dispatch( ship_checkVersion() );
	}, [] );
	
	const [ equip, setEquip ]         = React.useState<typeof equips[number]>( null ),
	      [ equipOpen, setEquipOpen ] = React.useState( false ),
	      [ equipInfo, setEquipInfo ] = React.useState<{ rowData, index }>( null );
	
	// list of ships with the local data loaded
	const shipList = React.useMemo( () => Object.values( shipRef ).map( ( shipData ) => {
		const _ship = ship.ships[ shipData.id ];
		shipData.love = _ship?.love || 0;
		shipData.lvl = _ship?.lvl || 0;
		shipData.equipTier = _ship?.tier || '—————';
		shipData.equipped = _ship?.equip || new Array( 5 ).fill( [ 0 ] );
		shipData.equipBetter = [];
		return shipData;
	} ), [ ship ] );
	
	// filtered ships
	const filteredShipList = React.useMemo( () => shipList.filter( ( shipData ) => {
		// selected filters
		if ( !ship.filter.levelMax && shipData.lvl === 121 ) return false;
		if ( !ship.filter.level0 && !shipData.lvl ) return false;
		if ( !ship.filter.equipMax && shipData.equipTier === '✷✷✷✷✷' ) return false;
		// equipment filter
		if ( !( equip?.id ) ) return true;
		shipData.equipBetter = shipData.equipped.map( ( value, index ) => {
			// ships that can equip the equipment
			if ( !equippable[ shipData.equip[ index ] ].includes( equip.type ) ) return 0;
			const tierList = equipTier[ shipData.equip[ index ] ];
			// is equipped already
			if ( value?.[ 0 ] === equip.id ) return 6;
			// equip not in tier list
			if ( !tierList[ equip.id ] ) return 0;
			const tier = tierList[ equip.id ]?.[ 0 ] + 1;
			// none equipped
			if ( !value?.[ 0 ] ) return tier;
			// forced BiS
			if ( value[ 1 ] ) return 0;
			// current equip not in tier list
			if ( !tierList[ value[ 0 ] ] ) return tier;
			// remove those that have higher tier
			if ( tierList[ value[ 0 ] ][ 1 ] <= tierList[ equip.id ][ 1 ] ) return 0;
			return tier;
		} );
		return shipData.equipBetter.some( val => val );
	} ), [ ship, equip ] );
	
	// noinspection CssUnusedSymbol
	return <>
		{ /*language=css*/}
		<style global jsx>{`
			.MuiTableCell-sizeSmall {
				padding: 0 8px !important;
				max-width: 180px;
				white-space: nowrap;
			}
			
			.MuiTableCell-paddingNone:last-child {
				padding: 4px 8px 0 !important;
			}
		`}</style>
		<ActionTitle
			title='Ship Tracker'
			actions={[ {
				name:    'Reset',
				onClick: () => {
					if ( confirm( 'Are you sure you want to reset this page?' ) )
						dispatch( ship_reset() );
				}
			} ]}
		/>
		<Box mx={3}>
			<Grid container spacing={2}>
				<Grid item xs>
					<FormControlLabel
						control={<Checkbox
							checked={ship.filter.levelMax}
							onChange={( e ) => dispatch( ship_setFilter( { levelMax: e.target.checked } ) )}
						/>}
						label='Maxed Level'
					/>
				</Grid>
				<Grid item xs>
					<FormControlLabel
						control={<Checkbox
							checked={ship.filter.equipMax}
							onChange={( e ) => dispatch( ship_setFilter( { equipMax: e.target.checked } ) )}
						/>}
						label='Maxed Equip'
					/>
				</Grid>
				<Grid item xs>
					<FormControlLabel
						control={<Checkbox
							checked={ship.filter.level0}
							onChange={( e ) => dispatch( ship_setFilter( { level0: e.target.checked } ) )}
						/>}
						label='0 Level'
					/>
				</Grid>
				<Grid item sm={4} xs={12}>
					<EquipFilter
						colors={classes}
						equipList={equips}
						value={equip}
						setValue={setEquip}
					/>
				</Grid>
			</Grid>
		</Box>
		<MaterialTable
			title='Ship List'
			icons={tableIcons}
			columns={TableColumns}
			data={filteredShipList}
			detailPanel={( rowData ) => <DetailPanel
				rowData={rowData}
				equipClick={( rowData, index ) => {
					setEquipInfo( { rowData, index } );
					setEquipOpen( true );
				}}/>}
			onRowClick={( e, rowData, togglePanel ) => togglePanel()}
			options={{
				doubleHorizontalScroll: true,
				emptyRowsWhenPaging:    false,
				grouping:               true,
				padding:                'dense',
				pageSize:               100,
				pageSizeOptions:        [ 50, 100, 200, Object.keys( shipRef ).length ]
			}}
		/>
		<EquipDialog
			open={equipOpen}
			onClose={() => setEquipOpen( false )}
			info={equipInfo}
			selectedEquip={equip}
		/>
	</>;
}
