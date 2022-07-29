import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { mapValues, pickBy } from 'lodash-es';
import { compressToUTF16 } from 'lz-string';
import stringify from 'safe-stable-stringify';
import { store } from '../../store';
import { setLastTimestamp } from '../../store/reducers/mainReducer';
import { app } from '../client';

const auth = getAuth( app );
const db = getDatabase( app );

export default async function setData( keys: string[] ) {
	if ( !auth.currentUser?.uid ) return;
	
	const state = store.getState();
	const data = mapValues( pickBy( state, ( val, key ) => keys.includes( key ) ),
		( val ) => compressToUTF16( stringify( val ) ) );
	const dataRef = ref( db, auth.currentUser.uid );
	await set( dataRef, { ...data, timestamp: state.main.timestamp } );
	
	store.dispatch( setLastTimestamp( state.main.timestamp ) );
}
