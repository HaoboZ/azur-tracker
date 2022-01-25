import stringify from 'fast-json-stable-stringify';
import { getDatabase, ref } from 'firebase/database';
import { debounce, omit } from 'lodash';
import { Fragment, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useObjectVal } from 'react-firebase-hooks/database';
import { useSelector } from 'react-redux';
import { app } from '../../firebase/client';
import { useAuth } from '../auth';
import { useIndicator } from '../indicator';
import getData from './getData';
import setData from './setData';

const db = getDatabase( app );

export default function FireDataProvider( { children, keys }: { children: ReactNode, keys: string[] } ) {
	const auth = useAuth();
	
	const memoedKeys = useMemo( () => keys, [] );
	
	return (
		<Fragment>
			{auth?.emailVerified ? <Internal keys={memoedKeys}>{children}</Internal> : children}
		</Fragment>
	);
}

function Internal( { children, keys }: { children: ReactNode, keys: string[] } ) {
	const { main, ...state } = useSelector( ( state ) => state );
	const indicator = useIndicator();
	const user = useAuth();
	
	const delayedSetData = useCallback( debounce( ( key ) => indicator( setData( key ) ), 1000 ), [] );
	
	const [ loaded, setLoaded ] = useState( 0 );
	
	/* eslint-disable react-hooks/rules-of-hooks */
	for ( const key of keys ) {
		const [ value ] = useObjectVal( ref( db, `${user.uid}/${key}/timestamp` ) );
		
		// save
		useEffect( () => {
			if ( !value || !main.autoSave ) return;
			delayedSetData( key );
		}, [ stringify( omit( state[ key ], 'timestamp' ) ) ] );
		
		// load
		useEffect( () => {
			if ( !value ) return;
			if ( !main.autoLoad ) return setLoaded( ( loaded ) => loaded + 1 );
			getData( key ).then( () => setLoaded( ( loaded ) => loaded + 1 ) );
		}, [ value ] );
	}
	
	if ( loaded < keys.length ) return null;
	
	return <Fragment>{children}</Fragment>;
}
