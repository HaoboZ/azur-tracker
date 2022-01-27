import stringify from 'fast-json-stable-stringify';
import { getDatabase, ref } from 'firebase/database';
import { omit } from 'lodash-es';
import { Fragment, ReactNode, useEffect, useMemo, useState } from 'react';
import { useObjectVal } from 'react-firebase-hooks/database';
import { useSelector } from 'react-redux';
import { app } from '../../firebase/client';
import useDebounce from '../../hooks/useDebounce';
import useEventListener from '../../hooks/useEventListener';
import { useAuth } from '../auth';
import { useIndicator } from '../indicator';
import { useSplashText } from '../splash';
import getData from './getData';
import setData from './setData';

const db = getDatabase( app );

export default function FireDataProvider( { children, keys }: { children: ReactNode, keys: string[] } ) {
	const auth = useAuth();
	
	const savedKeys = useMemo( () => keys, [] );
	
	return (
		<Fragment>
			{auth?.emailVerified ? <Internal keys={savedKeys}>{children}</Internal> : children}
		</Fragment>
	);
}

function Internal( { children, keys }: { children: ReactNode, keys: string[] } ) {
	const setText = useSplashText();
	const { main, ...state } = useSelector( ( state ) => state );
	const indicator = useIndicator();
	const user = useAuth();
	
	const [ saving, setSaving ] = useState( false );
	const [ loaded, setLoaded ] = useState( 0 );
	
	useEventListener( window, 'beforeunload', ( e: BeforeUnloadEvent ) => {
		if ( !saving ) return;
		e.returnValue = 'Currently saving, are you sure you want to leave?';
	}, { dependencies: [ saving ] } );
	
	const delayedSetData = useDebounce( async ( key ) => {
		await indicator( setData( key ) );
		setSaving( false );
	}, 500 );
	
	/* eslint-disable react-hooks/rules-of-hooks */
	for ( const key of keys ) {
		const [ value ] = useObjectVal( ref( db, `${user.uid}/${key}/timestamp` ) );
		
		// save
		useEffect( () => {
			if ( main.autoSave ) {
				setSaving( true );
				delayedSetData( key );
			}
		}, [ stringify( omit( state[ key ], 'timestamp' ) ) ] );
		
		// load
		useEffect( () => {
			if ( !value ) return;
			( async () => {
				if ( main.autoLoad && value > state[ key ].timestamp ) await getData( key );
				setLoaded( ( loaded ) => loaded + 1 );
			} )();
		}, [ value ] );
	}
	
	useEffect( () => {
		if ( loaded < keys.length ) setText( 'Loading Data...' );
	}, [ loaded ] );
	
	if ( loaded < keys.length ) return null;
	
	return <Fragment>{children}</Fragment>;
}
