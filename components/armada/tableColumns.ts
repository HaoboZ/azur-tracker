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
				case 4:
					return '';
				case 3:
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
				const val: number = type === 'group' ? data as any : data.love;
				return [ '♡', '♥', '💍', '💍♥' ][ val ];
			},
			searchable: false
		},
		{
			title: 'Level',
			field: 'lvl',
			type:  'numeric',
			align: 'left',
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
