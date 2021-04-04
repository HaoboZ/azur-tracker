import { md5 } from 'hash-wasm';
import LZ from 'lz-string';

import { store } from './store';
import { importBackup } from './store/reducers/mainReducer';

async function getChecksum() {
	const state = localStorage.getItem( 'persist:root' );
	const { main, ...subState } = JSON.parse( state );
	const body = JSON.stringify( subState );
	return [ await md5( body ), body ];
}

export async function setBackup() {
	if ( !navigator.onLine ) return;
	const [ checksum, body ] = await getChecksum();
	await fetch( `/api/setData?${new URLSearchParams( {
		checksum
	} )}`, {
		method: 'POST',
		body
	} );
}

export async function getBackup() {
	if ( !navigator.onLine ) return;
	const [ checksum ] = await getChecksum();
	const res = await fetch( `/api/getData?${new URLSearchParams( {
		checksum
	} )}` );
	const data = await res.json();
	if ( !data || !Object.keys( data ).length ) return;
	const state = Object.fromEntries( Object.entries( data )
		.map( ( [ key, item ] ) =>
			[ key, JSON.parse( LZ.decompressFromUTF16( JSON.parse( item as string ) ) ) ]
		) );
	store.dispatch( importBackup( state ) );
}
