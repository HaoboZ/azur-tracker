import { Grid, makeStyles } from '@material-ui/core';
import MaterialTable from 'material-table';
import React from 'react';

import DetailPanel from '../components/armada/detailPanel';
import EquipDialog from '../components/armada/equipDialog';
import EquipFilter from '../components/armada/equipFilter';
import tableColumns from '../components/armada/tableColumns';
import PageTitleReset from '../components/pageTitleReset';
import { mappedColorClasses } from '../lib/reference/colors';
import { equippable, equips, equipTier } from '../lib/reference/equipRef';
import shipRef from '../lib/reference/shipRef';
import { useTypedSelector } from '../lib/store';
import { ship_reset } from '../lib/store/shipReducer';
import tableIcons from '../lib/tableIcons';

const useStyles = makeStyles( () => mappedColorClasses );

export default function Armada() {
	const ship = useTypedSelector( store => store.ship );
	
	const classes = useStyles();
	
	const [ equip, setEquip ]         = React.useState<typeof equips[number]>( null ),
	      [ equipOpen, setEquipOpen ] = React.useState( false ),
	      [ equipInfo, setEquipInfo ] = React.useState<{ rowData, index }>( null );
	
	// list of ships with the local data loaded
	const shipList = React.useMemo( () => Object.values( shipRef )
		.map( ( shipData ) => {
			const _ship = ship.ships[ shipData.id ];
			shipData.love = _ship?.love || 0;
			shipData.lvl = _ship?.lvl || 70;
			shipData.equipped = _ship?.equip || new Array( 5 ).fill( [ 0 ] );
			shipData.equipTier = _ship?.tier || '—————';
			return shipData;
		} ), [ ship ] );
	
	// filtered ships that can equip equipment and tier is lower
	const equipShipList = React.useMemo( () => {
		if ( !( equip?.id ) ) return shipList;
		return shipList.filter( ( ship, i ) => {
			return ship.equipped.some( ( predicate, index ) => {
				// ships that can equip the equipment
				if ( !equippable[ ship.equip[ index ] ].includes( equip.type ) ) return false;
				// none equipped
				if ( !predicate?.[ 0 ] ) return true;
				// forced BiS
				if ( predicate[ 1 ] ) return false;
				// remove those that have higher tier
				const tierList = equipTier[ ship.equip[ index ] ];
				if ( !tierList[ predicate[ 0 ] ] ) return true;
				return tierList[ predicate[ 0 ] ][ 1 ] < tierList[ equip.id ][ 1 ];
			} );
		} );
	}, [ equip ] );
	
	return <Grid container spacing={ 2 }>
		{ /*language=css*/ }
		<style global jsx>{ `
          .MuiTableCell-sizeSmall {
              padding: 4px 8px 4px 8px;
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
				columns={ tableColumns }
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
					pageSize:               50,
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
