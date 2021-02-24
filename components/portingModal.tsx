import React from 'react';
import { Button, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../lib/store';

export default function PortingModal( { status, type, closeModal } ) {
	const store    = useTypedSelector( store => store ),
	      dispatch = useDispatch();
	
	const [ exportedData, setExportedData ] = React.useState( '' );
	
	return <>
		<Modal show={ status } onHide={ closeModal }>
			<Modal.Header closeButton>
				<Modal.Title>{ type ? 'Import' : 'Export' } Data</Modal.Title>
			</Modal.Header>
			
			<Form onSubmit={ ( e ) => {
				e.preventDefault();
				if ( type ) {
					try {
						const data = JSON.parse( decodeURIComponent( atob( e.currentTarget.exportArea.value ) ) );
						dispatch( { type: 'import', data } );
					} catch ( e ) {
						alert( e.message );
					}
				} else {
					let data = {} as any;
					if ( e.currentTarget.eventExport.checked )
						data.event = store.event;
					if ( e.currentTarget.researchExport.checked )
						data.research = store.research;
					
					const encoded = btoa( encodeURIComponent( JSON.stringify( data ) ) );
					setExportedData( encoded );
					e.currentTarget.exportArea.value = encoded;
					e.currentTarget.exportArea.select();
					e.currentTarget.exportArea.setSelectionRange( 0, 99999 );
					document.execCommand( 'copy' );
				}
			} }>
				<Modal.Body>
					{ type ? <Form.Control as='textarea' id='exportArea'/> : <>
						<Form.Check
							type='checkbox'
							id='eventExport'
							label='Event'
							defaultChecked/>
						<Form.Check
							type='checkbox'
							id='researchExport'
							label='Research'
							defaultChecked/>
						
						<Form.Control
							as='textarea' id='exportArea'
							className='mt-3'
							value={ exportedData } readOnly/>
					</> }
				</Modal.Body>
				
				<Modal.Footer>
					<OverlayTrigger
						placement='top'
						trigger='click'
						overlay={ <Tooltip id='copied'>Text copied to clipboard</Tooltip> }>
						<Button variant='primary' type='submit'>{ type ? 'Import' : 'Export' }</Button>
					</OverlayTrigger>
					<Button variant='danger' onClick={ closeModal }>Close</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	</>;
}
