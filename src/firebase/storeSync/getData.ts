import { getAuth } from 'firebase/auth';
import { get, getDatabase, ref } from 'firebase/database';
import { decompressFromUTF16 } from 'lz-string';
import { isEqual } from 'underscore';
import { store } from '../../store';
import { importBackup, setLastTimestamp, setTimestamp } from '../../store/reducers/mainReducer';
import firebaseClientApp from '../client';

const auth = getAuth( firebaseClientApp );
const db = getDatabase( firebaseClientApp );

export default async function getData( keys: string[] ) {
	if ( !auth.currentUser?.uid ) return;
	
	const dataRef = ref( db, `users/${auth.currentUser.uid}` );
	const snapshot = await get( dataRef );
	if ( !snapshot.exists() ) return;
	
	const data = snapshot.val();
	const state = store.getState();
	keys.forEach( ( key ) => {
		const newData = JSON.parse( decompressFromUTF16( data[ key ] ) );
		if ( !isEqual( state[ key ], newData ) ) {
			store.dispatch( importBackup( key, newData ) );
		}
	} );
	store.dispatch( setTimestamp( data.timestamp ) );
	store.dispatch( setLastTimestamp( data.timestamp ) );
}
