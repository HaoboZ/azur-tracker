import { Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';

import EnhancedList from './enhancedList';
import EnhancedTable from './enhancedTable';
import { EnhancedDisplayProps, EnhancedListProps, EnhancedTableProps } from './helpers';

export default function EnhancedDisplay<Item>( {
	listProps,
	tableProps,
	...props
}: EnhancedDisplayProps<Item> & {
	listProps: EnhancedListProps<Item>,
	tableProps: EnhancedTableProps<Item>
} ) {
	if ( useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) ) ) {
		return <EnhancedTable {...props} {...tableProps}/>;
	} else {
		return <EnhancedList {...props} {...listProps}/>;
	}
}
