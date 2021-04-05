import { md5 } from 'hash-wasm';
import stringify from 'json-stable-stringify';
import LZ from 'lz-string';

import { store } from './store';
import { importBackup, setLastSaved } from './store/reducers/mainReducer';

async function checkDataIntegrity() {
	const { main, ...state } = store.getState();
	const body = LZ.compressToUTF16( stringify( state ) );
	const res = await fetch( `/api/checkData?${new URLSearchParams( {
		checksum:  await md5( body ),
		lastSaved: main.lastSaved
	} )}` );
	let valid = await res.json();
	return { valid, body };
}

export async function setBackup() {
	if ( !navigator.onLine ) return;
	const { valid, body } = await checkDataIntegrity();
	if ( !valid ) return;
	if ( valid === 'prompt' && !confirm( 'Conflicts found, override cloud data?' ) ) {
		await getBackup( false );
		return;
	}
	const res = await fetch( '/api/setData', {
		method: 'POST',
		body
	} );
	const { lastSaved } = await res.json();
	store.dispatch( setLastSaved( lastSaved ) );
}

export async function getBackup( check = true ) {
	if ( !navigator.onLine ) return;
	if ( check ) {
		const { valid } = await checkDataIntegrity();
		if ( !valid ) return;
	}
	const res = await fetch( '/api/getData' );
	const { data, lastSaved } = await res.json();
	const state = JSON.parse( LZ.decompressFromUTF16( data ) );
	store.dispatch( setLastSaved( lastSaved ) );
	store.dispatch( importBackup( state ) );
}
