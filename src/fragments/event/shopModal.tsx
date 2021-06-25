import { Box, DialogContent, Grid, ListItemText, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataDisplay from '../../components/dataDisplay';
import PageModal from '../../components/pageModal';
import eventRef from '../../lib/reference/eventRef';
import { event_setShop } from '../../lib/store/reducers/eventReducer';

export default function ShopModal( { open, onClose }: {
	open: boolean,
	onClose: () => void
} ) {
	const event = useSelector( state => state.event );
	const dispatch = useDispatch();
	
	const [ shop, setShop ] = React.useState( event.shop );
	React.useEffect( () => {
		if ( open ) setShop( event.shop );
	}, [ open ] );
	
	// expected cost to buy wanted items and total cost to buy everything
	const [ expectedCost, buyoutCost ] = React.useMemo(
		() => eventRef.shop.reduce( ( total, item ) => [
			total[ 0 ] + item.cost * Math.min( item.amount, shop[ item.name ] || 0 ),
			total[ 1 ] + item.cost * item.amount
		], [ 0, 0 ] ),
		[ shop ] );
	
	return <PageModal
		open={open}
		onClose={onClose}
		title='Shop Items'
		onSave={() => dispatch( event_setShop( shop, expectedCost ) )}>
		<DialogContent style={{ padding: 0 }}>
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
						<TextField
							key='name'
							type='number'
							value={shop[ item.name ] || 0}
							onChange={( e ) => {
								shop[ item.name ] = Math.min( Math.max( parseInt( e.target.value ) || 0, 0 ), item.amount );
								setShop( { ...shop } );
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
								<TextField
									type='number'
									label='Wanted'
									value={shop[ item.name ] || 0}
									onChange={( e ) => {
										shop[ item.name ] = Math.min( Math.max( parseInt( e.target.value ) || 0, 0 ), item.amount );
										setShop( { ...shop } );
									}}
								/>
							</Grid>
						</Grid>;
					}
				}}
			/>
		</DialogContent>
	</PageModal>;
}