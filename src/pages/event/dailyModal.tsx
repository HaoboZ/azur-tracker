import { Grid, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EnhancedDisplay from '../../components/enhancedDisplay';
import FormattedTextField from '../../components/formattedTextField';
import { ResponsiveModalContainer } from '../../components/responsiveModal';
import { event_setDaily } from '../../lib/store/reducers/eventReducer';

export default function DailyModal() {
	const _daily = useSelector( ( { event } ) => event.daily );
	const dispatch = useDispatch();
	
	const [ daily, setDaily ] = React.useState( _daily );
	
	// total points gained daily
	const dailyTotal = React.useMemo(
		() => daily.reduce( ( total, item ) => total + +item.amount, 0 ),
		[ daily ] );
	
	function modifyItem( index: number, item: { id?: string, name?: string, amount?: string | number } ) {
		if ( 'amount' in item && typeof item.amount === 'number' ) {
			item.amount = Math.max( item.amount || 0, 0 );
		}
		daily[ index ] = { ...daily[ index ], ...item } as any;
		setDaily( [ ...daily ] );
	}
	
	return <ResponsiveModalContainer
		title='Daily Points'
		onSave={() => dispatch( event_setDaily( { daily, total: dailyTotal } ) )}
		sx={{ p: 0 }}>
		<EnhancedDisplay
			title={<Typography>Total Daily: {dailyTotal}</Typography>}
			items={daily}
			setItems={setDaily}
			editable={{
				newData: () => ( { id: nanoid(), name: '', amount: 0 } )
			}}
			sortable
			tableProps={{
				headers: [
					'Name',
					'Amount'
				],
				columns: ( item, index ) => [
					<FormattedTextField
						key='name'
						type='text'
						fullWidth
						value={item.name}
						onChange={( { target } ) => modifyItem( index, { name: target.value } )}
					/>,
					<FormattedTextField
						key='amount'
						type='number'
						placeholder='0'
						value={item.amount}
						onChange={( { target } ) => modifyItem( index, { amount: parseInt( target.value ) } )}
					/>
				]
			}}
			listProps={{
				renderRow: ( item, index ) => <Grid container spacing={2}>
					<Grid item xs={9}>
						<FormattedTextField
							type='text'
							fullWidth
							label='Name'
							value={item.name}
							onChange={( { target } ) => modifyItem( index, { name: target.value } )}
						/>
					</Grid>
					<Grid item xs={3}>
						<FormattedTextField
							type='number'
							label='Amount'
							placeholder='0'
							value={item.amount}
							onChange={( { target } ) => modifyItem( index, { amount: parseInt( target.value ) } )}
						/>
					</Grid>
				</Grid>
			}}
		/>
	</ResponsiveModalContainer>;
}
