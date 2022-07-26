import { Dialog } from '@capacitor/dialog';
import stringify from 'fast-json-stable-stringify';
import { getDatabase, ref } from 'firebase/database';
import { pick } from 'lodash-es';
import { useState } from 'react';
import { useObjectVal } from 'react-firebase-hooks/database';
import useAfterEffect from '../../hooks/useAfterEffect';
import useAsyncEffect from '../../hooks/useAsyncEffect';
import useDebounce from '../../hooks/useDebounce';
import useEventListener from '../../hooks/useEventListener';
import useNetworkStatus from '../../hooks/useNetworkStatus';
import { useAuth } from '../../providers/auth';
import { useIndicator } from '../../providers/indicator';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setTimestamp } from '../../store/reducers/mainReducer';
import { app } from '../client';
import getData from './getData';
import setData from './setData';

const db = getDatabase( app );

export default function StoreSync( { keys }: { keys: string[] } ) {
	const user = useAuth();
	
	if ( !user?.emailVerified ) return null;
	
	return <Internal keys={keys}/>;
}

function Internal( { keys }: { keys: string[] } ) {
	const dispatch = useAppDispatch();
	const { main, data } = useAppSelector( ( { main, ...state } ) => ( { main, data: pick( state, keys ) } ) );
	const indicator = useIndicator();
	const user = useAuth();
	const networkStatus = useNetworkStatus();
	const [ serverTimestamp ] = useObjectVal<string>( ref( db, `${user.uid}/timestamp` ) );
	
	const [ saving, setSaving ] = useState( false );
	const [ loading, setLoading ] = useState( false );
	
	useEventListener( window, 'beforeunload', ( e: BeforeUnloadEvent ) => {
		if ( !saving ) return;
		e.returnValue = 'Currently saving, are you sure you want to leave?';
	}, { dependencies: [ saving ] } );
	
	const debouncedSetTimestamp = useDebounce( async () => {
		dispatch( setTimestamp() );
		setSaving( true );
	}, 500 );
	
	useAfterEffect( () => {
		if ( loading ) return;
		debouncedSetTimestamp();
	}, [ stringify( data ) ] );
	
	// save
	useAsyncEffect( async () => {
		if ( !networkStatus || !main.autoSync || loading || main.timestamp >= main.lastTimestamp ) return;
		if ( serverTimestamp !== main.lastTimestamp ) {
			const { value } = await Dialog.confirm( {
				title  : 'Conflicts Found',
				message: 'Override cloud data?'
			} );
			if ( !value ) return;
		}
		await indicator( setData( keys ) );
		setSaving( false );
	}, [ networkStatus, main.timestamp ] );
	
	// load
	useAsyncEffect( async () => {
		if ( !networkStatus || !main.autoSync || saving || !serverTimestamp || serverTimestamp <= main.lastTimestamp ) return;
		setLoading( true );
		if ( main.timestamp !== main.lastTimestamp ) {
			const { value } = await Dialog.confirm( {
				title  : 'Conflicts Found',
				message: 'Override local data?'
			} );
			if ( !value ) return setLoading( false );
		}
		await getData( keys );
		setLoading( false );
	}, [ networkStatus, serverTimestamp ] );
	
	return null;
}
