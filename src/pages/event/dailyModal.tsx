import { Grid, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import { useMemo, useState } from 'react';
import EnhancedDisplay from '../../components/enhancedDisplay';
import FormattedTextField from '../../components/formattedTextField';
import cloneDeep from '../../helpers/cloneDeep';
import { ResponsiveModalContainer } from '../../providers/modal/responsiveModal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { event_setDaily } from '../../store/reducers/eventReducer';

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
	
	return (
		<ResponsiveModalContainer
			title='Daily Points'
			sx={{ p: 0 }}
			onSave={() => dispatch( event_setDaily( { daily, total: dailyTotal } ) )}>
			<EnhancedDisplay
				sortable
				title={<Typography>Total Daily: {dailyTotal}</Typography>}
				items={daily}
				setItems={setDaily}
				editable={{
					newData: () => ( { id: nanoid(), name: '', amount: 0 } )
				}}
				tableProps={{
					headers: [
						'Name',
						'Amount'
					],
					columns: ( item, index ) => [
						<FormattedTextField
							key='name'
							fullWidth
							type='text'
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
					renderRow: ( item, index ) => (
						<Grid container spacing={2}>
							<Grid item xs={9}>
								<FormattedTextField
									fullWidth
									type='text'
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
					)
				}}
			/>
		</ResponsiveModalContainer>
	);
}
