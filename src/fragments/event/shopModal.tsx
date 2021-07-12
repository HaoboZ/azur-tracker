import { Box, DialogContent, Grid, ListItemText, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataDisplay from '../../components/dataDisplay';
import FormattedTextField from '../../components/formattedTextField';
import { PageModalContainer } from '../../components/pageModal';
import { useModal } from '../../lib/providers/modal';
import eventRef from '../../lib/reference/eventRef';
import { event_setShop } from '../../lib/store/reducers/eventReducer';

export default function ShopModal( { index } ) {
	const event = useSelector( state => state.event );
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	
	const [ shop, setShop ] = React.useState( event.shop );
	
	// expected cost to buy wanted items and total cost to buy everything
	const [ expectedCost, buyoutCost ] = React.useMemo(
		() => eventRef.shop.reduce( ( total, item ) => [
			total[ 0 ] + item.cost * Math.min( item.amount, shop[ item.name ] || 0 ),
			total[ 1 ] + item.cost * item.amount
		], [ 0, 0 ] ),
		[ shop ] );
	
	return <PageModalContainer
		onClose={() => closeModal( index )}
		title='Shop Items'
		onSave={() => dispatch( event_setShop( shop, expectedCost ) )}>
		<DialogContent sx={{ padding: 0 }}>
			<Box mx={2} mt={2}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Typography>Buyout Price: {buyoutCost}</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography>Expected Price: {expectedCost}</Typography>
					</Grid>
				</Grid>
			</Box>
			<DataDisplay
				data={eventRef.shop}
				tableProps={{
					columnHeader: [
						'Name',
						'Cost',
						'Amount',
						'Wanted'
					],
					columns     : ( item ) => [
						item.name,
						item.cost,
						item.amount,
						<FormattedTextField
							key='name'
							type='number'
							placeholder='0'
							value={shop[ item.name ]}
							onChange={( e ) => {
								setShop( {
									...shop,
									[ item.name ]: Math.min( Math.max( parseInt( e.target.value ) || 0, 0 ), item.amount )
								} );
							}}
						/>
					]
				}}
				listProps={{
					renderRow( item ) {
						return <Grid container spacing={2}>
							<Grid item xs={9}>
								<ListItemText
									primary={item.name}
									secondary={`cost: ${item.cost} amount: ${item.amount}`}
								/>
							</Grid>
							<Grid item xs={3}>
								<FormattedTextField
									type='number'
									label='Wanted'
									placeholder='0'
									value={shop[ item.name ]}
									onChange={( e ) => {
										setShop( {
											...shop,
											[ item.name ]: Math.min( Math.max( parseInt( e.target.value ) || 0, 0 ), item.amount )
										} );
									}}
								/>
							</Grid>
						</Grid>;
					}
				}}
			/>
		</DialogContent>
	</PageModalContainer>;
}
