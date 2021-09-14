import {
	DndContext,
	DragOverlay,
	KeyboardSensor,
	LayoutMeasuringStrategy,
	PointerSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core';
import {
	arrayMove,
	defaultAnimateLayoutChanges,
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Portal } from '@mui/material';
import React from 'react';

export default function Sortable<Item extends { id: string }>( {
	items,
	setItems,
	renderItem,
	overlayWrapper,
	overlayStyle,
	overlayWrapperElement
}: {
	items: Item[],
	setItems: ( items: Item[] ) => void,
	renderItem: ( props: {
		item: Item,
		index: number,
		ref?: React.RefObject<any>,
		style?: React.CSSProperties,
		handle?: React.HTMLAttributes<any>,
		wrapper?: boolean
	} ) => React.ReactNode,
	overlayWrapper?: ( children: React.ReactNode ) => React.ReactNode,
	overlayStyle?: React.CSSProperties,
	overlayWrapperElement?: keyof JSX.IntrinsicElements
} ) {
	const sensors = useSensors(
		useSensor( PointerSensor ),
		useSensor( KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates } )
	);
	
	const [ activeItem, setActiveItem ] = React.useState<{ item: Item, index: number, wrapper: boolean }>( null );
	
	const overlay = <DragOverlay zIndex={2000} wrapperElement={overlayWrapperElement} style={overlayStyle}>
		{activeItem ? renderItem( activeItem ) : null}
	</DragOverlay>;
	
	return <DndContext
		sensors={sensors}
		onDragStart={( { active } ) => {
			const index = items.findIndex( ( { id } ) => id === active.id );
			if ( index !== -1 ) setActiveItem( { item: items[ index ], index, wrapper: true } );
		}}
		onDragEnd={( { active, over } ) => {
			setActiveItem( null );
			if ( !over ) return;
			if ( active.id !== over.id ) {
				const activeIndex = active.data.current.sortable.index;
				const overIndex = over.data.current?.sortable.index || 0;
				setItems( arrayMove( items, activeIndex, overIndex ) );
			}
		}}
		layoutMeasuring={{ strategy: LayoutMeasuringStrategy.BeforeDragging }}>
		<SortableContext items={items}>
			{items.map( ( item, index ) => <SortableItem
				key={item.id}
				item={item}
				index={index}
				renderItem={renderItem}
				invisible={activeItem && index === activeItem.index}
			/> )}
		</SortableContext>
		<Portal>{overlayWrapper?.( overlay ) ?? overlay}</Portal>
	</DndContext>;
}

function SortableItem( { item, index, renderItem, invisible }: {
	item,
	index: number,
	renderItem,
	invisible?: boolean
} ) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable( {
		id                  : item.id,
		animateLayoutChanges: ( args ) => args.isSorting || args.wasSorting ? defaultAnimateLayoutChanges( args ) : true
	} );
	
	return renderItem( {
		item,
		index,
		ref   : setNodeRef,
		style : {
			opacity   : +!invisible,
			transform : CSS.Transform.toString( transform ),
			transition: transition ?? undefined
		},
		handle: { ...attributes, ...listeners, style: { touchAction: 'none' } }
	} );
}
