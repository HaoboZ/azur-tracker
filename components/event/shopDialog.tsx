import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography
} from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';

import eventRef from '../../lib/reference/eventRef';
import { useTypedSelector } from '../../lib/store';
import { event_setShop } from '../../lib/store/eventReducer';

const useStyles = makeStyles( ( theme ) => ( {
	table:       {
		'& tr:nth-of-type(odd),& th': {
			backgroundColor: theme.palette.type === 'dark'
				                 ? theme.palette.action.hover : theme.palette.action.focus
		}
	},
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
} ) );

export default function ShopDialog( { status, closeDialog }: {
	status: boolean
	closeDialog: () => void
} ) {
	const event    = useTypedSelector( store => store.event ),
	      dispatch = useDispatch();
	
	const classes = useStyles();
	
	const [ shop, setShop ] = React.useState( event.shop );
	React.useEffect( () => {
		if ( status ) setShop( event.shop );
	}, [ status ] );
	
	// expected cost to buy wanted items and total cost to buy everything
	const [ expectedCost, buyoutCost ] = React.useMemo( () =>
		Object.keys( eventRef.shop ).reduce( ( total, itemName ) => {
			const item = eventRef.shop[ itemName ];
			return [
				total[ 0 ] + item.cost * Math.min( item.amount, shop[ itemName ] || 0 ),
				total[ 1 ] + item.cost * item.amount
			];
		}, [ 0, 0 ] ), [ shop ] );
	
	return <Dialog
		open={ status }
		onClose={ closeDialog }
		maxWidth='md'
		fullWidth
		disablePortal
		disableEnforceFocus
		disableAutoFocus
		closeAfterTransition>
		<DialogTitle>Shop Items</DialogTitle>
		<DialogContent>
			<Grid container spacing={ 2 }>
				<Grid item xs={ 6 }>
					<Typography>Buyout Price: { buyoutCost }</Typography>
				</Grid>
				<Grid item xs={ 6 }>
					<Typography>Expected Price: { expectedCost }</Typography>
				</Grid>
			</Grid>
			<Box margin={ 2 }/>
			<TableContainer component={ Paper }>
				<Table size='small' className={ classes.table }>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Cost</TableCell>
							<TableCell align='right'>Amount</TableCell>
							<TableCell align='right'>Wanted</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ Object.keys( eventRef.shop ).map( ( itemName, index ) => {
							const item = eventRef.shop[ itemName ];
							return <TableRow key={ index }>
								<TableCell>{ itemName }</TableCell>
								<TableCell>{ item.cost }</TableCell>
								<TableCell align='right'>{ item.amount }</TableCell>
								<TableCell align='right'>
									<TextField
										type='number'
										inputProps={ { className: classes.numberInput } }
										value={ shop[ itemName ] || 0 }
										onChange={ ( e ) => {
											shop[ itemName ] = Math.min( Math.max( parseInt( e.target.value ) || 0, 0 ), item.amount );
											setShop( { ...shop } );
										} }
									/>
								</TableCell>
							</TableRow>;
						} ) }
					</TableBody>
				</Table>
			</TableContainer>
		</DialogContent>
		<DialogActions>
			<Button variant='contained' color='primary' onClick={ () => {
				dispatch( event_setShop( shop, expectedCost ) );
				closeDialog();
			} }>
				Save
			</Button>
			<Button variant='contained' color='secondary' onClick={ closeDialog }>
				Cancel
			</Button>
		</DialogActions>
	</Dialog>;
}
