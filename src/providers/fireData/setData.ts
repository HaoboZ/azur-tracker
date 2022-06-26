import { Dialog } from '@capacitor/dialog';
import stringify from 'fast-json-stable-stringify';
import { getAuth } from 'firebase/auth';
import { Database, get, ref, set } from 'firebase/database';
import { omit } from 'lodash-es';
import { compressToUTF16 } from 'lz-string';
import { app } from '../../firebase/client';
import { store } from '../../store';
import { setNewData } from '../../store/reducers/mainReducer';

const auth = getAuth( app );

export default async function setData( db: Database, key: string, always?: boolean ) {
	// check
	if ( !auth.currentUser?.uid ) return;
	const readRef = ref( db, `${auth.currentUser.uid}/${key}/timestamp` );
	const snapshot = await get( readRef );
	const timestamp = snapshot.val();
	
	// conditions
	const state = store.getState();
	if ( !always && timestamp === state[ key ].timestamp ) return;
	if ( !always && timestamp > state[ key ].timestamp ) {
		const { value } = await Dialog.confirm( {
			title  : 'Conflicts Found',
			message: `Data conflicts with cloud data for ${key}.\nOverride cloud data?`
		} );
		if ( !value ) return;
	}
	
	// write
	const data = compressToUTF16( stringify( omit( state[ key ], 'timestamp' ) ) );
	const writeRef = ref( db, `${auth.currentUser.uid}/${key}` );
	await set( writeRef, { timestamp: state[ key ].timestamp, data } );
	store.dispatch( setNewData( { [ key ]: false } ) );
}
