import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
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
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../lib/store';
import { event_setDaily } from '../lib/store/eventReducer';

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

export default function eventDailyDialog( { status, closeDialog } ) {
	const event    = useTypedSelector( store => store.event ),
	      dispatch = useDispatch();
	
	const classes = useStyles();
	
	const [ daily, setDaily ] = React.useState( event.daily );
	const [ dailyTotal, setDailyTotal ] = React.useState( 0 );
	
	React.useEffect( () => {
		calcDailyTotal();
	}, [] );
	
	React.useEffect( () => {
		if ( status ) setDaily( event.daily );
	}, [ status ] );
	
	function calcDailyTotal() {
		setDailyTotal( daily.reduce( ( total, item ) => total + item.amount, 0 ) );
	}
	
	function addItem( index: number, remove?: boolean ) {
		if ( !remove && daily.length >= index ) {
			daily.splice( index, 0, { name: '', amount: 0 } );
			setDaily( [ ...daily ] );
		} else if ( daily.length > index ) {
			daily.splice( index, 1 );
			setDaily( [ ...daily ] );
			calcDailyTotal();
		}
	}
	
	function modifyItem( index: number, item: { name?: string, amount?: number } ) {
		if ( 'amount' in item ) item.amount = Math.max( item.amount || 0, 0 );
		daily[ index ] = { ...daily[ index ], ...item };
		setDaily( [ ...daily ] );
		calcDailyTotal();
	}
	
	return <Dialog
		open={ status }
		onClose={ closeDialog }
		maxWidth='md'
		fullWidth
		disablePortal
		disableEnforceFocus
		disableAutoFocus
		closeAfterTransition>
		<DialogTitle>Daily Points</DialogTitle>
		<DialogContent>
			<DialogContentText>
				Total Daily: { dailyTotal }
			</DialogContentText>
			<TableContainer component={ Paper }>
				<Table size='small' className={ classes.table }>
					<TableHead>
						<TableRow>
							<TableCell colSpan={ 2 }/>
							<TableCell width={ 400 }>Name</TableCell>
							<TableCell align='right'>Amount</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ daily.map( ( item, index ) => <TableRow key={ index }>
							<TableCell>
								<Button
									variant='contained'
									onClick={ () => addItem( index ) }>
									<AddIcon/>
								</Button>
							</TableCell>
							<TableCell>
								<Button
									variant='contained'
									onClick={ () => addItem( index, true ) }>
									<RemoveIcon/>
								</Button>
							</TableCell>
							<TableCell>
								<TextField
									type='text' fullWidth
									value={ item.name }
									onChange={ ( e ) =>
										modifyItem( index, { name: e.currentTarget.value } ) }/>
							</TableCell>
							<TableCell align='right'>
								<TextField
									type='number'
									inputProps={ { className: classes.rightItems } }
									value={ item.amount }
									onChange={ ( e ) =>
										modifyItem( index, { amount: parseInt( e.currentTarget.value ) } ) }/>
							</TableCell>
						</TableRow> ) }
						<TableRow>
							<TableCell colSpan={ 4 }>
								<Button
									variant='contained'
									onClick={ () => addItem( daily.length ) }>
									<AddIcon/>
								</Button>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</DialogContent>
		<DialogActions>
			<Button variant='contained' color='primary' onClick={ () => {
				dispatch( event_setDaily( daily, dailyTotal ) );
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
