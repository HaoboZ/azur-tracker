import { Mutex } from 'async-mutex';
import axios from 'axios';
import stringify from 'json-stringify-safe';
import { isEqual, mapValues } from 'lodash';
import hash from 'object-hash';
import { store } from './store';
import { importBackup, setLastSaved, setNewData } from './store/reducers/mainReducer';

export const backupMutex = new Mutex();

export async function checkDataIntegrity() {
	if ( !navigator.onLine ) return;
	const { main, ...state } = store.getState();
	const data = mapValues( state, ( value ) => stringify( value ) );
	const { data: { action } } = await axios.post( `${process.env.NEXT_PUBLIC_SERVER_URL}/api/data/checkData`, {
		checksum : hash( data ),
		timestamp: main.lastSaved
	} );
	
	return { action, data };
}

export async function setBackup( integrity ) {
	if ( !integrity ) {
		store.dispatch( setLastSaved( new Date().toISOString() ) );
		return;
	}
	const { action, data } = integrity;
	
	if ( !action ) return;
	if ( action === 'prompt' && !confirm( 'Conflicts found, override cloud data?' ) ) {
		await getBackup( integrity, false );
		return;
	}
	store.dispatch( setLastSaved( new Date().toISOString() ) );
	await axios.post( `${process.env.NEXT_PUBLIC_SERVER_URL}/api/data/setData`, {
		timestamp: store.getState().main.lastSaved,
		data
	} );
}

export async function getBackup( integrity, check = true ) {
	if ( !integrity ) return;
	if ( check ) {
		const { action } = integrity;
		if ( !action ) return;
		if ( action === 'update' ) {
			await setBackup( integrity );
			return;
		}
	}
	const { data: { data, timestamp } } = await axios.get( `${process.env.NEXT_PUBLIC_SERVER_URL}/api/data/getData` );
	const newData = mapValues( data, ( value ) => JSON.parse( value ) );
	store.dispatch( setLastSaved( timestamp ) );
	const state = store.getState();
	const changed = Object.keys( newData ).filter( ( key ) => !isEqual( state[ key ], newData[ key ] ) );
	// noinspection CommaExpressionJS, JSRemoveUnnecessaryParentheses
	store.dispatch( setNewData( changed.reduce( ( o, k ) => ( o[ k ] = true, o ), {} ) ) );
	store.dispatch( importBackup( newData ) );
}
