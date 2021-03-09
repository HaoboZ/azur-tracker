import { Column } from 'material-table';

import {
	mappedColorClasses,
	nationColors,
	rarityColors,
	tierColors,
	typeColors
} from '../../lib/reference/colors';
import shipRef from '../../lib/reference/shipRef';

export default function TableColumns() {
	return [
		{
			title:    'Name',
			field:    'name',
			minWidth: 150,
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
			title:    'Rarity',
			field:    'rarity',
			minWidth: 100,
			cellStyle( _, rowData ) {
				return mappedColorClasses[ rarityColors[ rowData?.rarity ] ];
			}
		},
		{
			title:    'Nation',
			field:    'nation',
			minWidth: 150,
			cellStyle( _, rowData ) {
				return mappedColorClasses[ nationColors[ rowData?.nation ] ];
			}
		},
		{
			title:    'Type',
			field:    'type',
			minWidth: 150,
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
			minWidth:    50,
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
			minWidth: 50,
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
			minWidth: 50,
			render( data, type ) {
				const val: number = type === 'group' ? data as any : data.lvl;
				return val === 121 ? '★' : val;
			},
			searchable: false
		},
		{
			title:      'Equips',
			field:      'equipTier',
			align:      'center',
			minWidth:   50,
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
}
