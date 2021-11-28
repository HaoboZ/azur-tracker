import { styled, useTheme } from '@mui/material';
import { omit } from 'lodash';
import { ComponentType, Fragment, HTMLAttributes, ReactHTML, ReactNode, useEffect, useState } from 'react';
import { ReactSortable, ReactSortableProps } from 'react-sortablejs';

const StyledReactSortable = styled( ReactSortable )( {} );

export default function Sortable<Item extends { id: string | number }>( { items, setItems, renderItem, ...props }: {
	items: Item[],
	setItems: ( items: Item[] ) => void,
	renderItem: ( props: { item: Item, index: number, handle: HTMLAttributes<any> } ) => ReactNode,
	tag?: ComponentType | keyof ReactHTML
} & Omit<ReactSortableProps<Item>, 'tag' | 'list' | 'setList'> ) {
	const theme = useTheme();
	
	const [ skip, setSkip ] = useState( false );
	const [ list, setList ] = useState<Item[]>( () => [ ...items ] );
	
	useEffect( () => {
		if ( skip ) {
			setSkip( false );
			return;
		}
		setList( [ ...items ] );
	}, [ items ] );
	
	return (
		<StyledReactSortable
			list={ list }
			setList={ ( items: Item[] ) => {
				setList( items );
				setItems( items.map( ( item ) => omit( item, [ 'selected', 'chosen', 'filtered' ] ) as Item ) );
				setSkip( true );
			} }
			handle='.sortable-handle'
			sx={ { '& .sortable-ghost': { bgcolor: ( { palette } ) => `${ palette.primary.main } !important` } } }
			animation={ theme.transitions.duration.shorter }
			{ ...props as any }>
			{ list.map( ( item, index ) => (
				<Fragment key={ item.id }>
					{ renderItem( { item, index, handle: { className: 'sortable-handle' } } ) }
				</Fragment>
			) ) }
		</StyledReactSortable>
	);
}
