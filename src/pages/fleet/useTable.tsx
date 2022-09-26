import { Star as StarIcon } from '@mui/icons-material';
import { ListItemSecondaryAction, ListItemText } from '@mui/material';
import type { Cell, ColumnDef } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { isNumber, keyBy, map, max, min } from 'lodash-es';
import dynamic from 'next/dynamic';
import { Fragment, useMemo } from 'react';
import { useVirtualDisplay } from '../../components/virtualDisplay';
import { useData } from '../../providers/data';
import { useModal } from '../../providers/modal';
import { factionColors, rarityColors, tierColors, typeColors } from '../colors';
import { AffinityIcons, TierIcon } from './tierIcon';
import type { FleetType, Ship } from './type';

const ShipModal = dynamic( () => import( './ship/modal' ), { suspense: true } );

declare module '@tanstack/table-core' {
	// noinspection JSUnusedGlobalSymbols
	interface FilterMeta {
		equip: ( false | { tier?, major?, minor? } )[]
	}
}

const Rarity = {
	'Decisive'  : 0,
	'Ultra Rare': 0,
	'Priority'  : 1,
	'Super Rare': 1,
	'Elite'     : 2,
	'Rare'      : 3,
	'Common'    : 4
};

export default function useFleetTable( data ) {
	const { showModal } = useModal();
	const { equippableData, equipTierData } = useData<FleetType>();
	
	const columns = useMemo<ColumnDef<Ship>[]>( () => [ {
		header     : 'Name',
		accessorKey: 'name',
		size       : 40
	}, {
		header     : 'Rarity',
		accessorKey: 'rarity',
		size       : 20,
		meta       : {
			className: ( { getValue }: Cell<any, any> ) => {
				const value = getValue();
				return value && `color-${rarityColors[ value ]}`;
			}
		},
		sortingFn  : ( rowA, rowB, columnId ) =>
			Rarity[ rowA.getValue( columnId ) as string ] - Rarity[ rowB.getValue( columnId ) as string ]
	}, {
		header     : 'Faction',
		accessorKey: 'faction',
		size       : 20,
		meta       : {
			className: ( { getValue }: Cell<any, any> ) => {
				const value = getValue();
				return value && `color-${factionColors[ value ]}`;
			}
		}
	}, {
		header     : 'Type',
		accessorKey: 'type',
		size       : 20,
		meta       : {
			className: ( { getValue }: Cell<any, any> ) => {
				const value = getValue();
				return value && `color-${typeColors[ value ]}`;
			}
		}
	}, {
		header            : 'Tier',
		accessorKey       : 'tier',
		size              : 10,
		cell              : ( { getValue } ) => {
			const value = getValue();
			switch ( value ) {
			case 7:
				return '?';
			case 6:
				return 'N';
			case -1:
				return 'EX';
			default:
				return value;
			}
		},
		enableGlobalFilter: false
	}, {
		header            : 'Love',
		accessorKey       : 'love',
		size              : 10,
		cell              : ( { getValue } ) => AffinityIcons[ getValue() as number ],
		enableGlobalFilter: false,
		sortDescFirst     : true
	}, {
		header            : 'Level',
		accessorKey       : 'lvl',
		size              : 10,
		cell              : ( { getValue } ) => {
			const value = getValue();
			return value === 126 ? <StarIcon fontSize='small'/> : value;
		},
		enableGlobalFilter: false,
		sortDescFirst     : true
	}, {
		header            : 'Equips',
		accessorKey       : 'equip',
		size              : 25,
		cell              : ( { getValue, row, column } ) => {
			const value = getValue<[ number, number, number ][]>();
			if ( row.columnFiltersMeta[ column.id ] ) {
				const majorCount = max( map( row.columnFiltersMeta[ column.id ]?.equip, 'major' ) );
				if ( isNumber( majorCount ) ) return `↑${majorCount}`;
				const minorCount = max( map( row.columnFiltersMeta[ column.id ]?.equip, 'minor' ) );
				if ( isNumber( minorCount ) ) return `+${minorCount}`;
				return 'EQUIPPED';
			}
			if ( !value?.some( ( equip ) => equip[ 2 ] ) ) return null;
			return value.map( ( equip, i ) => <TierIcon key={i} tier={equip[ 2 ]}/> );
		},
		meta              : {
			className: ( cell ) => cell.row.columnFiltersMeta[ cell.column.id ]?.equip
				? `color-${tierColors[ min( map( cell.row.columnFiltersMeta[ cell.column.id ]?.equip, 'tier' ) ) ]}`
				: undefined
		},
		enableGlobalFilter: false,
		filterFn          : ( row, columnId, filterValue, addMeta ) => {
			const equip: ( false | { tier?, major?, minor? } )[] = row.original.equip.map( ( value, index ) => {
				// ships that can equip the equipment
				if ( !equippableData[ row.original.equipType[ index ] ]?.equip.includes( filterValue.type ) ) return false;
				const tierList = equipTierData[ equippableData[ row.original.equipType[ index ] ]?.tier ];
				const newTier = tierList[ filterValue.id ],
				      oldTier = tierList[ value[ 0 ] ];
				
				// is equipped already
				if ( +value?.[ 0 ] === +filterValue.id ) return {};
				// equip not in tier list
				if ( !newTier ) return false;
				// none equipped
				if ( !value?.[ 0 ] ) return { tier: newTier[ 0 ], major: Infinity };
				// forced BiS
				if ( value[ 1 ] ) return false;
				// current equip not in tier list
				if ( !oldTier ) return { tier: newTier[ 0 ], major: Infinity };
				if ( oldTier[ 0 ] < newTier[ 0 ] ) return false;
				// if higher tier
				if ( oldTier[ 0 ] > newTier[ 0 ] ) return { tier: newTier[ 0 ], major: oldTier[ 0 ] - newTier[ 0 ] };
				// if same tier but better
				if ( oldTier[ 1 ] > newTier[ 1 ] ) return { tier: newTier[ 0 ], minor: oldTier[ 1 ] - newTier[ 1 ] };
				return false;
			} );
			addMeta( { equip } );
			return equip.some( Boolean );
		},
		enableSorting     : false
	} ], [] );
	
	return useVirtualDisplay( {
		data,
		columns,
		initialState: {
			sorting: [ { id: 'tier', desc: false }, { id: 'lvl', desc: true } ]
		},
		getRowId    : ( { id } ) => id,
		onRowClick  : ( row, table ) => showModal( ShipModal, {
			variant: 'drawer',
			bottom : true,
			props  : {
				ship         : row.original,
				filterMeta   : row.columnFiltersMeta.equip?.equip,
				selectedEquip: table.getColumn( 'equip' ).getFilterValue() as any
			}
		} ),
		renderRow   : ( row ) => {
			const cells = keyBy( row.getVisibleCells(), 'column.id' );
			
			const render = ( cell ) => flexRender( cell.column.columnDef.cell, cell.getContext() ) as any;
			const className = ( cell ) => cell.column.columnDef.meta?.className?.( cell );
			
			return (
				<Fragment>
					<ListItemText
						primary={(
							<Fragment>
								{cells.name.getValue()}
								{' - Tier: '}{render( cells.tier )}
								{' - '}{render( cells.lvl )}
								{' / '}{render( cells.love )}
							</Fragment>
						)}
						secondary={`${cells.rarity.getValue()} - ${cells.faction.getValue()} - ${cells.type.getValue()}`}
					/>
					<ListItemSecondaryAction className={className( cells.equip )}>
						{render( cells.equip )}
					</ListItemSecondaryAction>
				</Fragment>
			);
		}
	} );
}
