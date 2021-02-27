import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
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
	TextField
} from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';

import eventRef from '../lib/eventRef';
import { useTypedSelector } from '../lib/store';
import { event_setShop } from '../lib/store/eventReducer';

const useStyles = makeStyles( ( theme ) => ( {
	table:      {
		'& tr:nth-of-type(odd),& th': {
			backgroundColor: theme.palette.type === 'dark'
				                 ? theme.palette.action.hover : theme.palette.action.focus
		}
	},
	rightItems: {
		textAlign: 'right'
	}
} ) );

export default function EventShopDialog( { status, closeDialog } ) {
	const event    = useTypedSelector( store => store.event ),
	      dispatch = useDispatch();
	
	const classes = useStyles();
	
	const [ shop, setShop ] = React.useState( event.shop );
	const [ expectedCost, setExpectedCost ] = React.useState( 0 );
	const [ buyoutCost, setBuyoutCost ] = React.useState( 0 );
	
	function calcTotalCost() {
		let [ totalCost, buyoutCost ] = Object.keys( eventRef.shop ).reduce( ( total, itemName ) => {
			const item = eventRef.shop[ itemName ];
			return [
				total[ 0 ] + item.cost * Math.min( item.amount, shop[ itemName ] || 0 ),
				total[ 1 ] + item.cost * item.amount
			];
		}, [ 0, 0 ] );
		setExpectedCost( totalCost );
		setBuyoutCost( buyoutCost );
	}
	
	React.useEffect( () => {
		calcTotalCost();
	} );
	
	React.useEffect( () => {
		if ( status ) setShop( event.shop );
	}, [ status ] );
	
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
			<DialogContentText>
				<Grid container spacing={ 2 }>
					<Grid item xs={ 6 }>
						Buyout Price: { buyoutCost }
					</Grid>
					<Grid item xs={ 6 }>
						Expected Price: { expectedCost }
					</Grid>
				</Grid>
			</DialogContentText>
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
										inputProps={ { className: classes.rightItems } }
										value={ shop[ itemName ] || 0 }
										onChange={ ( e ) => {
											shop[ itemName ] = Math.min( Math.max( parseInt( e.currentTarget.value ) || 0, 0 ), item.amount );
											setShop( { ...shop } );
											calcTotalCost();
										} }/>
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
