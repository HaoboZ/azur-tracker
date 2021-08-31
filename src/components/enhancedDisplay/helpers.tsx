import { ListProps, TableContainerProps } from '@material-ui/core';
import React from 'react';

import { ActionButtonProps, ActionTitleProps } from '../actionTitle';

export type EnhancedDisplayProps<Item> = {
	title?: React.ReactNode,
	actionTitleProps?: ActionTitleProps,
	data: Item[],
	// extra check for memo, needs to be memoized
	extraData?: any,
	// required if sortable is true
	setData?: ( items: Item[] ) => void,
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
	loading?: boolean,
	loadingComponent?: React.ReactNode,
	emptyComponent?: React.ReactNode
};

export type EnhancedListProps<Item> = {
	renderRow: ( item: Item, index: number, onDelete?: () => void ) => React.ReactNode,
	renderPanel?: ( item: Item, index: number ) => React.ReactNode,
	removeEditing?: boolean,
	addButtonProps?: ActionButtonProps,
	editButtonProps?: ActionButtonProps
} & Omit<ListProps, 'title'>;

export type EnhancedTableProps<Item> = {
	columnHeader: React.ReactNodeArray,
	columns: ( item: Item, index: number ) => React.ReactNodeArray
} & Omit<TableContainerProps, 'title'>;

export function _deleteRow( data, setData, editable, selectable,
	item, index, selected, totalSelected ) {
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

export function _selectRow( selectable,
	item, index, selected, totalSelected ) {
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
