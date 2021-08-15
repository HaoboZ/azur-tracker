import React from 'react';
import { useSelector } from 'react-redux';
import {
	useAsyncDebounce,
	useFilters,
	useFlexLayout,
	useGlobalFilter,
	useRowState,
	useSortBy,
	useTable
} from 'react-table';

import shipRef from '../../data/shipData';
import tableColumns from './tableColumns';

export default function useShipTable( equipBetter, setEquipBetter ) {
	const ship = useSelector( state => state.ship );
	
	// list of ships with the local data loaded
	const shipList = React.useMemo( () => Object.values( shipRef )
		.map( ( shipData ) => {
			const _ship = ship.ships[ shipData.id ];
			shipData.love = _ship?.love || 0;
			shipData.lvl = _ship?.lvl || 0;
			shipData.equip = _ship?.equip || new Array( 5 ).fill( [] );
			return shipData;
		} )
		.filter( ( shipData ) => {
			if ( !ship.filter.levelMax && shipData.lvl === 121 ) return false;
			if ( !ship.filter.level0 && !shipData.lvl ) return false;
			return ship.filter.equipMax || !shipData.equip?.every( ( equip ) => equip[ 2 ] === 1 );
		} ), [ ship ] );
	
	const setEquipBetterDelay = useAsyncDebounce( ( filter, value ) => {
		if ( equipBetter.filter !== filter ) setEquipBetter( { filter, value } );
	}, 0 );
	
	const columns = React.useMemo( () => tableColumns( equipBetter, setEquipBetterDelay ), [ equipBetter ] );
	
	return useTable(
		{
			columns,
			data                  : shipList,
			defaultColumn         : { width: 10 },
			initialState          : {
				hiddenColumns: [ 'equipType' ],
				sortBy       : [ { id: 'tier' }, { id: 'lvl', desc: true } ]
			},
			filterTypes           : {
				// case insensitive ignores accents in strings
				normal: ( rows, ids, filterValue ) => {
					try {
						const regex = new RegExp( filterValue, 'i' );
						return rows.filter( ( row ) => {
							for ( const id of ids ) {
								if ( id === 'name' ) {
									if ( regex.test( row.values[ id ].normalize( 'NFD' ).replace( /[\u0300-\u036f]/g, '' ) ) )
										return true;
								} else {
									if ( regex.test( row.values[ id ] ) )
										return true;
								}
							}
							return false;
						} );
					} catch {
						return [];
					}
				}
			},
			globalFilter          : 'normal',
			autoResetHiddenColumns: false,
			autoResetRowState     : false,
			autoResetSortBy       : false,
			autoResetGlobalFilter : false,
			autoResetFilters      : false
		},
		useFlexLayout,
		useRowState,
		useFilters,
		useGlobalFilter,
		useSortBy
	);
}
