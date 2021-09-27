import { styled, useTheme } from '@mui/material';
import { keyBy, pick } from 'lodash';
import React from 'react';
import { ItemInterface, ReactSortable, ReactSortableOptions } from 'react-sortablejs';

const StyledReactSortable = styled( ReactSortable )( {} );

export default function Sortable<T extends { id }>( { items, setItems, renderItem, ...props }: {
	items: T[],
	setItems: ( items: T[] ) => void,
	renderItem: ( props: { item: T, index: number, handle: React.HTMLAttributes<any> } ) => React.ReactNode,
	tag?: React.ComponentType | keyof React.ReactHTML
} & ReactSortableOptions ) {
	const theme = useTheme();
	
	const [ list, setList ] = React.useState<ItemInterface[]>( () => items.map( ( item ) => pick( item, 'id' ) ) );
	
	React.useEffect( () => {
		setList( items.map( ( item ) => pick( item, 'id' ) ) );
	}, [ items ] );
	
	const dataKeyed = React.useMemo( () => keyBy<T>( items, ( { id } ) => id ), [ items ] );
	
	return <StyledReactSortable
		list={list}
		setList={setList}
		onEnd={() => setItems( list.map( ( { id } ) => dataKeyed[ id ] ) )}
		handle='.sortable-handle'
		sx={{ '& .sortable-ghost': { bgcolor: ( { palette } ) => `${palette.primary.main} !important` } }}
		// ghostClass='selectedSort'
		// forceFallback
		animation={theme.transitions.duration.shorter}
		{...props as any}>
		{list.map( ( { id }, index ) => <React.Fragment key={id}>
			{renderItem( { item: dataKeyed[ id ], index, handle: { className: 'sortable-handle' } } )}
		</React.Fragment> )}
	</StyledReactSortable>;
}
