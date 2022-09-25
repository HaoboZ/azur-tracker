import { useWindowVirtualizer } from '@tanstack/react-virtual';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

export default function Virtualizer<Data>( { rows, estimateSize, paddingStart, children }: {
	rows: Data[],
	estimateSize?: number,
	paddingStart?: number,
	children: ( virtualItems, paddingTop, paddingBottom ) => ReactNode
} ) {
	const virtualizer = useWindowVirtualizer( {
		count       : rows.length,
		estimateSize: () => estimateSize || 50,
		overscan    : 10,
		paddingStart
	} );
	
	const virtualItems = virtualizer.getVirtualItems();
	
	const paddingTop = virtualItems.length > 0 ? Math.max( 0, virtualItems[ 0 ].start - paddingStart ) || 0 : 0;
	const paddingBottom = virtualItems.length > 0
		? virtualizer.getTotalSize() - ( virtualItems[ virtualItems.length - 1 ].end || 0 )
		: 0;
	
	return <Fragment>{children( virtualItems, paddingTop, paddingBottom )}</Fragment>;
}
