import { DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { event_setDaily } from '../../lib/store/reducers/eventReducer';
import PageDialog from '../pageDialog';
import ResponsiveDataDisplay from '../responsiveDataDisplay';

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

export default function DailyDialog( { open, onClose }: {
	open: boolean
	onClose: () => void
} ) {
	const event    = useSelector( store => store.event ),
	      dispatch = useDispatch();
	const classes = useStyles();
	
	const [ daily, setDaily ] = React.useState( event.daily );
	React.useEffect( () => {
		if ( open ) setDaily( event.daily );
	}, [ open ] );
	
	// total points gained daily
	const dailyTotal = React.useMemo( () =>
		daily.reduce( ( total, item ) => total + item.amount, 0 ), [ daily ] );
	
	function modifyItem( index: number, item: { name?: string, amount?: number } ) {
		if ( 'amount' in item ) item.amount = Math.max( item.amount || 0, 0 );
		daily[ index ] = { ...daily[ index ], ...item };
		setDaily( [ ...daily ] );
	}
	
	return <PageDialog
		open={open}
		onClose={onClose}
		onSave={() => dispatch( event_setDaily( daily, dailyTotal ) )}>
		<DialogTitle>Daily Points</DialogTitle>
		<DialogContent style={{ padding: 0 }}>
			<ResponsiveDataDisplay
				title={<DialogContentText>Total Daily: {dailyTotal}</DialogContentText>}
				data={daily}
				tableProps={{
					columnHeader: [
						'Name',
						'Amount'
					],
					columns:      ( item, index ) => [
						<TextField
							type='text'
							fullWidth
							value={item.name}
							onChange={( e ) => modifyItem( index, { name: e.target.value } )}
						/>,
						<TextField
							type='number'
							inputProps={{ className: classes.numberInput }}
							value={item.amount}
							onChange={( e ) => modifyItem( index, { amount: parseInt( e.target.value ) } )}
						/>
					]
				}}
				listProps={{
					renderRow: ( item, index ) => <Grid container spacing={2}>
						<Grid item xs={9}>
							<TextField
								type='text'
								fullWidth
								label='Name'
								value={item.name}
								onChange={( e ) => modifyItem( index, { name: e.target.value } )}
							/>
						</Grid>
						<Grid item xs={3}>
							<TextField
								type='number'
								label='Amount'
								inputProps={{ className: classes.numberInput }}
								value={item.amount}
								onChange={( e ) => modifyItem( index, { amount: parseInt( e.target.value ) } )}
							/>
						</Grid>
					</Grid>
				}}
				setData={setDaily}
				newData={() => ( { name: '', amount: 0 } )}
				sortable
				editable
			/>
		</DialogContent>
	</PageDialog>;
};
