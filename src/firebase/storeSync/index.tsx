import { Dialog } from '@capacitor/dialog';
import { getDatabase, ref } from 'firebase/database';
import objectHash from 'object-hash';
import { useState } from 'react';
import { useObjectVal } from 'react-firebase-hooks/database';
import { useAsyncEffect, useDebouncedValue, useDidUpdate, useOnline, useWindowEventListener } from 'rooks';
import { pick } from 'underscore';
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
	const online = useOnline();
	const [ serverTimestamp, serverLoading ] = useObjectVal<string>( ref( db, `users/${user.uid}/timestamp` ) );
	const [ hash ] = useDebouncedValue( objectHash( data ), 500 );
	
	const [ saving, setSaving ] = useState( 0 );
	const [ loading, setLoading ] = useState( 0 );
	
	useWindowEventListener( 'beforeunload', ( e: BeforeUnloadEvent ) => {
		if ( !saving ) return;
		e.returnValue = 'Currently saving, are you sure you want to leave?';
	} );
	
	useDidUpdate( () => {
		if ( loading ) return;
		setSaving( ( save ) => save + 1 );
		dispatch( setTimestamp() );
	}, [ hash ] );
	
	// save
	useAsyncEffect( async () => {
		if ( !online || serverLoading || !main.autoSync || loading || main.timestamp <= main.lastTimestamp ) {
			return setSaving( ( save ) => Math.max( save - 1, 0 ) );
		}
		if ( serverTimestamp !== main.lastTimestamp ) {
			const { value } = await Dialog.confirm( {
				title  : 'Conflicts Found',
				message: 'Override cloud data?'
			} );
			if ( !value ) return setSaving( ( save ) => Math.max( save - 1, 0 ) );
		}
		await indicator( setData( keys ) );
		setSaving( ( save ) => Math.max( save - 1, 0 ) );
	}, [ online, serverLoading, main.timestamp ] );
	
	// load
	useAsyncEffect( async () => {
		if ( !online || serverLoading || !main.autoSync || saving || !serverTimestamp || serverTimestamp <= main.lastTimestamp ) return;
		setLoading( ( load ) => load + 1 );
		if ( main.timestamp !== main.lastTimestamp ) {
			const { value } = await Dialog.confirm( {
				title  : 'Conflicts Found',
				message: 'Override local data?'
			} );
			if ( !value ) return setLoading( ( load ) => Math.max( load - 1, 0 ) );
		}
		await indicator( getData( keys ) );
		setLoading( ( load ) => Math.max( load - 1, 0 ) );
	}, [ online, serverLoading, serverTimestamp ] );
	
	return null;
}
