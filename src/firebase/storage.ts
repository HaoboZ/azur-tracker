import { Dialog } from '@capacitor/dialog';
import stringify from 'fast-json-stable-stringify';
import { get, getDatabase, ref, set } from 'firebase/database';
import { isEqual, mapValues } from 'lodash';
import { compressToUTF16, decompressFromUTF16 } from 'lz-string';
import { store } from '../store';
import { importBackup, setNewData, setTimestamp } from '../store/reducers/mainReducer';
import { auth } from './client';

const db = getDatabase();

export async function setData() {
	if ( !auth.currentUser?.uid ) return;
	const readRef = ref( db, `${auth.currentUser.uid}/timestamp` );
	const snapshot = await get( readRef );
	const timestamp = snapshot.val();
	
	const { main, ...state } = store.getState();
	if ( timestamp > main.timestamp ) {
		const { value } = await Dialog.confirm( {
			title  : 'Conflicts Found',
			message: 'Data conflicts with cloud data.\nOverride cloud data?'
		} );
		if ( !value ) return;
	}
	
	const data = mapValues( state, ( value ) => compressToUTF16( stringify( value ) ) );
	const newTimestamp = new Date().toISOString();
	store.dispatch( setTimestamp( newTimestamp ) );
	
	const writeRef = ref( db, auth.currentUser.uid );
	await set( writeRef, {
		timestamp: newTimestamp,
		data
	} );
}

export async function getData() {
	const dbRef = ref( db, auth.currentUser?.uid );
	const snapshot = await get( dbRef );
	if ( !snapshot.exists() ) return;
	const { data, timestamp } = snapshot.val() ?? {};
	
	const newData = mapValues( data, ( value ) => JSON.parse( decompressFromUTF16( value ) ) );
	store.dispatch( setTimestamp( timestamp ) );
	const state = store.getState();
	const changed = Object.keys( newData ).filter( ( key ) => !isEqual( state[ key ], newData[ key ] ) );
	// noinspection CommaExpressionJS, JSRemoveUnnecessaryParentheses
	store.dispatch( setNewData( changed.reduce( ( o, k ) => ( o[ k ] = true, o ), {} ) ) );
	store.dispatch( importBackup( newData ) );
}
