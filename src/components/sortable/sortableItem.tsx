import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function SortableItem({ id, item, renderItem }) {
	return renderItem(item);
	const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
		id,
	});

	const trans = transform ?? { x: 0, y: 0, scaleX: 1, scaleY: 1 };
	return renderItem(
		item,
		{
			ref: setNodeRef,
			style: {
				opacity: isDragging ? 0.4 : undefined,
				transform: CSS.Transform.toString(trans),
				transition,
			},
			...attributes,
		},
		listeners,
	);
}
