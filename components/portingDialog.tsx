import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	FormGroup,
	Switch,
	TextField,
	Tooltip
} from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../lib/store';

export default function PortingDialog( { status, type, closeModal } ) {
	const store    = useTypedSelector( store => store ),
	      dispatch = useDispatch();
	
	const [ exportedData, setExportedData ] = React.useState( '' );
	const [ tooltip, setTooltip ] = React.useState( '' );
	
	return <Dialog
		open={ status }
		onClose={ closeModal }
		maxWidth='sm'
		fullWidth
		disablePortal
		disableEnforceFocus
		disableAutoFocus
		closeAfterTransition>
		<DialogTitle>{ type ? 'Import' : 'Export' } Data</DialogTitle>
		<form onSubmit={ ( e ) => {
			e.preventDefault();
			if ( type ) {
				try {
					const data = JSON.parse( decodeURIComponent( atob( e.currentTarget.exportArea.value ) ) );
					dispatch( { type: 'import', data } );
					setTooltip( 'Data imported' );
				} catch ( e ) {
					alert( e.message );
				}
			} else {
				let data = {} as any;
				if ( e.currentTarget.eventExport.checked )
					data.event = store.event;
				if ( e.currentTarget.researchExport.checked )
					data.research = store.research;
				if ( e.currentTarget.shipExport.checked )
					data.ship = store.ship;
				
				try {
					const encoded = btoa( encodeURIComponent( JSON.stringify( data ) ) );
					setExportedData( encoded );
					e.currentTarget.exportArea.value = encoded;
					e.currentTarget.exportArea.select();
					e.currentTarget.exportArea.setSelectionRange( 0, 99999 );
					document.execCommand( 'copy' );
					setTooltip( 'Text copied to clipboard' );
				} catch ( e ) {
					alert( e.message );
				}
			}
		} }>
			<DialogContent>
				{ type ? <TextField
					multiline rows={ 4 } fullWidth
					name='exportArea' label='Paste from exported data'/> : <>
					<FormGroup row>
						<FormControlLabel
							control={ <Switch defaultChecked name='eventExport'/> }
							label='Event'/>
					</FormGroup>
					<FormGroup row>
						<FormControlLabel
							control={ <Switch defaultChecked name='researchExport'/> }
							label='Research'/>
					</FormGroup>
					<FormGroup row>
						<FormControlLabel
							control={ <Switch defaultChecked name='shipExport'/> }
							label='Armada'/>
					</FormGroup>
					<TextField
						multiline rows={ 4 } fullWidth
						name='exportArea' value={ exportedData }/>
				</> }
			</DialogContent>
			
			<DialogActions>
				<Tooltip
					placement='bottom'
					open={ !!tooltip }
					onClose={ () => setTooltip( '' ) }
					disableHoverListener
					disableTouchListener
					title={ tooltip }>
					<Button variant='contained' color='primary' type='submit'>
						{ type ? 'Import' : ' Export' }
					</Button>
				</Tooltip>
				<Button variant='contained' color='secondary' onClick={ closeModal }>
					Close
				</Button>
			</DialogActions>
		</form>
	</Dialog>;
}
