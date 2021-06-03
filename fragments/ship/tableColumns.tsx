import React from 'react';
import { Column } from 'react-table';

import SVGIcon, { TierIcon } from '../../lib/icons';
import { nationColors, rarityColors, tierColors, typeColors } from '../../lib/reference/colors';
import { equippable, equipTier } from '../../lib/reference/equipRef';

const Rarity = {
	'Decisive'  : 0,
	'Ultra Rare': 0,
	'Priority'  : 1,
	'Super Rare': 1,
	'Elite'     : 2,
	'Rare'      : 3,
	'Common'    : 4
};

export default function tableColumns( equipBetter, setEquipBetterDelay ) {
	return [
		{
			Header  : 'Name',
			accessor: 'name',
			minWidth: 40
		},
		{
			Header  : 'Rarity',
			accessor: 'rarity',
			minWidth: 20,
			color   : ( { value } ) => rarityColors[ value ],
			sortType: ( rowA, rowB, columnId ) =>
				Rarity[ rowA.values[ columnId ] ] - Rarity[ rowB.values[ columnId ] ]
		},
		{
			Header  : 'Nation',
			accessor: 'nation',
			minWidth: 20,
			color   : ( { value } ) => nationColors[ value ]
		},
		{
			Header  : 'Type',
			accessor: 'type',
			minWidth: 20,
			color   : ( { value } ) => typeColors[ value ]
		},
		{
			Header  : 'Tier',
			accessor: 'tier',
			minWidth: 10,
			Cell( { value } ) {
				switch ( value ) {
				case 6:
					return '';
				case 5:
					return 'N';
				default:
					return value;
				}
			},
			disableGlobalFilter: true,
			sortType           : 'number'
		},
		{
			Header  : 'Love',
			accessor: 'love',
			minWidth: 10,
			Cell( { value } ) {
				return [
					<SVGIcon key='emptyHeart' name='emptyHeart'/>,
					<SVGIcon key='heart' name='heart'/>,
					<SVGIcon key='ring' name='ring'/>,
					<><SVGIcon name='ring'/><SVGIcon name='heart'/></>
				][ value ];
			},
			disableGlobalFilter: true,
			sortType           : 'number',
			sortDescFirst      : true
		},
		{
			Header  : 'Level',
			accessor: 'lvl',
			minWidth: 10,
			Cell( { value } ) {
				return value === 121 ? <SVGIcon name='star'/> : value;
			},
			disableGlobalFilter: true,
			sortType           : 'number',
			sortDescFirst      : true
		},
		{
			Header  : 'Equips',
			accessor: 'equip',
			minWidth: 20,
			Cell( { value } ) {
				return value?.map( ( equip, i ) => <TierIcon key={i} tier={equip[ 2 ]}/> );
			},
			color( { row } ) {
				if ( equipBetter.value[ row.id ] ) {
					return tierColors[ Math.min( ...equipBetter.value[ row.id ].filter( Boolean ) ) - 1 ];
				}
			},
			disableGlobalFilter: true,
			filter( rows, id, filterValue ) {
				if ( !filterValue?.id ) return rows;
				
				const equipBetter = rows.reduce( ( acc, row ) => {
					acc[ row.id ] = row.values.equip.map( ( value, index ) => {
						// ships that can equip the equipment
						if ( !equippable[ row.values.equipType[ index ] ].includes( filterValue.type ) ) return 0;
						const tierList = equipTier[ row.values.equipType[ index ] ];
						// is equipped already
						if ( value?.[ 0 ] === filterValue.id ) return 6;
						// equip not in tier list
						if ( !tierList[ filterValue.id ] ) return 0;
						const tier = tierList[ filterValue.id ]?.[ 0 ] + 1;
						// none equipped
						if ( !value?.[ 0 ] ) return tier;
						// forced BiS
						if ( value[ 1 ] ) return 0;
						// current equip not in tier list
						if ( !tierList[ value[ 0 ] ] ) return tier;
						// remove those that have higher tier
						if ( tierList[ value[ 0 ] ][ 1 ] <= tierList[ filterValue.id ][ 1 ] ) return 0;
						return tier;
					} );
					return acc;
				}, {} );
				setEquipBetterDelay( filterValue, equipBetter );
				return rows.filter( ( row ) => equipBetter[ row.id ].some( val => val ) );
			},
			disableSortBy: true
		},
		{
			accessor           : 'equipType',
			disableGlobalFilter: true
		}
	] as Column[];
}
