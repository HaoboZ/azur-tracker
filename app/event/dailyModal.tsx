import { Grid, ListItemSecondaryAction } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import { cloneDeep } from 'lodash-es';
import { nanoid } from 'nanoid';
import { Fragment, useMemo, useState } from 'react';
import ActionTitle from '../../src/components/actionTitle';
import DataDisplay, { useDataDisplay } from '../../src/components/dataDisplay';
import { deleteColumn, deleteIcon } from '../../src/components/dataDisplay/extras/delete';
import { sortColumn, sortIcon } from '../../src/components/dataDisplay/extras/sort';
import FormattedTextField from '../../src/components/formattedTextField';
import { ResponsiveModalContainer } from '../../src/layout/providers/modal/responsiveModal';
import { useAppDispatch, useAppSelector } from '../../src/store/hooks';
import { event_setDaily } from '../../src/store/reducers/eventReducer';

const columnHelper = createColumnHelper<{ id: string, name: string, amount: number }>();

export default function DailyModal() {
	const _daily = useAppSelector( ( { event } ) => event.daily );
	const dispatch = useAppDispatch();
	
	const [ daily, setDaily ] = useState( () => cloneDeep( _daily ) );
	
	// total points gained daily
	const dailyTotal = useMemo(
		() => daily.reduce( ( total, item ) => total + +item.amount, 0 ),
		[ daily ] );
	
	function modifyItem( index: number, item: { id?: string, name?: string, amount?: number } ) {
		if ( 'amount' in item ) {
			item.amount = Math.max( item.amount || 0, 0 );
		}
		daily[ index ] = { ...daily[ index ], ...item };
		setDaily( [ ...daily ] );
	}
	
	const columns = useMemo( () => [
		columnHelper.display( sortColumn() ),
		columnHelper.accessor( 'name', {
			header: 'Name',
			cell  : ( { getValue, row } ) => (
				<FormattedTextField
					key='name'
					fullWidth
					type='text'
					value={getValue()}
					onChange={( { target } ) => modifyItem( row.index, { name: target.value } )}
				/>
			)
		} ),
		columnHelper.accessor( 'amount', {
			header: 'Amount',
			cell  : ( { getValue, row } ) => (
				<FormattedTextField
					key='amount'
					type='number'
					placeholder='0'
					value={getValue()}
					onChange={( { target } ) => modifyItem( row.index, { amount: parseInt( target.value ) } )}
				/>
			)
		} ),
		columnHelper.display( deleteColumn() )
	], [] );
	
	const table = useDataDisplay( {
		data         : daily,
		setData      : setDaily,
		columns,
		getRowId     : ( { id } ) => id,
		enableSorting: false,
		renderRow    : ( { cells, render, row, table } ) => (
			<Fragment>
				{sortIcon()}
				<Grid container spacing={2}>
					<Grid item xs={6}>
						{render( cells.name )}
					</Grid>
					<Grid item xs={4}>
						{render( cells.amount )}
					</Grid>
				</Grid>
				<ListItemSecondaryAction>
					{deleteIcon( row, table )}
				</ListItemSecondaryAction>
			</Fragment>
		)
	} );
	
	return (
		<ResponsiveModalContainer
			title='Daily Points'
			sx={{ p: 0 }}
			onSave={() => dispatch( event_setDaily( { daily, total: dailyTotal } ) )}>
			<ActionTitle
				variant='h6'
				actions={[ {
					name       : 'Add',
					onClick    : () => setDaily( [ ...daily, { id: nanoid(), name: '', amount: 0 } ] ),
					buttonProps: { color: 'primary' }
				} ]}>
				Total Daily: {dailyTotal}
			</ActionTitle>
			<DataDisplay table={table}/>
		</ResponsiveModalContainer>
	);
}
