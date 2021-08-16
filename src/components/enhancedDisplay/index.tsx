import { ListProps, TableContainerProps, Theme, useMediaQuery } from '@material-ui/core';
import { omit } from 'lodash';
import React from 'react';
import { shallowEqual } from 'react-redux';

import EnhancedList from './enhancedList';
import EnhancedTable from './enhancedTable';

const EnhancedDisplay = React.memo( function EnhancedDisplay<Item>( {
	listProps,
	tableProps,
	...props
}: {
	title?: React.ReactNode,
	data: Item[],
	// required if sortable or editable is true
	setData?: ( items: Item[] ) => void,
	editable?: {
		newData: () => Item | Promise<Item>,
		min?: number,
		max?: number
	},
	sortable?: boolean,
	selectable?: {
		selected: string[],
		onSelect?: ( id: string, adding: boolean ) => void,
		min?: number,
		max?: number
	},
	listProps: {
		renderRow: ( item: Item, index: number ) => React.ReactNode,
		renderPanel?: ( item: Item, index: number ) => React.ReactNode
	} & ListProps,
	tableProps: {
		columnHeader: React.ReactNodeArray,
		columns: ( item: Item, index: number ) => React.ReactNodeArray
	} & TableContainerProps
} ) {
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	
	if ( wide ) {
		return <EnhancedTable {...tableProps} {...props as any}/>;
	} else {
		return <EnhancedList {...listProps} {...props as any}/>;
	}
}, ( prevProps, nextProps ) => shallowEqual(
	omit( prevProps, [ 'tableProps', 'listProps' ] ),
	omit( nextProps, [ 'tableProps', 'listProps' ] )
) );
export default EnhancedDisplay;
