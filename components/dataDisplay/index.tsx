import { List, TableContainer, Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';

import EnhancedList from './enhancedList';
import EnhancedTable from './enhancedTable';

export default function DataDisplay<Item>( {
	listProps,
	tableProps,
	...props
}: {
	title?: React.ReactNode
	data: Item[]
	sortable?: boolean
	editable?: boolean
	setData?: ( items: Item[] ) => void // required if sortable or editable is true
	newData?: () => Item | Promise<Item>  // required if editable is true
	listProps: {
		renderRow: ( item: Item, index: number ) => React.ReactNode,
		renderPanel?: ( item: Item, index: number ) => React.ReactNode
	} & React.ComponentProps<typeof List>
	tableProps: {
		columnHeader: React.ReactNodeArray
		columns: ( item: Item, index: number ) => React.ReactNodeArray
	} & React.ComponentProps<typeof TableContainer>
} ) {
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	
	return wide
		? <EnhancedTable {...tableProps} {...props as any}/>
		: <EnhancedList {...listProps} {...props as any}/>;
}
