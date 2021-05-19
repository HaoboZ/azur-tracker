import { Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { Row, TableInstance } from 'react-table';

import VirtualList from './virtualList';
import VirtualTable from './virtualTable';

export default function VirtualDisplay( {
	onPress,
	RenderListItem,
	...table
}: TableInstance & {
	onPress?: ( row: Row ) => void,
	RenderListItem: React.FunctionComponent<{ row: Row, onPress, props }>
} ) {
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	
	return wide
		? <VirtualTable {...table} onPress={onPress}/>
		: <VirtualList {...table} onPress={onPress} RenderListItem={RenderListItem}/>;
}
