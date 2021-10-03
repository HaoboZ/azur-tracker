import React from 'react';
import { Cell, Column } from 'react-table';
import SVGIcon, { TierIcon } from '../../lib/icons';
import { factionColors, rarityColors, tierColors, typeColors } from '../colors';
import { equippable, equipTier } from './ship/equipData';

const Rarity = {
	'Decisive'  : 0,
	'Ultra Rare': 0,
	'Priority'  : 1,
	'Super Rare': 1,
	'Elite'     : 2,
	'Rare'      : 3,
	'Common'    : 4
};

export default function fleetColumns( equipBetter, setEquipBetter ) {
	return [ {
		Header  : 'Name',
		accessor: 'name',
		minWidth: 40
	}, {
		Header   : 'Rarity',
		accessor : 'rarity',
		minWidth : 20,
		className: ( { value } ) => `color-${rarityColors[ value ]}`,
		sortType : ( rowA, rowB, columnId ) => Rarity[ rowA.values[ columnId ] ] - Rarity[ rowB.values[ columnId ] ]
	}, {
		Header   : 'Faction',
		accessor : 'faction',
		minWidth : 20,
		className: ( { value } ) => `color-${factionColors[ value ]}`
	}, {
		Header   : 'Type',
		accessor : 'type',
		minWidth : 20,
		className: ( { value } ) => `color-${typeColors[ value ]}`
	}, {
		Header             : 'Tier',
		accessor           : 'tier',
		minWidth           : 10,
		Cell               : ( { value } ) => {
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
		disableGlobalFilter: true,
		sortType           : 'basic'
	}, {
		Header             : 'Love',
		accessor           : 'love',
		minWidth           : 10,
		Cell               : ( { value } ) => [
			<SVGIcon key='emptyHeart' name='emptyHeart'/>,
			<SVGIcon key='heart' name='heart'/>,
			<SVGIcon key='ring' name='ring'/>,
			<><SVGIcon name='ring'/><SVGIcon name='heart'/></>
		][ value ],
		disableGlobalFilter: true,
		sortType           : 'number',
		sortDescFirst      : true
	}, {
		Header             : 'Level',
		accessor           : 'lvl',
		minWidth           : 10,
		Cell               : ( { value } ) => value === 126 ? <SVGIcon name='star'/> : value,
		disableGlobalFilter: true,
		sortType           : 'number',
		sortDescFirst      : true
	}, {
		Header             : 'Equips',
		accessor           : 'equip',
		minWidth           : 20,
		Cell               : ( { value, row } ) => equipBetter.value[ row.id ]
			? `+${Math.max( ...equipBetter.value[ row.id ].filter( Boolean ).map( ( equip ) => equip[ 1 ] ) )}`
			: value?.map( ( equip, i ) => <TierIcon key={i} tier={equip[ 2 ]}/> ),
		className          : ( { row } ) => {
			if ( equipBetter.value[ row.id ] ) {
				return `color-${tierColors[ Math.min( ...equipBetter.value[ row.id ].filter( Boolean ).map( ( equip ) => equip[ 0 ] ) ) ]}`;
			}
		},
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
		disableSortBy      : true
	}, {
		accessor           : 'equipType',
		disableGlobalFilter: true
	} ] as ( Column<any> & { className?: ( cell: Cell ) => string } )[];
}
