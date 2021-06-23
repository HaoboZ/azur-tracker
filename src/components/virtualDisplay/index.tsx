import { Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { Row, TableInstance } from 'react-table';

import VirtualList from './virtualList';
import VirtualTable from './virtualTable';

export default function VirtualDisplay( {
	RenderRow,
	...table
}: TableInstance & {
	onClick?: ( row: Row ) => void,
	RenderRow: React.FunctionComponent<{ row: Row, onClick: ( row: Row ) => void, rowProps }>
} ) {
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ), { noSsr: true } );
	
	if ( wide ) {
		return <VirtualTable {...table}/>;
	} else {
		return <VirtualList {...table} RenderRow={RenderRow}/>;
	}
}
