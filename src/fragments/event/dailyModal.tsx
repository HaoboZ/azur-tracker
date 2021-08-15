import { DialogContent, Grid, Typography } from '@material-ui/core';
import { nanoid } from 'nanoid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EnhancedDisplay from '../../components/enhancedDisplay';
import FormattedTextField from '../../components/formattedTextField';
import { PageModalContainer } from '../../components/pageModal';
import { useModalControls } from '../../lib/providers/modal';
import { event_setDaily } from '../../lib/store/reducers/eventReducer';

export default function DailyModal() {
	const controls = useModalControls();
	const _daily = useSelector( state => state.event.daily );
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
	
	return <PageModalContainer
		onClose={() => controls.close()}
		title='Daily Points'
		onSave={() => dispatch( event_setDaily( { daily, total: dailyTotal } ) )}>
		<DialogContent sx={{ p: 0 }}>
			<EnhancedDisplay
				title={<Typography>Total Daily: {dailyTotal}</Typography>}
				data={daily}
				setData={setDaily}
				editable={{
					newData: () => ( { id: nanoid( 16 ), name: '', amount: 0 } )
				}}
				sortable
				tableProps={{
					columnHeader: [
						'Name',
						'Amount'
					],
					columns     : ( item, index ) => [
						<FormattedTextField
							key='name'
							type='text'
							fullWidth
							value={item.name}
							onChange={( e ) =>
								modifyItem( index, { name: e.target.value } )}
						/>,
						<FormattedTextField
							key='amount'
							type='number'
							placeholder='0'
							value={item.amount}
							onChange={( e ) =>
								modifyItem( index, { amount: parseInt( e.target.value ) } )}
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
								onChange={( e ) =>
									modifyItem( index, { name: e.target.value } )}
							/>
						</Grid>
						<Grid item xs={3}>
							<FormattedTextField
								type='number'
								label='Amount'
								placeholder='0'
								value={item.amount}
								onChange={( e ) =>
									modifyItem( index, { amount: parseInt( e.target.value ) } )}
							/>
						</Grid>
					</Grid>
				}}
			/>
		</DialogContent>
	</PageModalContainer>;
}
