import { Theme, useMediaQuery } from '@mui/material';
import { ReactNode } from 'react';
import { Row, TableInstance } from 'react-table';
import VirtualList from './virtualList';
import VirtualTable from './virtualTable';

export default function VirtualDisplay<Item extends object>( { renderRow, ...table }: {
	onClick?: ( row: Row<Item> ) => void,
	renderRow: ( row: Row<Item> ) => ReactNode
} & TableInstance<Item> ) {
	if ( useMediaQuery<Theme>( ( { breakpoints } ) => breakpoints.up( 'sm' ) ) ) {
		return <VirtualTable { ...table }/>;
	} else {
		return <VirtualList { ...table } renderRow={ renderRow }/>;
	}
}
