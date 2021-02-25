import React from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { event_setShop } from '../lib/eventReducer';
import eventRef from '../lib/eventRef';
import { useTypedSelector } from '../lib/store';
import styles from '../styles/modal.module.css';

export default function EventShopModal( { status, closeModal } ) {
	const event = useTypedSelector( store => store.event );
	const dispatch = useDispatch();
	
	const [ shop, setShop ] = React.useState( event.shop );
	const [ expectedCost, setExpectedCost ] = React.useState( event.shopExpectedCost );
	const [ buyoutCost, setBuyoutCost ] = React.useState(
		() => Object.values( eventRef.shop ).reduce( ( total, item ) =>
			total + item.cost * item.amount, 0 ) );
	
	React.useEffect( () => {
		if ( status ) setShop( event.shop );
	}, [ status ] );
	
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
	
	return <Modal show={ status } onHide={ closeModal } dialogClassName={ styles.modalWidth }>
		<Modal.Header closeButton>
			<Modal.Title>Shop Items</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<Row>
				<Col><h5>Buyout Price: { buyoutCost }</h5></Col>
				<Col><h5>Expected Price: { expectedCost }</h5></Col>
			</Row>
			<Table responsive size='sm' striped style={ { minWidth: 600 } }>
				<thead>
				<tr>
					<th style={ { minWidth: 250 } }>Name</th>
					<th>Cost</th>
					<th>Amount</th>
					<th>Wanted</th>
				</tr>
				</thead>
				<tbody>
				{ Object.keys( eventRef.shop ).map( ( itemName, index ) => {
					const item = eventRef.shop[ itemName ];
					return <tr key={ index }>
						<td>
							<Form.Control
								type='text'
								plaintext
								readOnly
								defaultValue={ itemName }/>
						</td>
						<td>
							<Form.Control
								type='number'
								plaintext
								readOnly
								defaultValue={ item.cost }/>
						</td>
						<td>
							<Form.Control
								type='number'
								plaintext
								readOnly
								defaultValue={ item.amount }/>
						</td>
						<td>
							<Form.Control
								type='number'
								value={ shop[ itemName ] || 0 }
								onChange={ ( e ) => {
									shop[ itemName ] = Math.min( Math.max( parseInt( e.currentTarget.value ) || 0, 0 ), item.amount );
									setShop( { ...shop } );
									calcTotalCost();
								} }/>
						</td>
					</tr>;
				} ) }
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
