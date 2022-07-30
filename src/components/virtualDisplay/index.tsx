import type { ReactNode } from 'react';
import type { Row, TableInstance } from 'react-table';
import useWideMedia from '../../hooks/useWideMedia';
import VirtualList from './virtualList';
import VirtualTable from './virtualTable';

export default function VirtualDisplay<Item extends object>( { renderRow, ...table }: {
	onClick?: ( row: Row<Item> ) => void,
	renderRow: ( row: Row<Item> ) => ReactNode
} & TableInstance<Item> ) {
	if ( useWideMedia() ) {
		return <VirtualTable {...table}/>;
	} else {
		return <VirtualList {...table} renderRow={renderRow}/>;
	}
}
