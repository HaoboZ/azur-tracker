import React from 'react';
import { Button, Container, Form, InputGroup, Tab, Table, Tabs } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { research_modifyShip, research_reset, research_setLastTab } from '../lib/researchReducer';
import { devLevels, fateLevels, ships } from '../lib/researchRef';
import { useTypedSelector } from '../lib/store';

export default function Research() {
	const research = useTypedSelector( store => store.research ),
	      dispatch = useDispatch();
	
	return <Container>
		<h3 className='d-flex justify-content-between'>
			Research Tracker <Button onClick={ () => dispatch( research_reset() ) }>Reset</Button>
		</h3>
		<Tabs
			activeKey={ research.lastTab }
			onSelect={ ( k ) => {
				dispatch( research_setLastTab( k ) );
			} }>
			{ Object.keys( ships ).map( ( key ) => {
				let totalPRDev = 0, totalPRFate = 0, totalDR = 0;
				return <Tab key={ key } eventKey={ key } title={ key }>
					<Table responsive style={ { minWidth: 680 } }>
						<thead>
						<tr>
							<th>Name</th>
							<th>Dev Level</th>
							<th>Dev Stage</th>
							<th>Required Prints</th>
							<th>Fate Level</th>
							<th>Fate Stage</th>
							<th>Required Prints</th>
						</tr>
						</thead>
						<tbody>
						{ ships[ key ].map( ( item, index ) => {
							const ship = research.ships[ item[ 0 ] ] || {} as any;
							const devLevel  = devLevels[ Math.min( Math.max( ship.devLevel || 0, 0 ), 30 ) ],
							      fateLevel = fateLevels[ Math.min( Math.max( ship.fateLevel || 0, 0 ), 5 ) ];
							const devPrints  = Math.floor( devLevels[ 30 ][ item[ 1 ] * 2 + 1 ]
								- devLevel[ item[ 1 ] * 2 + 1 ]
								- ( ship.devStage || 0 ) / 10 ),
							      fatePrints = Math.floor( fateLevels[ 5 ][ 1 ]
								      - fateLevel[ 1 ]
								      - Math.ceil( fateLevel[ 0 ] * ( ship.fateStage || 0 ) / 100 ) );
							if ( item[ 1 ] ) {
								totalDR += devPrints;
							} else {
								console.log( key, devPrints );
								totalPRDev += devPrints;
								if ( item[ 2 ] ) totalPRFate += fatePrints;
							}
							return <tr key={ index }>
								<td>{ item[ 0 ] }</td>
								<td>
									<Form.Control
										type='number'
										value={ ship.devLevel || 0 }
										onChange={ ( e ) =>
											dispatch( research_modifyShip( item[ 0 ], { devLevel: parseInt( e.currentTarget.value ) } ) ) }/>
								</td>
								<td>
									<Form.Control
										type='number'
										value={ ship.devStage || 0 }
										onChange={ ( e ) =>
											dispatch( research_modifyShip( item[ 0 ], { devStage: parseInt( e.currentTarget.value ) } ) ) }/>
								</td>
								<td>{ devPrints }</td>
								{
									item[ 2 ] && <>
										<td>
											<Form.Control
												type='number'
												value={ ship.fateLevel || 0 }
												onChange={ ( e ) =>
													dispatch( research_modifyShip( item[ 0 ], { fateLevel: parseInt( e.currentTarget.value ) } ) ) }/>
										</td>
										<td>
											<InputGroup className='mb-2'>
												<Form.Control
													type='number'
													value={ ship.fateStage || 0 }
													onChange={ ( e ) =>
														dispatch( research_modifyShip( item[ 0 ], { fateStage: parseInt( e.currentTarget.value ) } ) ) }/>
												<InputGroup.Append>
													<InputGroup.Text>%</InputGroup.Text>
												</InputGroup.Append>
											</InputGroup>
										</td>
										<td>{ fatePrints }</td>
									</>
								}
							</tr>;
						} ) }
						<tr>
							<td colSpan={ 3 }>Priority Prints Total</td>
							<td>{ totalPRDev }</td>
							<td colSpan={ 2 }/>
							<td>{ totalPRFate }</td>
						</tr>
						<tr>
							<td colSpan={ 3 }>Decisive Prints Total</td>
							<td>{ totalDR }</td>
						</tr>
						</tbody>
					</Table>
				</Tab>;
			} ) }
		
		</Tabs>
	</Container>;
}
