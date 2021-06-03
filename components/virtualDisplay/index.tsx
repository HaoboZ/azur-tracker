import { Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { Row, TableInstance } from 'react-table';

import VirtualList from './virtualList';
import VirtualTable from './virtualTable';

export default function VirtualDisplay( {
	onPress,
	RenderRow,
	...table
}: TableInstance & {
	onPress?: ( row: Row ) => void,
	RenderRow: React.FunctionComponent<{ row: Row, onPress, rowProps }>
} ) {
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ), { noSsr: true } );
	
	return wide
		? <VirtualTable {...table} onPress={onPress}/>
		: <VirtualList {...table} onPress={onPress} RenderRow={RenderRow}/>;
}
