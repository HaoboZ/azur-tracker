import {
	DndContext,
	KeyboardSensor,
	LayoutMeasuringStrategy,
	PointerSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core';
import {
	arrayMove,
	defaultAnimateLayoutChanges,
	rectSortingStrategy,
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

export default function Sortable<Item extends { id: string }>( { items, setItems, renderItem }: {
	items: Item[],
	setItems: ( items: Item[] ) => void,
	renderItem: ( { ref, style, handle, item, index } ) => React.ReactNode
} ) {
	const sensors = useSensors(
		useSensor( PointerSensor ),
		useSensor( KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		} )
	);
	
	return <DndContext
		sensors={sensors}
		onDragEnd={( { active, over } ) => {
			if ( !over ) return;
			if ( active.id !== over.id ) {
				const activeIndex = active.data.current.sortable.index;
				const overIndex = over.data.current?.sortable.index || 0;
				setItems( arrayMove( items, activeIndex, overIndex ) );
			}
		}}
		layoutMeasuring={{ strategy: LayoutMeasuringStrategy.BeforeDragging }}>
		<SortableContext items={items} strategy={rectSortingStrategy}>
			{items.map( ( item, index ) => <SortableItem
				key={item.id}
				item={item}
				index={index}
				renderItem={renderItem}
			/> )}
		</SortableContext>
	</DndContext>;
}

function SortableItem( { item, index, renderItem } ) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable( {
		id                  : item.id,
		animateLayoutChanges: ( args ) => args.isSorting || args.wasSorting ? defaultAnimateLayoutChanges( args ) : true
	} );
	
	return renderItem( {
		ref   : setNodeRef,
		style : {
			transform : CSS.Transform.toString( transform ),
			transition: transition ?? undefined
		},
		handle: { ...attributes, ...listeners },
		item,
		index
	} );
}
