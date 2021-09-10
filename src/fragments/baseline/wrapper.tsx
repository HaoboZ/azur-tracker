import { GlobalStyles, Theme } from '@mui/material';
import { debounce } from 'lodash';
import { useSession } from 'next-auth/client';
import React from 'react';
import { useSelector } from 'react-redux';

import { textBgColor } from '../../data/colors';
import { backupMutex, checkDataIntegrity, getBackup, setBackup } from '../../lib/backup';
import { useIndicator } from '../../lib/providers/indicator';
import Navigation from '../navigation';

export default function Wrapper( { children } ) {
	const { main, ...store } = useSelector( ( state ) => state );
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
	
	// noinspection ES6RedundantNestingInTemplateLiteral
	return <Navigation>
		<GlobalStyles
			styles={( theme: Theme ) => ( {
				'.numberInput input': {
					textAlign                        : 'right',
					MozAppearance                    : 'textfield',
					[ '&::-webkit-outer-spin-button,' +
					' &::-webkit-inner-spin-button' ]: {
						WebkitAppearance: 'none',
						m               : 0
					}
				},
				'.color-rainbow'    : {
					background: `linear-gradient(to bottom right, ${'#afa'} 15%, ${'#aaf'}, ${'#faa'} 85%) !important`,
					color     : 'black !important'
				},
				'.color-yellow'     : textBgColor( theme, '#eee8aa' ),
				'.color-blue'       : textBgColor( theme, '#b0e0e6' ),
				'.color-gray'       : textBgColor( theme, '#dcdcdc' ),
				'.color-purple'     : textBgColor( theme, '#dda0dd' ),
				'.color-orange'     : textBgColor( theme, '#ffdead' ),
				'.color-red'        : textBgColor( theme, '#ffc0cb' ),
				'.color-green'      : textBgColor( theme, '#98fb98' ),
				'.color-aqua'       : textBgColor( theme, '#7fffd4' ),
				
				'.color-royal'     : textBgColor( theme, '#83aaf0' ),
				'.color-sakura'    : textBgColor( theme, '#fff0f5' ),
				'.color-sardegna'  : textBgColor( theme, '#6ebe93' ),
				'.color-northern'  : textBgColor( theme, '#f5f5f5' ),
				'.color-iris'      : textBgColor( theme, '#ffd700' ),
				'.color-vichya'    : textBgColor( theme, '#d77c7c' ),
				'.color-neptunia'  : textBgColor( theme, '#b39ae5' ),
				'.color-kizuna'    : textBgColor( theme, '#fba5bb' ),
				'.color-hololive'  : textBgColor( theme, '#8ee7f1' ),
				'.color-venus'     : textBgColor( theme, '#ffc0cb' ),
				'.color-idolmaster': textBgColor( theme, '#f8bde9' ),
				'.color-meta'      : textBgColor( theme, '#808080' )
			} )}
		/>
		{children}
	</Navigation>;
}
