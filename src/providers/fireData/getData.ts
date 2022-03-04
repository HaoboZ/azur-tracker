import { getAuth } from 'firebase/auth';
import { get, getDatabase, ref } from 'firebase/database';
import { decompressFromUTF16 } from 'lz-string';
import { app } from '../../firebase/client';
import { store } from '../../store';
import { importBackup, setNewData } from '../../store/reducers/mainReducer';

const auth = getAuth( app );
const db = getDatabase( app );

export default async function getData( key: string, always?: boolean ) {
	// check
	if ( !auth.currentUser?.uid ) return;
	const readRef = ref( db, `${auth.currentUser.uid}/${key}` );
	const snapshot = await get( readRef );
	if ( !snapshot.exists() ) return;
	const { timestamp, data } = snapshot.val();
	
	// conditions
	const state = store.getState();
	if ( !always && timestamp <= state[ key ].timestamp ) return;
	
	// read
	const newData = JSON.parse( decompressFromUTF16( data ) );
	store.dispatch( importBackup( key, { timestamp, ...newData } ) );
	store.dispatch( setNewData( { [ key ]: true } ) );
}
