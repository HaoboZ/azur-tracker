import { Checkbox, ListItemIcon } from '@mui/material';
import type { Row } from '@tanstack/react-table';
import type { DisplayColumnDef } from '@tanstack/table-core';
import type { ReactNode } from 'react';

export const selectColumn: () => DisplayColumnDef<any> = () => ( {
	id    : '_select',
	size  : 0,
	header: ( { table } ) => (
		<Checkbox
			checked={table.getIsAllRowsSelected()}
			indeterminate={table.getIsSomeRowsSelected()}
			onChange={table.getToggleAllRowsSelectedHandler()}
		/>
	),
	cell  : ( { row } ) => (
		<Checkbox
			checked={row.getIsSelected()}
			indeterminate={row.getIsSomeSelected()}
			onClick={( e ) => e.stopPropagation()}
			onChange={row.getToggleSelectedHandler()}
		/>
	)
} );

export const selectIcon: <TData>( row: Row<TData> ) => ReactNode = ( row ) => (
	<ListItemIcon>
		<Checkbox
			checked={row.getIsSelected()}
			indeterminate={row.getIsSomeSelected()}
			onClick={( e ) => e.stopPropagation()}
			onChange={row.getToggleSelectedHandler()}
		/>
	</ListItemIcon>
);