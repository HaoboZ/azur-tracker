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

import shipRef from '../../lib/reference/shipRef';
import tableColumns from './tableColumns';

export default function useShipTable( equipBetter, setEquipBetter ) {
	const ship = useSelector( store => store.ship );
	
	const skipResetRef = React.useRef( false );

// list of ships with the local data loaded
	const shipList = React.useMemo( () => {
		skipResetRef.current = true;
		return Object.values( shipRef )
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
			} );
	}, [ ship ] );
	
	React.useEffect( () => {
		skipResetRef.current = false;
	} );
	
	const setEquipBetterDelay = useAsyncDebounce( ( filter, value ) => {
		if ( equipBetter.filter !== filter ) {
			setEquipBetter( { filter, value } );
		}
	}, 0 );
	
	const columns = React.useMemo( () => tableColumns( equipBetter, setEquipBetterDelay ), [ equipBetter ] );
	
	return useTable( {
			columns,
			data         : shipList,
			defaultColumn: { width: 10 },
			initialState : {
				hiddenColumns: [ 'equipType' ],
				sortBy       : [ { id: 'tier' }, { id: 'lvl', desc: true } ]
			},
			filterTypes  : {
				// case insensitive ignores accents in strings
				normal: ( rows, ids, filterValue ) => {
					let regex: RegExp;
					let isValid = true;
					try {
						regex = new RegExp( filterValue, 'i' );
					} catch {
						isValid = false;
					}
					if ( !isValid ) return [];
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
				}
			},
			globalFilter : 'normal',
			// autoResetPage        : !skipResetRef.current,
			// autoResetExpanded    : !skipResetRef.current,
			// autoResetGroupBy     : !skipResetRef.current,
			// autoResetSelectedRows: !skipResetRef.current,
			autoResetSortBy  : !skipResetRef.current,
			autoResetFilters : !skipResetRef.current,
			autoResetRowState: !skipResetRef.current
		},
		useFlexLayout,
		useGlobalFilter,
		useFilters,
		useSortBy,
		useRowState );
}
