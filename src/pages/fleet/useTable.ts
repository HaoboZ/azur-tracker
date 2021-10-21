import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
	TableOptions,
	useFilters,
	useFlexLayout,
	useGlobalFilter,
	useRowState,
	useSortBy,
	useTable
} from 'react-table';
import fleetColumns from './columns';
import fleetData from './data';

export default function useFleetTable( equipBetter, setEquipBetter ) {
	const fleet = useSelector( ( { fleet } ) => fleet );
	
	const tableOptions = useMemo( () => ( {
		columns: fleetColumns( equipBetter, setEquipBetter ),
		// list of ships with the local data loaded
		data                  : Object.values( fleetData )
			.map( ( shipData ) => {
				const _ship = fleet.ships[ shipData.id ];
				shipData.love = _ship?.love || 0;
				shipData.lvl = _ship?.lvl || 0;
				shipData.equip = _ship?.equip || new Array( 5 ).fill( [] );
				return shipData;
			} )
			.filter( ( shipData ) => {
				if ( !fleet.filter.levelMax && shipData.lvl === 126 ) return false;
				if ( !fleet.filter.level0 && !shipData.lvl ) return false;
				return fleet.filter.equipMax || !shipData.equip?.every( ( equip ) => equip[ 2 ] === 1 );
			} ),
		getRowId              : ( { id } ) => id,
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
					return rows.filter( ( { values } ) => {
						for ( const id of ids ) {
							if ( id === 'name' ) {
								if ( regex.test( values[ id ].normalize( 'NFD' ).replace( /[\u0300-\u036f]/g, '' ) ) )
									return true;
							} else {
								if ( regex.test( values[ id ] ) )
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
	} as TableOptions<any> ), [ fleet, equipBetter ] );
	
	return useTable(
		tableOptions,
		useFlexLayout,
		useRowState,
		useFilters,
		useGlobalFilter,
		useSortBy
	);
}
