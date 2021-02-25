import React from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { event_setDaily } from '../lib/eventReducer';
import { useTypedSelector } from '../lib/store';
import styles from '../styles/modal.module.css';

export default function EventDailyModal( { status, closeModal } ) {
	const event = useTypedSelector( store => store.event );
	const dispatch = useDispatch();
	
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
		daily[ index ] = { ...daily[ index ], ...item };
		setDaily( [ ...daily ] );
		calcDailyTotal();
	}
	
	return <Modal show={ status } onHide={ closeModal } dialogClassName={ styles.modalWidth }>
		<Modal.Header closeButton>
			<Modal.Title>Daily Points</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<h5>Total: { dailyTotal }</h5>
			<Table size='sm' striped>
				<thead>
				<tr>
					<th colSpan={ 2 }/>
					<th style={ { minWidth: 250 } }>Name</th>
					<th>Amount</th>
				</tr>
				</thead>
				<tbody>
				{ daily.map( ( item, index ) => <tr key={ index }>
					<td><Button onClick={ () => addItem( index ) }>+</Button></td>
					<td><Button onClick={ () => addItem( index, true ) }>−</Button></td>
					<td>
						<Form.Control
							type='text'
							value={ item.name }
							onChange={ ( e ) =>
								modifyItem( index, { name: e.currentTarget.value } ) }/>
					</td>
					<td>
						<Form.Control
							type='number'
							value={ item.amount }
							onChange={ ( e ) =>
								modifyItem( index, { amount: Math.max( parseInt( e.currentTarget.value ) || 0, 0 ) } ) }/>
					</td>
				</tr> ) }
				<tr>
					<td colSpan={ 4 }><Button onClick={ () => addItem( daily.length ) }>+</Button></td>
				</tr>
				</tbody>
			</Table>
		</Modal.Body>
		<Modal.Footer>
			<Button variant='primary' onClick={ () => {
				dispatch( event_setDaily( daily, dailyTotal ) );
				closeModal();
			} }>
				Save
			</Button>
			<Button variant='danger' onClick={ closeModal }>
				Cancel
			</Button>
		</Modal.Footer>
	</Modal>;
}
