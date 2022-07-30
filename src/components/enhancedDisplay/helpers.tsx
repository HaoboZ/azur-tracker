import type { ButtonProps, ListProps, TableCellProps, TableContainerProps } from '@mui/material';
import type { ReactNode } from 'react';
import type { ActionTitleProps } from './actionTitle';

export type EnhancedDisplayProps<Item> = {
	title?: ReactNode,
	actionTitleProps?: ActionTitleProps,
	items: Item[],
	// extra check for memo, needs to be memoized
	extraData?: any,
	// required if sortable is true
	setItems?: ( items: Item[] ) => void,
	editable?: {
		// required if setData is set
		newData?: () => Item | Promise<Item>,
		// required if setData is not set
		onAdd?: () => void,
		onDelete?: ( item: Item, index: number ) => void,
		min?: number,
		max?: number
	},
	sortable?: boolean,
	selectable?: {
		selected: string[],
		setSelected?: ( selected: string[] ) => void,
		min?: number,
		max?: number
	},
	emptyComponent?: ReactNode
};

export type EnhancedListProps<Item> = {
	renderRow: ( item: Item, index: number, onDelete?: () => void ) => ReactNode,
	renderPanel?: ( item: Item, index: number ) => ReactNode,
	removeEditing?: boolean,
	addButtonProps?: ButtonProps,
	editButtonProps?: ButtonProps
} & Omit<ListProps, 'title'>;

export type EnhancedTableProps<Item> = {
	headers: ReactNode[],
	columns: ( item: Item, index: number ) => ReactNode[],
	cellProps?: TableCellProps[],
	// cannot be sortable
	renderPanel?: ( item: Item, index: number ) => ReactNode
} & Omit<TableContainerProps, 'title'>;

export function _deleteRow( data, setData, editable, selectable, item, index, selected, totalSelected ) {
	const _data = [ ...data ];
	const deleted = _data.splice( index, 1 );
	editable.onDelete?.( deleted[ 0 ], index );
	setData?.( _data );
	
	if ( selected && totalSelected <= selectable?.min ) {
		const newSelected = selectable.selected.filter( ( id ) => id !== ( item.id ?? index ) );
		const selected = _data.find( ( { id } ) => !newSelected.includes( id ) );
		if ( selected ) {
			newSelected.push( selected.id ?? index );
			selectable.setSelected( newSelected );
		}
	}
}

export function _selectRow( selectable, item, index, selected, totalSelected ) {
	let newSelected = [ ...selectable.selected ];
	if ( selected ) {
		if ( totalSelected <= selectable?.min ) return;
		newSelected = newSelected.filter( ( id ) => id !== ( item?.id ?? index ) );
	} else {
		if ( totalSelected >= selectable?.max ) newSelected.shift();
		newSelected.push( item?.id ?? index );
	}
	selectable.setSelected( newSelected );
}
