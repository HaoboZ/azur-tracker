import { Star as StarIcon } from '@mui/icons-material';
import { Box } from '@mui/material';
import { Column } from 'react-table';
import { factionColors, rarityColors, tierColors, typeColors } from '../colors';
import { equippable, equipTier } from './ship/equip/data';
import { AffinityIcons, TierIcon } from './tierIcon';

const Rarity = {
	'Decisive'  : 0,
	'Ultra Rare': 0,
	'Priority'  : 1,
	'Super Rare': 1,
	'Elite'     : 2,
	'Rare'      : 3,
	'Common'    : 4
};

export default function fleetColumns( equipBetter, setEquipBetter ): Column<any>[] {
	return [ {
		Header  : 'Name',
		accessor: 'name',
		width   : 40,
		Cell( { value } ) {
			return (
				<Box sx={ {
					whiteSpace  : 'nowrap',
					overflow    : 'hidden',
					textOverflow: 'ellipsis'
				} }>{ value }
				</Box>
			);
		},
		props: { style: { minWidth: '80px' } }
	}, {
		Header  : 'Rarity',
		accessor: 'rarity',
		width   : 20,
		Cell( { value } ) {
			return (
				<Box sx={ {
					whiteSpace  : 'nowrap',
					overflow    : 'hidden',
					textOverflow: 'ellipsis'
				} }>{ value }
				</Box>
			);
		},
		props: ( cell ) => ( {
			className: cell && `color-${rarityColors[ cell.value ]}`,
			style    : { minWidth: '80px' }
		} ),
		sortType: ( rowA, rowB, columnId ) => Rarity[ rowA.values[ columnId ] ] - Rarity[ rowB.values[ columnId ] ]
	}, {
		Header  : 'Faction',
		accessor: 'faction',
		width   : 20,
		Cell( { value } ) {
			return (
				<Box sx={ {
					whiteSpace  : 'nowrap',
					overflow    : 'hidden',
					textOverflow: 'ellipsis'
				} }>{ value }
				</Box>
			);
		},
		props: ( cell ) => ( {
			className: cell && `color-${factionColors[ cell.value ]}`,
			style    : { minWidth: '90px' }
		} )
	}, {
		Header  : 'Type',
		accessor: 'type',
		width   : 20,
		Cell( { value } ) {
			return (
				<Box sx={ {
					whiteSpace  : 'nowrap',
					overflow    : 'hidden',
					textOverflow: 'ellipsis'
				} }>{ value }
				</Box>
			);
		},
		props: ( cell ) => ( {
			className: cell && `color-${typeColors[ cell.value ]}`,
			style    : { minWidth: '73px' }
		} )
	}, {
		Header  : 'Tier',
		accessor: 'tier',
		width   : 10,
		Cell( { value } ) {
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
		props              : { style: { minWidth: '68px' } },
		disableGlobalFilter: true,
		sortType           : 'basic'
	}, {
		Header  : 'Love',
		accessor: 'love',
		width   : 10,
		Cell( { value } ) {
			return AffinityIcons[ value ];
		},
		props              : { style: { minWidth: '73px' } },
		disableGlobalFilter: true,
		sortType           : 'number',
		sortDescFirst      : true
	}, {
		Header  : 'Level',
		accessor: 'lvl',
		width   : 10,
		Cell( { value } ) {
			return value === 126 ? <StarIcon fontSize='small'/> : value;
		},
		props              : { style: { minWidth: '76px' } },
		disableGlobalFilter: true,
		sortType           : 'number',
		sortDescFirst      : true
	}, {
		Header  : 'Equips',
		accessor: 'equip',
		width   : 25,
		Cell( { value, row } ) {
			return equipBetter.value[ row.id ]
				? `+${Math.max( ...equipBetter.value[ row.id ].filter( Boolean ).map( ( equip ) => equip[ 1 ] ) )}`
				: value?.some( ( equip ) => equip[ 2 ] )
				&& value.map( ( equip, i ) => <TierIcon key={ i } tier={ equip[ 2 ] }/> );
		},
		props: ( cell ) => ( {
			className: cell && equipBetter.value[ cell.row.id ]
				? `color-${tierColors[ Math.min( ...equipBetter.value[ cell.row.id ]
					.filter( Boolean ).map( ( equip ) => equip[ 0 ] ) ) ]}`
				: undefined,
			style: { minWidth: '116px' }
		} ),
		disableGlobalFilter: true,
		filter             : ( rows, id, filterValue ) => {
			if ( !filterValue?.id ) {
				if ( equipBetter.filter ) setEquipBetter( { filter: undefined, value: {} } );
				return rows;
			} else if ( filterValue === equipBetter.filter ) {
				return rows.filter( ( { id } ) => equipBetter.value[ id ]?.some( Boolean ) );
			} else {
				const newEquipBetter = rows.reduce( ( acc, row ) => {
					acc[ row.id ] = row.values.equip.map( ( value, index ) => {
						// ships that can equip the equipment
						if ( !equippable[ row.values.equipType[ index ] ]?.includes( filterValue.type ) ) return false;
						const tierList = equipTier[ row.values.equipType[ index ] ];
						const newTier = tierList[ filterValue.id ],
						      oldTier = tierList[ value[ 0 ] ];
						// equip not in tier list
						if ( !newTier ) return false;
						// none equipped
						if ( !value?.[ 0 ] ) return [ newTier[ 0 ], 99 ];
						// is equipped already
						if ( value[ 0 ] === filterValue.id ) return [ 5, 0 ];
						// forced BiS
						if ( value[ 1 ] ) return false;
						// current equip not in tier list
						if ( !oldTier ) return [ newTier[ 0 ], 99 ];
						// remove those that have higher tier
						if ( oldTier[ 1 ] <= newTier[ 1 ] ) return false;
						return [ newTier[ 0 ], oldTier[ 1 ] - newTier[ 1 ] ];
					} );
					return acc;
				}, {} );
				
				setEquipBetter( { filter: filterValue, value: newEquipBetter } );
				return rows.filter( ( { id } ) => newEquipBetter[ id ].some( Boolean ) );
			}
		},
		disableSortBy: true
	}, {
		accessor           : 'equipType',
		disableGlobalFilter: true
	} ];
}
