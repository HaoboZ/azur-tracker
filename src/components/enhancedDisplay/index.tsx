import { Theme, useMediaQuery } from '@material-ui/core';
import { omit } from 'lodash';
import React from 'react';
import { shallowEqual } from 'react-redux';

import EnhancedList from './enhancedList';
import EnhancedTable from './enhancedTable';
import { EnhancedDisplayProps, EnhancedListProps, EnhancedTableProps } from './helpers';

const EnhancedDisplay = React.memo( function EnhancedDisplay<Item>( {
	listProps,
	tableProps,
	...props
}: EnhancedDisplayProps<Item> & {
	listProps: EnhancedListProps<Item>,
	tableProps: EnhancedTableProps<Item>
} ) {
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	
	if ( wide ) {
		return <EnhancedTable {...tableProps} {...props}/>;
	} else {
		return <EnhancedList {...listProps} {...props}/>;
	}
}, ( prevProps, nextProps ) => shallowEqual(
	omit( prevProps, [ 'tableProps', 'listProps' ] ),
	omit( nextProps, [ 'tableProps', 'listProps' ] )
) );
export default EnhancedDisplay;
