import stringify from 'fast-json-stable-stringify';
import { getDatabase, ref } from 'firebase/database';
import { debounce } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useObjectVal } from 'react-firebase-hooks/database';
import { useSelector } from 'react-redux';
import { getData, setData } from '../../lib/firebase/storage';
import { useAuth } from '../../lib/providers/auth';
import { useIndicator } from '../../lib/providers/indicator';

const db = getDatabase();

export default function AutoData() {
	const { main, ...state } = useSelector( ( state ) => state );
	const indicator = useIndicator();
	const user = useAuth();
	const [ value, loading, error ] = useObjectVal( ref( db, `${user.uid}/timestamp` ) );
	
	const delayedSetBackup = useCallback( debounce( () => indicator( setData() ), 1000 ), [] );
	
	// save
	useEffect( () => {
		if ( !value || loading || error ) return;
		if ( main.autoSave && value <= main.lastSaved ) delayedSetBackup();
	}, [ stringify( state ) ] );
	
	// load
	useEffect( () => {
		if ( !value || loading || error ) return;
		if ( main.autoLoad && value > main.lastSaved ) getData().then();
	}, [ value ] );
	
	return null;
}
