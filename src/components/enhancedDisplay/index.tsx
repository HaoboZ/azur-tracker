import { useWideMedia } from '../../hooks/useWideMedia';
import EnhancedList from './enhancedList';
import EnhancedTable from './enhancedTable';
import { EnhancedDisplayProps, EnhancedListProps, EnhancedTableProps } from './helpers';

export default function EnhancedDisplay<Item>( { listProps, tableProps, ...props }: {
	listProps: EnhancedListProps<Item>,
	tableProps: EnhancedTableProps<Item>
} & EnhancedDisplayProps<Item> ) {
	if ( useWideMedia() ) {
		return <EnhancedTable {...props} {...tableProps}/>;
	} else {
		return <EnhancedList {...props} {...listProps}/>;
	}
}
