import { Delete as DeleteIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import type { ColumnDef, Row, Table } from '@tanstack/react-table';
import { map } from 'lodash-es';
import type { ReactNode } from 'react';

export const deleteColumn: <TData>() => ColumnDef<TData> = () => ( {
	id  : '_delete',
	size: 0,
	cell: ( { row, table } ) => (
		<IconButton onClick={( e ) => {
			e.stopPropagation();
			table.options.meta.setData(
				map( table.getRowModel().rows.filter( ( { id } ) => id !== row.id ), 'original' )
			);
		}}>
			<DeleteIcon/>
		</IconButton>
	)
} );

export const deleteIcon: <TData>( row: Row<TData>, table: Table<TData> ) => ReactNode = ( row, table ) => (
	<IconButton onClick={( e ) => {
		e.stopPropagation();
		table.options.meta.setData(
			map( table.getRowModel().rows.filter( ( { id } ) => id !== row.id ), 'original' )
		);
	}}>
		<DeleteIcon/>
	</IconButton>
);
