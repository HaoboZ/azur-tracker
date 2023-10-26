import type { VirtualItem, Virtualizer as _Virtualizer } from '@tanstack/react-virtual';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

export default function Virtualizer<Data>({
	rows,
	estimateSize,
	paddingStart,
	children,
}: {
	rows: Data[];
	estimateSize?: number;
	paddingStart?: number;
	children: (
		virtualizer: _Virtualizer<Window, Element>,
		virtualItems: VirtualItem[],
		paddingTop: number,
		paddingBottom: number,
	) => ReactNode;
}) {
	const virtualizer = useWindowVirtualizer({
		count: rows.length,
		estimateSize: () => estimateSize || 50,
		overscan: 10,
		paddingStart,
	});

	const virtualItems = virtualizer.getVirtualItems();

	const paddingTop =
		virtualItems.length > 0 ? Math.max(0, virtualItems[0].start - paddingStart) || 0 : 0;
	const paddingBottom =
		virtualItems.length > 0 ? virtualizer.getTotalSize() - (virtualItems.at(-1).end || 0) : 0;

	return <Fragment>{children(virtualizer, virtualItems, paddingTop, paddingBottom)}</Fragment>;
}
