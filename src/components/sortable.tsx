import { styled, useTheme } from '@mui/material';
import type { ComponentType, HTMLAttributes, ReactHTML, ReactNode } from 'react';
import { Fragment, useEffect, useState } from 'react';
import type { ReactSortableProps } from 'react-sortablejs';
import { ReactSortable } from 'react-sortablejs';
import { isEqual, map, omit } from 'underscore';
import cloneDeep from '../helpers/cloneDeep';

const StyledReactSortable = styled( ReactSortable )( {} );

export default function Sortable<Item extends { id: string | number }>( { items, setItems, renderItem, ...props }: {
	items: Item[],
	setItems: ( items: Item[] ) => void,
	renderItem: ( props: { item: Item, index: number, handle: HTMLAttributes<any> } ) => ReactNode,
	tag?: ComponentType | keyof ReactHTML
} & Omit<ReactSortableProps<Item>, 'tag' | 'list' | 'setList'> ) {
	const theme = useTheme();
	
	const [ skip, setSkip ] = useState( false );
	const [ list, setList ] = useState<Item[]>( () => cloneDeep( items ) );
	
	useEffect( () => {
		if ( skip ) {
			setSkip( false );
			return;
		}
		setList( cloneDeep( items ) );
	}, [ items ] );
	
	return (
		<StyledReactSortable
			list={list}
			setList={( items: Item[] ) => {
				if ( isEqual( map( list, 'id' ), map( items, 'id' ) ) ) return;
				setList( items );
				setItems( items.map( ( item ) => omit( item, [ 'selected', 'chosen', 'filtered' ] ) as unknown as Item ) );
				setSkip( true );
			}}
			handle='.sortable-handle'
			sx={{ '.sortable-ghost': { bgcolor: ( { palette } ) => `${palette.primary.main} !important` } }}
			animation={theme.transitions.duration.shorter}
			{...props as any}>
			{list.map( ( item, index ) => (
				<Fragment key={item.id}>
					{renderItem( { item, index, handle: { className: 'sortable-handle' } } )}
				</Fragment>
			) )}
		</StyledReactSortable>
	);
}
