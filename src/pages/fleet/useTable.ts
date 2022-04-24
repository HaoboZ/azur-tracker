import { useMemo } from 'react';
import {
	TableOptions,
	useFilters,
	useFlexLayout,
	useGlobalFilter,
	useRowState,
	useSortBy,
	useTable
} from 'react-table';
import useColumnProps from '../../helpers/useColumnProps';
import { useData } from '../../providers/data';
import fleetColumns from './columns';
import { FleetType } from './type';

export default function useFleetTable( data, equipBetter, setEquipBetter ) {
	const fleetData = useData<FleetType>();
	
	const tableOptions = useMemo( () => ( {
		columns: fleetColumns( equipBetter, setEquipBetter, fleetData ),
		// list of ships with the local data loaded
		data,
		getRowId              : ( { id } ) => id,
		defaultColumn         : { width: 10 },
		initialState          : {
			hiddenColumns: [ 'equipType' ],
			sortBy       : [ { id: 'tier' }, { id: 'lvl', desc: true } ]
		},
		filterTypes           : {
			// case-insensitive ignores accents in strings
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
	} as TableOptions<any> ), [ data, equipBetter ] );
	
	return useTable(
		tableOptions,
		useFlexLayout,
		useRowState,
		useFilters,
		useGlobalFilter,
		useSortBy,
		useColumnProps
	);
}
