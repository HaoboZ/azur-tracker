import { makeStyles } from '@material-ui/styles';
import { debounce } from 'lodash';
import { useSession } from 'next-auth/client';
import React from 'react';
import { useSelector } from 'react-redux';

import { backupMutex, checkDataIntegrity, getBackup, setBackup } from '../../lib/backup';
import { useIndicator } from '../../lib/providers/indicator';
import Navigation from '../navigation';

const useStyles = makeStyles( ( { palette } ) => ( {
	'@global': {
		'.selectedSort': { backgroundColor: `${palette.primary.main} !important` },
		'.numberInput' : {
			textAlign                                                   : 'right',
			'&[type=number]'                                            : {
				'-moz-appearance': 'textfield'
			},
			'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
				'-webkit-appearance': 'none',
				margin              : 0
			}
		}
	}
} ) );

export default function Wrapper( { children } ) {
	useStyles();
	const { main, ...store } = useSelector( state => state );
	const [ session ] = useSession();
	const indicator = useIndicator();
	
	const delayedSetBackup = React.useCallback(
		debounce( () => backupMutex.runExclusive( async () =>
			await indicator( setBackup( await checkDataIntegrity() ) )
		), main.autoSaveInterval ), [ main.autoSaveInterval ] );
	
	// auto save
	React.useEffect( () => {
		if ( main.autoSave && session ) delayedSetBackup();
	}, Object.values( store ) );
	
	// load on log
	React.useEffect( () => {
		( async () => {
			if ( main.autoLoad && session ) await backupMutex.runExclusive(
				async () => await indicator( getBackup( await checkDataIntegrity() ) )
			);
		} )();
	}, [ Boolean( session ) ] );
	
	// auto load
	React.useEffect( () => {
		const interval = setInterval( async () => {
			if ( main.autoLoad && session ) await backupMutex.runExclusive(
				async () => await indicator( getBackup( await checkDataIntegrity() ) ) );
		}, main.autoLoadInterval );
		return () => clearInterval( interval );
	}, [ main.autoLoadInterval ] );
	
	return <Navigation>
		{children}
	</Navigation>;
}
