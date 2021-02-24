import moment from 'moment';
import React from 'react';
import { Button, Col, Container, Form, InputGroup, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import EventDailyModal from '../components/eventDailyModal';
import EventShopModal from '../components/eventShopModal';
import {
	event_addFarming,
	event_modifyFarming,
	event_reset,
	event_setEndDate,
	event_setName,
	event_setPoints
} from '../lib/eventReducer';
import { useTypedSelector } from '../lib/store';

export default function Event() {
	const event    = useTypedSelector( store => store.event ),
	      dispatch = useDispatch();
	
	const remainingDays = Math.max( moment( event.endDate ).diff( moment(), 'day', true ), 0 );
	
	const [ shopModal, setShopModal ] = React.useState( false );
	const [ dailyModal, setDailyModal ] = React.useState( false );
	
	const neededPoints = event.shopExpectedCost - Math.floor( remainingDays ) * event.dailyExpected;
	const remainingPoints = Math.max( neededPoints - event.points, 0 );
	
	return <Container>
		<h3 className='d-flex justify-content-between'>
			Event Tracker <Button onClick={ () => dispatch( event_reset() ) }>Reset</Button>
		</h3>
		<Form noValidate>
			<Form.Row>
				<Form.Group as={ Col }>
					<Form.Control
						type='text'
						placeholder='Event Name'
						value={ event.name }
						onChange={ ( e ) => dispatch( event_setName( e.currentTarget.value ) ) }/>
				</Form.Group>
			</Form.Row>
			
			<Form.Row>
				<Form.Group as={ Col } md={ 4 }>
					<Form.Label>Current Date</Form.Label>
					<Form.Control
						type='datetime-local'
						plaintext
						readOnly
						defaultValue={ moment().format( 'YYYY-MM-DDTHH:mm' ) }/>
				</Form.Group>
				<Form.Group as={ Col } md={ 4 }>
					<Form.Label>End Date</Form.Label>
					<Form.Control
						type='datetime-local'
						value={ moment( event.endDate ).format( 'YYYY-MM-DDTHH:mm' ) }
						onChange={ ( e ) => dispatch( event_setEndDate( e.currentTarget.value ) ) }/>
				</Form.Group>
				<Form.Group as={ Col } md={ 4 }>
					<Form.Label>Days Remaining</Form.Label>
					<Form.Control
						type='text'
						plaintext
						readOnly
						value={ Math.ceil( remainingDays ) }/>
				</Form.Group>
			</Form.Row>
			
			<Form.Row>
				<Form.Group as={ Col } md={ 5 }>
					<Form.Label>Shop</Form.Label>
					<InputGroup onClick={ () => setShopModal( true ) }>
						<InputGroup.Prepend>
							<InputGroup.Text>Expected Cost</InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control type='text' value={ event.shopExpectedCost } readOnly/>
					</InputGroup>
					<EventShopModal status={ shopModal } closeModal={ () => setShopModal( false ) }/>
				</Form.Group>
				<Form.Group as={ Col } md={ 3 } xs={ 6 }>
					<Form.Label>Daily Points</Form.Label>
					<InputGroup onClick={ () => setDailyModal( true ) }>
						<Form.Control type='text' value={ event.dailyExpected } readOnly/>
					</InputGroup>
					<EventDailyModal status={ dailyModal } closeModal={ () => setDailyModal( false ) }/>
				</Form.Group>
				<Form.Group as={ Col } md={ 4 } xs={ 6 }>
					<Form.Label>Current Points</Form.Label>
					<Form.Control
						type='number'
						value={ event.points }
						onChange={ ( e ) =>
							dispatch( event_setPoints( parseInt( e.currentTarget.value ) || 0 ) ) }/>
				</Form.Group>
			</Form.Row>
			
			<h5>Farming</h5>
			<Table>
				<thead>
				<tr>
					<th colSpan={ 2 }/>
					<th>Points/Run</th>
					<th>Oil Cost/Run</th>
					<th>Required Plays</th>
					<th>Total Oil Cost</th>
				</tr>
				</thead>
				<tbody>
				{ event.farming.map( ( item, index ) => {
					const plays = remainingPoints ? remainingPoints / item.points : 0,
					      oil   = Math.ceil( remainingPoints ? remainingPoints / item.points : 0 ) * item.oil;
					return <tr key={ index }>
						<td><Button onClick={ () => dispatch( event_addFarming( index ) ) }>+</Button>
						</td>
						<td><Button
							onClick={ () => dispatch( event_addFarming( index, true ) ) }>−</Button>
						</td>
						<td>
							<Form.Control
								type='number'
								value={ item.points }
								onChange={ ( e ) =>
									dispatch( event_modifyFarming( index, { points: parseInt( e.currentTarget.value ) || 0 } ) ) }/>
						</td>
						<td>
							<Form.Control
								type='number'
								value={ item.oil }
								onChange={ ( e ) =>
									dispatch( event_modifyFarming( index, { oil: parseInt( e.currentTarget.value ) || 0 } ) ) }/>
						</td>
						<td>{ plays }</td>
						<td>{ isFinite( oil ) ? oil : Infinity }</td>
					</tr>;
				} ) }
				<tr>
					<td>
						<Button onClick={ () => dispatch( event_addFarming( event.farming.length ) ) }>
							+
						</Button>
					</td>
				</tr>
				</tbody>
			</Table>
		</Form>
	</Container>;
}
