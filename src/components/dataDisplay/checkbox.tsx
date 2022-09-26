import { Checkbox, ListItemIcon } from '@mui/material';
import type { ColumnDef } from '@tanstack/react-table';

export const checkboxColumn: <TData>() => ColumnDef<TData> = () => ( {
	id    : 'select',
	size  : 0,
	header: ( { table } ) => (
		<Checkbox
			checked={table.getIsAllRowsSelected()}
			indeterminate={table.getIsSomeRowsSelected()}
			onChange={table.getToggleAllRowsSelectedHandler()}
		/>
	),
	cell  : ( { row } ) => (
		<div className='px-1'>
			<Checkbox
				checked={row.getIsSelected()}
				indeterminate={row.getIsSomeSelected()}
				onClick={( e ) => e.stopPropagation()}
				onChange={row.getToggleSelectedHandler()}
			/>
		</div>
	)
} );

export const checkboxIcon = ( row ) => (
	<ListItemIcon>
		<Checkbox
			checked={row.getIsSelected()}
			indeterminate={row.getIsSomeSelected()}
			onClick={( e ) => e.stopPropagation()}
			onChange={row.getToggleSelectedHandler()}
		/>
	</ListItemIcon>
);
