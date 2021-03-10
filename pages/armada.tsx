import { Grid, makeStyles } from '@material-ui/core';
import MaterialTable from 'material-table';
import React from 'react';
import { useDispatch } from 'react-redux';

import DetailPanel from '../components/armada/detailPanel';
import EquipDialog from '../components/armada/equipDialog';
import EquipFilter from '../components/armada/equipFilter';
import TableColumns from '../components/armada/tableColumns';
import PageTitleReset from '../components/pageTitleReset';
import { mappedColorClasses } from '../lib/reference/colors';
import { equippable, equips, equipTier } from '../lib/reference/equipRef';
import shipRef from '../lib/reference/shipRef';
import { useTypedSelector } from '../lib/store';
import { ship_checkVersion, ship_reset } from '../lib/store/shipReducer';
import tableIcons from '../lib/tableIcons';

const useStyles = makeStyles( () => mappedColorClasses as any );

export default function Armada() {
	const ship     = useTypedSelector( store => store.ship ),
	      dispatch = useDispatch();
	
	const classes = useStyles();
	
	React.useEffect( () => {
		dispatch( ship_checkVersion() );
	}, [] );
	
	const [ equip, setEquip ]         = React.useState<typeof equips[number]>( null ),
	      [ equipOpen, setEquipOpen ] = React.useState( false ),
	      [ equipInfo, setEquipInfo ] = React.useState<{ rowData, index }>( null );
	
	// list of ships with the local data loaded
	const shipList = React.useMemo( () => Object.values( shipRef )
		.map( ( shipData ) => {
			const _ship = ship.ships[ shipData.id ];
			shipData.love = _ship?.love || 0;
			shipData.lvl = _ship?.lvl || 0;
			shipData.equipTier = _ship?.tier || '—————';
			shipData.equipped = _ship?.equip || new Array( 5 ).fill( [ 0 ] );
			shipData.equipBetter = [];
			return shipData;
		} ), [ ship ] );
	
	// filtered ships that can equip equipment and tier is lower
	const equipShipList = React.useMemo( () => {
		if ( !( equip?.id ) ) return shipList;
		return shipList.filter( ( shipData ) => {
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
		} );
	}, [ ship, equip ] );
	
	return <Grid container spacing={ 2 }>
		{ /*language=css*/ }
		<style global jsx>{ `
          .MuiTableCell-sizeSmall {
              padding: 4px 8px 4px 8px !important;
          }

          .MuiTableCell-paddingNone:last-child {
              padding: 4px 16px 4px 8px;
          }
		` }</style>
		<PageTitleReset name='Armada Tracker' reset={ ship_reset }/>
		<Grid item sm={ 8 } xs={ 12 }/>
		<Grid item xs>
			<EquipFilter
				colors={ classes }
				equipList={ equips }
				value={ equip }
				setValue={ setEquip }
			/>
		</Grid>
		<Grid item xs={ 12 }>
			<MaterialTable
				title='Ship List'
				icons={ tableIcons }
				columns={ TableColumns() }
				data={ equipShipList }
				detailPanel={ ( rowData ) => <DetailPanel
					colors={ classes }
					rowData={ rowData }
					equipClick={ ( rowData, index ) => {
						setEquipInfo( { rowData, index } );
						setEquipOpen( true );
					} }/> }
				onRowClick={ ( e, rowData, togglePanel ) => togglePanel() }
				options={ {
					doubleHorizontalScroll: true,
					emptyRowsWhenPaging:    false,
					grouping:               true,
					padding:                'dense',
					pageSize:               100,
					pageSizeOptions:        [ 50, 100, 200, Object.keys( shipRef ).length ]
				} }
			/>
		</Grid>
		<EquipDialog
			colors={ classes }
			open={ equipOpen }
			onClose={ () => setEquipOpen( false ) }
			info={ equipInfo }
			selectedEquip={ equip }
		/>
	</Grid>;
}
