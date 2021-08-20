import { Mutex } from 'async-mutex';
import axios from 'axios';
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
	const { data } = await axios( '/api/checkData', {
		params: {
			checksum : await md5( body ),
			lastSaved: main.lastSaved
		}
	} );
	return { valid: data, data: body };
}

export async function setBackup( integrity ) {
	if ( !integrity ) {
		store.dispatch( setLastSaved( new Date().toISOString() ) );
		return;
	}
	const { valid, data } = integrity;
	if ( !valid ) return;
	if ( valid === 'prompt' && !confirm( 'Conflicts found, override cloud data?' ) ) {
		await getBackup( integrity, false );
		return;
	}
	store.dispatch( setLastSaved( new Date().toISOString() ) );
	await axios( '/api/setData', {
		method: 'POST',
		params: { modifiedTime: store.getState().main.lastSaved },
		data
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
	const { data: { data, lastSaved } } = await axios( '/api/getData' );
	store.dispatch( setLastSaved( lastSaved ) );
	const state = store.getState();
	const changed = Object.keys( data ).filter( ( item ) => !isEqual( state[ item ], data[ item ] ) );
	// noinspection CommaExpressionJS
	store.dispatch( setNewData( changed.reduce( ( o, k ) => ( o[ k ] = true, o ), {} ) ) );
	store.dispatch( importBackup( data ) );
}
