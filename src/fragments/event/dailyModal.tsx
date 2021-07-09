import { DialogContent, Grid, Typography } from '@material-ui/core';
import { nanoid } from 'nanoid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataDisplay from '../../components/dataDisplay';
import FormattedTextField from '../../components/formattedTextField';
import PageModal, { PageModalContainer } from '../../components/pageModal';
import { event_setDaily } from '../../lib/store/reducers/eventReducer';

export default function DailyModal( { open, onClose }: {
	open: boolean,
	onClose: () => void
} ) {
	const event = useSelector( state => state.event );
	const dispatch = useDispatch();
	
	const [ daily, setDaily ] = React.useState( event.daily );
	React.useEffect( () => {
		if ( open ) setDaily( event.daily );
	}, [ open ] );
	
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
	
	return <PageModal
		open={open}
		onClose={onClose}>
		<PageModalContainer
			onClose={onClose}
			title='Daily Points'
			onSave={() => dispatch( event_setDaily( daily, dailyTotal ) )}>
			<DialogContent sx={{ padding: 0 }}>
				<DataDisplay
					title={<Typography>Total Daily: {dailyTotal}</Typography>}
					data={daily}
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
						renderRow( item, index ) {
							return <Grid container spacing={2}>
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
							</Grid>;
						}
					}}
					setData={setDaily}
					newData={() => ( { id: nanoid( 16 ), name: '', amount: 0 } )}
					editable
				/>
			</DialogContent>
		</PageModalContainer>
	</PageModal>;
}
