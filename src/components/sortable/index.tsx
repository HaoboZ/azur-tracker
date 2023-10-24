import type { Active } from '@dnd-kit/core';
import {
	defaultDropAnimationSideEffects,
	DndContext,
	DragOverlay,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { nanoid } from 'nanoid';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import SortableItem from './sortableItem';

export default function Sortable<Item>({
	items,
	setItems,
	renderItem,
}: {
	items: Item[];
	setItems: (items: Item[]) => void;
	renderItem: (item: Item, containerProps, handleProps) => ReactNode;
}) {
	const [setA, setSetA] = useState(false);
	const [skipB, setSkipB] = useState(true);
	const [list, setList] = useState<{ id: string; item: Item }[]>(() =>
		items.map((item) => ({ id: nanoid(), item })),
	);
	const [active, setActive] = useState<Active>(null);

	const activeItem = useMemo(() => {
		if (!active) return null;
		return list.find(({ id }) => id === active?.id);
	}, [active, list]);

	useEffect(() => {
		if (!setA) return;
		setSetA(false);
		setSkipB(true);
		setItems(list.map(({ item }) => item));
	}, [list]);

	useEffect(() => {
		if (skipB) return setSkipB(false);
		setList(items.map((item) => ({ id: nanoid(), item })));
	}, [items]);

	return (
		<DndContext
			sensors={useSensors(useSensor(PointerSensor))}
			onDragStart={({ active }) => setActive(active)}
			onDragEnd={({ active, over }) => {
				setSetA(true);
				if (!over || active.id === over.id) return;

				const activeIndex = list.findIndex(({ id }) => id === active.id);
				const overIndex = list.findIndex(({ id }) => id === over.id);
				setList(arrayMove(list, activeIndex, overIndex));
				setActive(null);
			}}
			onDragCancel={() => setActive(null)}>
			<SortableContext items={list}>
				{list.map(({ id, item }) => (
					<SortableItem key={id} id={id} item={item} renderItem={renderItem} />
				))}
			</SortableContext>
			<DragOverlay
				dropAnimation={{
					sideEffects: defaultDropAnimationSideEffects({
						styles: { active: { opacity: '0.4' } },
					}),
				}}>
				{activeItem && (
					<SortableItem id={activeItem.id} item={activeItem.item} renderItem={renderItem} />
				)}
			</DragOverlay>
		</DndContext>
	);
}