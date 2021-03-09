import { Grid, makeStyles } from '@material-ui/core';
import MaterialTable from 'material-table';
import React from 'react';

import DetailPanel from '../components/armada/detailPanel';
import EquipDialog from '../components/armada/equipDialog';
import EquipFilter from '../components/armada/equipFilter';
import PageTitleReset from '../components/pageTitleReset';
import {
	mappedColorClasses,
	nationColors,
	rarityColors,
	typeColors
} from '../lib/reference/colors';
import { equips } from '../lib/reference/equipRef';
import shipRef from '../lib/reference/shipRef';
import { useTypedSelector } from '../lib/store';
import { ship_reset } from '../lib/store/shipReducer';
import tableIcons from '../lib/tableIcons';

const useStyles = makeStyles( () => mappedColorClasses );

export default function Armada() {
	const ship = useTypedSelector( store => store.ship );
	
	const classes = useStyles();
	
	const [ equipment, setEquipment ] = React.useState<typeof equips[number]>( null ),
	      [ equipOpen, setEquipOpen ] = React.useState( false ),
	      [ equipInfo, setEquipInfo ] = React.useState<{ rowData, index }>( null );
	
	const shipList = React.useMemo( () => Object.values( shipRef )
		.map( ( shipData ) => {
			const _ship = ship.ships[ shipData.id ];
			shipData.love = _ship?.love || 0;
			shipData.lvl = _ship?.lvl || 70;
			shipData.equipped = _ship?.equip || new Array( 5 ).fill( [ 0 ] );
			shipData.equipTier = _ship?.tier || '—————';
			return shipData;
		} ), [ ship ] );
	
	const equipShipList = React.useMemo( () => {
		if ( !equipment ) return shipList;
		return shipList.filter( ( ship ) => {
			return true;
		} );
	}, [ equipment ] );
	
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
				value={ equipment }
				setValue={ setEquipment }
			/>
		</Grid>
		<Grid item xs={ 12 }>
			<MaterialTable
				title='Ship List'
				icons={ tableIcons }
				columns={ [
					{
						title:                 'Name',
						field:                 'name',
						[ 'minWidth' as any ]: 150,
						customFilterAndSearch( term, rowData ) {
							return new RegExp( term, 'i' )
								.test( rowData.name.normalize( 'NFD' ).replace( /[\u0300-\u036f]/g, '' ) );
						},
						customSort( a, b ) {
							return a.name.localeCompare( b.name );
						},
						grouping: false
					},
					{
						title:                 'Rarity',
						field:                 'rarity',
						[ 'minWidth' as any ]: 100,
						cellStyle( _, data ) {
							return mappedColorClasses[ rarityColors[ data?.rarity ] ];
						}
					},
					{
						title:                 'Nation',
						field:                 'nation',
						[ 'minWidth' as any ]: 150,
						cellStyle( _, data ) {
							return mappedColorClasses[ nationColors[ data?.nation ] ];
						}
					},
					{
						title:                 'Type',
						field:                 'type',
						[ 'minWidth' as any ]: 150,
						cellStyle( _, data ) {
							return mappedColorClasses[ typeColors[ data?.type ] ];
						}
					},
					{
						title:                 'Tier',
						field:                 'tier',
						defaultSort:           'asc',
						type:                  'numeric',
						align:                 'left',
						[ 'minWidth' as any ]: 50,
						render( data, type ) {
							const val: number = type === 'group' ? data as any : data.tier;
							return val === 3 ? 'N' : val;
						}
					},
					{
						title: 'Love',
						field: 'love',
						type:  'numeric',
						align: 'left',
						// description:   '♥ (1) for 100 affinity, 💍 (2) for married, 💍♥ (3) for 200 affinity',
						[ 'minWidth' as any ]: 50,
						render( data, type ) {
							const val: number = type === 'group' ? data as any : data.love;
							return [ '♡', '♥', '💍', '💍♥' ][ val ];
						},
						searchable: false
					},
					{
						title: 'Max Level',
						field: 'lvl',
						type:  'numeric',
						align: 'left',
						// description:   'Maximum level that is possible, ✰ for lvl 120 (121)',
						[ 'minWidth' as any ]: 50,
						render( data, type ) {
							const val: number = type === 'group' ? data as any : data.lvl;
							return val === 121 ? '★' : val;
						},
						searchable: false
					},
					{
						title:                 'Equips',
						field:                 'equipTier',
						[ 'minWidth' as any ]: 50,
						grouping:              false,
						searchable:            false
					}
				] }
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
			selectedEquip={ equipment }
		/>
	</Grid>;
}
