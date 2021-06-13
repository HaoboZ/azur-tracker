import { Mutex } from 'async-mutex';
import { md5 } from 'hash-wasm';
import stringify from 'json-stable-stringify';
import { isEqual } from 'lodash';

import { store } from './store';
import { importBackup, setLastSaved, setNewData } from './store/reducers/mainReducer';

const mutex = new Mutex();

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
	store.dispatch( setLastSaved( new Date().toISOString() ) );
	if ( !navigator.onLine ) return;
	await mutex.runExclusive( async () => {
		const { valid, body } = await checkDataIntegrity();
		if ( !valid ) return;
		if ( valid === 'prompt' && !confirm( 'Conflicts found, override cloud data?' ) ) {
			await getBackup( false );
			return;
		}
		await fetch( `/api/setData?${new URLSearchParams( {
			modifiedTime: store.getState().main.lastSaved
		} )}`, {
			method: 'POST',
			body
		} );
	} );
}

export async function getBackup( check = true ) {
	if ( !navigator.onLine ) return;
	await mutex.runExclusive( async () => {
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
	} );
}
