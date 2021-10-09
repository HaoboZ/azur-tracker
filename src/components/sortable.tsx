import { styled, useTheme } from '@mui/material';
import { omit } from 'lodash';
import React from 'react';
import { ReactSortable, ReactSortableProps } from 'react-sortablejs';

const StyledReactSortable = styled( ReactSortable )( {} );

export default function Sortable<Item extends { id: string | number }>( { items, setItems, renderItem, ...props }: {
	items: Item[],
	setItems: ( items: Item[] ) => void,
	renderItem: ( props: { item: Item, index: number, handle: React.HTMLAttributes<any> } ) => React.ReactNode,
	tag?: React.ComponentType | keyof React.ReactHTML
} & Omit<ReactSortableProps<Item>, 'tag' | 'list' | 'setList'> ) {
	const theme = useTheme();
	
	const [ skip, setSkip ] = React.useState( false );
	const [ list, setList ] = React.useState<Item[]>( () => [ ...items ] );
	
	React.useEffect( () => {
		if ( skip ) {
			setSkip( false );
			return;
		}
		setList( [ ...items ] );
	}, [ items ] );
	
	return <StyledReactSortable
		list={list}
		setList={( items: Item[] ) => {
			setList( items );
			setItems( items.map( ( item ) => omit( item, [ 'selected', 'chosen', 'filtered' ] ) as Item ) );
			setSkip( true );
		}}
		handle='.sortable-handle'
		sx={{ '& .sortable-ghost': { bgcolor: ( { palette } ) => `${palette.primary.main} !important` } }}
		animation={theme.transitions.duration.shorter}
		{...props as any}>
		{list.map( ( item, index ) => <React.Fragment key={item.id}>
			{renderItem( { item, index, handle: { className: 'sortable-handle' } } )}
		</React.Fragment> )}
	</StyledReactSortable>;
}
