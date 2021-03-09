import { Column } from 'material-table';

import {
	mappedColorClasses,
	nationColors,
	rarityColors,
	typeColors
} from '../../lib/reference/colors';
import shipRef from '../../lib/reference/shipRef';

export default [
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
] as Column<typeof shipRef[string]>[];
