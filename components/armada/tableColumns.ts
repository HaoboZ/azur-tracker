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
			// width: '15%',
			customFilterAndSearch( term, rowData ) {
				let regex: RegExp;
				let isValid = true;
				try {
					regex = new RegExp( term, 'i' );
				} catch ( e ) {
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
			// width: '15%',
			cellStyle( _, rowData ) {
				return mappedColorClasses[ rarityColors[ rowData?.rarity ] ];
			}
		},
		{
			title: 'Nation',
			field: 'nation',
			// width: '15%',
			cellStyle( _, rowData ) {
				return mappedColorClasses[ nationColors[ rowData?.nation ] ];
			}
		},
		{
			title: 'Type',
			field: 'type',
			// width: '15%',
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
			// width:       '10%',
			render( data, type ) {
				const val: number = type === 'group' ? data as any : data.tier;
				switch ( val ) {
				case undefined:
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
			// width: '10%',
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
			// width: '10%',
			render( data, type ) {
				const val: number = type === 'group' ? data as any : data.lvl;
				return val === 121 ? '★' : val;
			},
			searchable: false
		},
		{
			title: 'Equips',
			field: 'equipTier',
			align: 'center',
			// width:      '10%',
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
