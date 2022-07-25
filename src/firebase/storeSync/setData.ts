import stringify from 'fast-json-stable-stringify';
import { getAuth } from 'firebase/auth';
import { Database, ref, set } from 'firebase/database';
import { compressToUTF16 } from 'lz-string';
import { store } from '../../store';
import { setLastTimestamp } from '../../store/reducers/mainReducer';
import { app } from '../client';

const auth = getAuth( app );

export default async function setData( db: Database, keys: string[] ) {
	if ( !auth.currentUser?.uid ) return;
	
	const state = store.getState();
	const data = keys.reduce<any>( ( acc, key ) => ( {
		...acc,
		[ key ]: compressToUTF16( stringify( state[ key ] ) )
	} ), {} );
	data.timestamp = state.main.timestamp;
	const dataRef = ref( db, auth.currentUser.uid );
	await set( dataRef, data );
	console.log( 'set' );
	store.dispatch( setLastTimestamp( data.timestamp ) );
}
