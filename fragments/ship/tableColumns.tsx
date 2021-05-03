import { Column } from 'material-table';
import React from 'react';

import SVGIcon from '../../lib/icons';
import { mappedColorClasses, nationColors, rarityColors, tierColors, typeColors } from '../../lib/reference/colors';
import shipRef from '../../lib/reference/shipRef';

export default [
	{
		title: 'Name',
		field: 'name',
		customFilterAndSearch( term, rowData ) {
			let regex: RegExp;
			let isValid = true;
			try {
				regex = new RegExp( term, 'i' );
			} catch {
				isValid = false;
			}
			if ( !isValid ) return false;
			return regex.test( rowData.name.normalize( 'NFD' )
				.replace( /[\u0300-\u036f]/g, '' ) );
		},
		customSort( a, b ) {
			return a.name.localeCompare( b.name );
		},
		grouping: false
	},
	{
		title: 'Rarity',
		field: 'rarity',
		cellStyle( _, rowData ) {
			return mappedColorClasses[ rarityColors[ rowData?.rarity ] ];
		}
	},
	{
		title: 'Nation',
		field: 'nation',
		cellStyle( _, rowData ) {
			return mappedColorClasses[ nationColors[ rowData?.nation ] ];
		}
	},
	{
		title: 'Type',
		field: 'type',
		cellStyle( _, rowData ) {
			return mappedColorClasses[ typeColors[ rowData?.type ] ];
		}
	},
	{
		title:       'Tier',
		field:       'tier',
		defaultSort: 'asc',
		type:        'numeric',
		align:       'left',
		render( data, type ) {
			const val: number = type === 'group' ? data as any : data.tier;
			switch ( val ) {
			case 6:
				return '';
			case 5:
				return 'N';
			default:
				return val;
			}
		}
	},
	{
		title: 'Love',
		field: 'love',
		type:  'numeric',
		align: 'left',
		render( data, type ) {
			if ( type === 'group' ) return data;
			return [
				<SVGIcon name='emptyHeart' style={{ display: 'flex' }}/>,
				<SVGIcon name='heart' style={{ display: 'flex' }}/>,
				<SVGIcon name='ring' style={{ display: 'flex' }}/>,
				<div style={{ display: 'flex' }}>
					<SVGIcon name='ring'/>
					<SVGIcon name='heart'/>
				</div>
			][ data.love ];
		},
		searchable: false
	},
	{
		title: 'Level',
		field: 'lvl',
		type:  'numeric',
		align: 'left',
		render( data, type ) {
			if ( type === 'group' ) return data;
			return data.lvl === 121 ? <SVGIcon name='star'/> : data.lvl;
		},
		searchable: false
	},
	{
		title: 'Equips',
		field: 'equipped',
		align: 'center',
		render( data, type ) {
			if ( type === 'group' ) return data;
			return data.equipped.map( ( equip, i ) => [
				<SVGIcon key={i}/>,
				<SVGIcon key={i} name='8star' color='gold'/>,
				<SVGIcon key={i} name='star' color='gold'/>,
				<SVGIcon key={i} name='star' color='silver'/>,
				<SVGIcon key={i} name='star' color='chocolate'/>,
				<SVGIcon key={i} name='star' color='black'/>,
				<SVGIcon key={i} name='circle'/>
			][ equip[ 2 ] ] );
		},
		grouping:   false,
		searchable: false,
		sorting:    false,
		cellStyle( _, rowData ) {
			if ( rowData.equipBetter.length ) {
				return mappedColorClasses[ tierColors[
				Math.min.apply( null, rowData.equipBetter.filter( Boolean ) ) - 1 ] ];
			}
		}
		
	}
] as ( Column<typeof shipRef[string]> & { minWidth?: number } )[];
