import { getAuth } from 'firebase/auth';
import { Database, get, ref } from 'firebase/database';
import { isEqual } from 'lodash-es';
import { decompressFromUTF16 } from 'lz-string';
import { store } from '../../store';
import { importBackup, setLastTimestamp, setTimestamp } from '../../store/reducers/mainReducer';
import { app } from '../client';

const auth = getAuth( app );

export default async function getData( db: Database, keys: string[] ) {
	if ( !auth.currentUser?.uid ) return;
	
	const dataRef = ref( db, auth.currentUser.uid );
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
