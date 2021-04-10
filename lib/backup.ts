import { md5 } from 'hash-wasm';
import stringify from 'json-stable-stringify';

import { store } from './store';
import { importBackup, setLastSaved } from './store/reducers/mainReducer';

async function checkDataIntegrity() {
	const { main, ...state } = store.getState();
	const body = stringify( state );
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
	const modifiedTime = new Date().toISOString();
	store.dispatch( setLastSaved( modifiedTime ) );
	await fetch( `/api/setData?${new URLSearchParams( {
		modifiedTime
	} )}`, {
		method: 'POST',
		body
	} );
}

export async function getBackup( check = true ) {
	if ( !navigator.onLine ) return;
	if ( check ) {
		const { valid } = await checkDataIntegrity();
		if ( !valid ) return;
		if ( valid === 'old' ) {
			await setBackup();
			return;
		}
	}
	const res = await fetch( '/api/getData' );
	const { data, lastSaved } = await res.json();
	const state = JSON.parse( data );
	store.dispatch( setLastSaved( lastSaved ) );
	store.dispatch( importBackup( state ) );
}
