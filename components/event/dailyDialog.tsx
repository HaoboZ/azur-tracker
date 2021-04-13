import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	makeStyles,
	TextField
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { event_setDaily } from '../../lib/store/reducers/eventReducer';
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

export default function DailyDialog( { status, closeDialog }: {
	status: boolean
	closeDialog: () => void
} ) {
	const event    = useSelector( store => store.event ),
	      dispatch = useDispatch();
	const classes = useStyles();
	
	const [ daily, setDaily ] = React.useState( event.daily );
	React.useEffect( () => {
		if ( status ) setDaily( event.daily );
	}, [ status ] );
	
	// total points gained daily
	const dailyTotal = React.useMemo( () =>
		daily.reduce( ( total, item ) => total + item.amount, 0 ), [ daily ] );
	
	function modifyItem( index: number, item: { name?: string, amount?: number } ) {
		if ( 'amount' in item ) item.amount = Math.max( item.amount || 0, 0 );
		daily[ index ] = { ...daily[ index ], ...item };
		setDaily( [ ...daily ] );
	}
	
	return <Dialog
		open={status}
		onClose={closeDialog}
		maxWidth='md'
		fullWidth
		disablePortal
		disableEnforceFocus
		disableAutoFocus
		closeAfterTransition>
		<DialogTitle>Daily Points</DialogTitle>
		<DialogContent>
			<DialogContentText>
				Total Daily: {dailyTotal}
			</DialogContentText>
			<EnhancedTable
				data={daily}
				columnHeader={[
					'Name',
					'Amount'
				]}
				columns={( item, index ) => [
					<TextField
						type='text' fullWidth
						value={item.name}
						onChange={( e ) =>
							modifyItem( index, { name: e.target.value } )}
					/>,
					<TextField
						type='number'
						inputProps={{ className: classes.numberInput }}
						value={item.amount}
						onChange={( e ) =>
							modifyItem( index, { amount: parseInt( e.target.value ) } )}
					/>
				]}
				setData={setDaily}
				newData={() => ( { name: '', amount: 0 } )}
				sortable
				editable
			/>
		</DialogContent>
		<DialogActions>
			<Button variant='contained' color='primary' onClick={() => {
				dispatch( event_setDaily( daily, dailyTotal ) );
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
