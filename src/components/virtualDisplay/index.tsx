import { Theme, useMediaQuery } from '@material-ui/core';
import { isEqual } from 'lodash';
import React from 'react';
import { shallowEqual } from 'react-redux';
import { Row, TableInstance } from 'react-table';

import VirtualList from './virtualList';
import VirtualTable from './virtualTable';

const VirtualDisplay = React.memo( function VirtualDisplay( {
	renderRow,
	...table
}: TableInstance & {
	onClick?: ( row: Row ) => void,
	renderRow: React.FunctionComponent<{ row: Row, onClick: ( row: Row ) => void, rowProps }>
} ) {
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	
	if ( wide ) {
		return <VirtualTable {...table}/>;
	} else {
		return <VirtualList {...table} renderRow={renderRow}/>;
	}
}, ( prevProps, nextProps ) =>
	isEqual( prevProps.state, nextProps.state )
	&& shallowEqual( prevProps.rows, nextProps.rows ) );
export default VirtualDisplay;
