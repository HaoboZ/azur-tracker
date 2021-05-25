import { md5 } from 'hash-wasm';
import stringify from 'json-stable-stringify';
import { isEqual } from 'lodash';

import { store } from './store';
import { importBackup, setLastSaved, setNewData } from './store/reducers/mainReducer';

async function checkDataIntegrity() {
	const { main, ...state } = store.getState();
	const body = stringify( state );
	const res = await fetch( `/api/checkData?${new URLSearchParams( {
		checksum : await md5( body ),
		lastSaved: main.lastSaved
	} )}` );
	const valid = await res.json();
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
		if ( valid === 'update' ) {
			await setBackup();
			return;
		}
	}
	const res = await fetch( '/api/getData' );
	const { data, lastSaved } = await res.json();
	store.dispatch( setLastSaved( lastSaved ) );
	const state = store.getState();
	const changed = Object.keys( data ).filter( ( item ) => !isEqual( state[ item ], data[ item ] ) );
	// noinspection CommaExpressionJS
	store.dispatch( setNewData( changed.reduce( ( o, k ) => ( o[ k ] = true, o ), {} ) ) );
	store.dispatch( importBackup( data ) );
}
