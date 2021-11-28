import { Theme, useMediaQuery } from '@mui/material';
import EnhancedList from './enhancedList';
import EnhancedTable from './enhancedTable';
import { EnhancedDisplayProps, EnhancedListProps, EnhancedTableProps } from './helpers';

export default function EnhancedDisplay<Item>( {
	listProps,
	tableProps,
	...props
}: EnhancedDisplayProps<Item> & {
	listProps: EnhancedListProps<Item>,
	tableProps: EnhancedTableProps<Item>
} ) {
	if ( useMediaQuery<Theme>( ( { breakpoints } ) => breakpoints.up( 'sm' ) ) ) {
		return <EnhancedTable { ...props } { ...tableProps }/>;
	} else {
		return <EnhancedList { ...props } { ...listProps }/>;
	}
}
