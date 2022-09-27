import type { SxProps } from '@mui/material';
import { styled, useTheme } from '@mui/material';
import { isEqual, map } from 'lodash-es';
import { nanoid } from 'nanoid';
import type { ComponentType, ReactHTML, ReactNode } from 'react';
import { Fragment, useEffect, useState } from 'react';
import type { ReactSortableProps } from 'react-sortablejs';
import { ReactSortable } from 'react-sortablejs';

const StyledReactSortable = styled( ReactSortable )( {} );

export default function Sortable<Item>( { items, setItems, renderItem, sx, ...props }: {
	items: Item[],
	setItems: ( items: Item[] ) => void,
	renderItem: ( props: { item: Item, index: number, handleClass: string } ) => ReactNode,
	tag?: ComponentType | keyof ReactHTML,
	sx?: SxProps
} & Omit<ReactSortableProps<Item>, 'tag' | 'list' | 'setList'> ) {
	const theme = useTheme();
	
	const [ skip, setSkip ] = useState( false );
	const [ list, setList ] = useState<{ id: string, item: Item }[]>( () =>
		items.map( ( item ) => ( { id: nanoid(), item } ) ) );
	
	useEffect( () => {
		if ( skip ) {
			setSkip( false );
			return;
		}
		setList( items.map( ( item ) => ( { id: nanoid(), item } ) ) );
	}, [ items ] );
	
	return (
		<StyledReactSortable
			list={list}
			setList={( items: { id: string, item: Item }[] ) => {
				if ( isEqual( map( list, 'id' ), map( items, 'id' ) ) ) return;
				setList( items );
				setItems( map( items, 'item' ) );
				setSkip( true );
			}}
			handle='.sortable-handle'
			sx={{ '.sortable-ghost': { bgcolor: ( { palette } ) => `${palette.primary.main} !important` }, ...sx }}
			animation={theme.transitions.duration.shorter}
			{...props as any}>
			{list.map( ( { id, item }, index ) => (
				<Fragment key={id}>
					{renderItem( { item, index, handleClass: 'sortable-handle' } )}
				</Fragment>
			) )}
		</StyledReactSortable>
	);
}
