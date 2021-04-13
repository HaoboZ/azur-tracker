import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	makeStyles,
	TextField,
	Typography
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import eventRef from '../../lib/reference/eventRef';
import { event_setShop } from '../../lib/store/reducers/eventReducer';
import EnhancedTable from '../enhancedTable';

const useStyles = makeStyles( {
	numberInput: {
		textAlign:                                                    'right',
		'&[type=number]':                                             {
			'-moz-appearance': 'textfield'
		},
		'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
			'-webkit-appearance': 'none',
			margin:               0
		}
	}
} );

export default function ShopDialog( { status, closeDialog }: {
	status: boolean
	closeDialog: () => void
} ) {
	const event    = useSelector( store => store.event ),
	      dispatch = useDispatch();
	const classes = useStyles();
	
	const [ shop, setShop ] = React.useState( event.shop );
	React.useEffect( () => {
		if ( status ) setShop( event.shop );
	}, [ status ] );
	
	// expected cost to buy wanted items and total cost to buy everything
	const [ expectedCost, buyoutCost ] = React.useMemo( () =>
		eventRef.shop.reduce( ( total, item ) => [
			total[ 0 ] + item.cost * Math.min( item.amount, shop[ item.name ] || 0 ),
			total[ 1 ] + item.cost * item.amount
		], [ 0, 0 ] ), [ shop ] );
	
	return <Dialog
		open={status}
		onClose={closeDialog}
		maxWidth='md'
		fullWidth
		disablePortal
		disableEnforceFocus
		disableAutoFocus
		closeAfterTransition>
		<DialogTitle>Shop Items</DialogTitle>
		<DialogContent>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Typography>Buyout Price: {buyoutCost}</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography>Expected Price: {expectedCost}</Typography>
				</Grid>
			</Grid>
			<Box margin={2}/>
			<EnhancedTable
				data={eventRef.shop}
				columnHeader={[
					'Name',
					'Cost',
					'Amount',
					'Wanted'
				]}
				columns={( item ) => [
					item.name,
					item.cost,
					item.amount,
					<TextField
						type='number'
						inputProps={{ className: classes.numberInput }}
						value={shop[ item.name ] || 0}
						onChange={( e ) => {
							shop[ item.name ] = Math.min( Math.max( parseInt( e.target.value ) || 0, 0 ), item.amount );
							setShop( { ...shop } );
						}}
					/>
				]}
			/>
		</DialogContent>
		<DialogActions>
			<Button variant='contained' color='primary' onClick={() => {
				dispatch( event_setShop( shop, expectedCost ) );
				closeDialog();
			}}>
				Save
			</Button>
			<Button variant='contained' color='secondary' onClick={closeDialog}>
				Cancel
			</Button>
		</DialogActions>
	</Dialog>;
}
