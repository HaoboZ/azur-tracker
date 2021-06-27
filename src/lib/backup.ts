import { Mutex } from 'async-mutex';
import { md5 } from 'hash-wasm';
import stringify from 'json-stable-stringify';
import { isEqual } from 'lodash';

import { store } from './store';
import { importBackup, setLastSaved, setNewData } from './store/reducers/mainReducer';

export const backupMutex = new Mutex();

export async function checkDataIntegrity() {
	if ( !navigator.onLine ) return;
	const { main, ...state } = store.getState();
	const body = stringify( state );
	const res = await fetch( `/api/checkData?${new URLSearchParams( {
		checksum : await md5( body ),
		lastSaved: main.lastSaved
	} )}` );
	const valid = await res.json();
	return { valid, body };
}

export async function setBackup( integrity ) {
	if ( !integrity ) {
		store.dispatch( setLastSaved( new Date().toISOString() ) );
		return;
	}
	const { valid, body } = integrity;
	if ( !valid ) return;
	if ( valid === 'prompt' && !confirm( 'Conflicts found, override cloud data?' ) ) {
		await getBackup( integrity, false );
		return;
	}
	store.dispatch( setLastSaved( new Date().toISOString() ) );
	await fetch( `/api/setData?${new URLSearchParams( {
		modifiedTime: store.getState().main.lastSaved
	} )}`, {
		method: 'POST',
		body
	} );
}

export async function getBackup( integrity, check = true ) {
	if ( !integrity ) return;
	if ( check ) {
		const { valid } = integrity;
		if ( !valid ) return;
		if ( valid === 'update' ) {
			await setBackup( integrity );
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
