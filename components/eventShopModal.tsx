import React from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { event_setShop } from '../lib/eventReducer';
import { useTypedSelector } from '../lib/store';
import styles from '../styles/modal.module.css';

export default function EventShopModal( { status, closeModal } ) {
	const event = useTypedSelector( store => store.event );
	const dispatch = useDispatch();
	
	const [ shop, setShop ] = React.useState( event.shop );
	const [ expectedCost, setExpectedCost ] = React.useState( event.shopExpectedCost );
	const [ buyoutCost, setBuyoutCost ] = React.useState(
		() => shop.reduce( ( total, item ) => total + item.cost * item.amount, 0 ) );
	
	function calcTotalCost() {
		let [ totalCost, buyoutCost ] = shop.reduce( ( total, item ) => [
			total[ 0 ] + item.cost * Math.min( item.amount, item.buy ),
			total[ 1 ] + item.cost * item.amount
		], [ 0, 0 ] );
		setExpectedCost( totalCost );
		setBuyoutCost( buyoutCost );
	}
	
	function addItem( index: number, remove?: boolean ) {
		if ( !remove && shop.length >= index ) {
			shop.splice( index, 0, { name: '', cost: 0, amount: 0, buy: 0 } );
			setShop( [ ...shop ] );
		} else if ( shop.length > index ) {
			shop.splice( index, 1 );
			setShop( [ ...shop ] );
			calcTotalCost();
		}
	}
	
	function modifyItem( index: number, item: { name?: string, cost?: number, amount?: number, buy?: number } ) {
		shop[ index ] = { ...shop[ index ], ...item };
		setShop( [ ...shop ] );
		calcTotalCost();
	}
	
	return <Modal show={ status } onHide={ closeModal } dialogClassName={ styles.modalWidth }>
		<Modal.Header closeButton>
			<Modal.Title>Shop Items</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<Row>
				<Col><h5>Buyout Price: { buyoutCost }</h5></Col>
				<Col><h5>Expected Price: { expectedCost }</h5></Col>
			</Row>
			<Table responsive size='sm' style={ { minWidth: 600 } }>
				<thead>
				<tr>
					<th colSpan={ 2 }/>
					<th style={ { minWidth: 250 } }>Name</th>
					<th>Cost</th>
					<th>Amount</th>
					<th>Wanted</th>
				</tr>
				</thead>
				<tbody>
				{ shop.map( ( item, index ) => <tr key={ index }>
					<td><Button onClick={ () => addItem( index ) }>+</Button></td>
					<td><Button onClick={ () => addItem( index, true ) }>−</Button></td>
					<td>
						<Form.Control
							type='text'
							value={ item.name }
							onChange={ ( e ) => modifyItem( index, { name: e.currentTarget.value } ) }/>
					</td>
					<td>
						<Form.Control
							type='number'
							value={ item.cost }
							onChange={ ( e ) => modifyItem( index, { cost: parseInt( e.currentTarget.value ) || 0 } ) }/>
					</td>
					<td>
						<Form.Control
							type='number'
							value={ item.amount }
							onChange={ ( e ) =>
								modifyItem( index, { amount: parseInt( e.currentTarget.value ) || 0 } ) }/>
					</td>
					<td>
						<Form.Control
							type='number'
							value={ item.buy }
							onChange={ ( e ) =>
								modifyItem( index, { buy: parseInt( e.currentTarget.value ) || 0 } ) }/>
					</td>
				</tr> ) }
				<tr>
					<td><Button onClick={ () => addItem( shop.length ) }>+</Button></td>
				</tr>
				</tbody>
			</Table>
		</Modal.Body>
		<Modal.Footer>
			<Button variant='primary' onClick={ () => {
				dispatch( event_setShop( shop ) );
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
