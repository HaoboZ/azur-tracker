import { GlobalStyles, Theme } from '@mui/material';
import { debounce } from 'lodash';
import { useSession } from 'next-auth/client';
import React from 'react';
import { useSelector } from 'react-redux';

import { bgcolorGen } from '../../data/colors';
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
				'.selectedSort'     : { bgcolor: `${theme.palette.primary.main} !important` },
				'.numberInput input': {
					textAlign                                                   : 'right',
					MozAppearance                                               : 'textfield',
					'&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
						WebkitAppearance: 'none',
						m               : 0
					}
				},
				'.color-rainbow'    : {
					background: `linear-gradient(to bottom right, ${'#afa'} 15%, ${'#aaf'}, ${'#faa'} 85%) !important`,
					color     : 'black !important'
				},
				'.color-yellow'     : bgcolorGen( theme, '#eee8aa' ),
				'.color-blue'       : bgcolorGen( theme, '#b0e0e6' ),
				'.color-gray'       : bgcolorGen( theme, '#dcdcdc' ),
				'.color-purple'     : bgcolorGen( theme, '#dda0dd' ),
				'.color-orange'     : bgcolorGen( theme, '#ffdead' ),
				'.color-red'        : bgcolorGen( theme, '#ffc0cb' ),
				'.color-green'      : bgcolorGen( theme, '#98fb98' ),
				'.color-aqua'       : bgcolorGen( theme, '#7fffd4' ),
				
				'.color-royal'     : bgcolorGen( theme, '#83aaf0' ),
				'.color-sakura'    : bgcolorGen( theme, '#fff0f5' ),
				'.color-sardegna'  : bgcolorGen( theme, '#6ebe93' ),
				'.color-northern'  : bgcolorGen( theme, '#f5f5f5' ),
				'.color-iris'      : bgcolorGen( theme, '#ffd700' ),
				'.color-vichya'    : bgcolorGen( theme, '#d77c7c' ),
				'.color-neptunia'  : bgcolorGen( theme, '#b39ae5' ),
				'.color-kizuna'    : bgcolorGen( theme, '#fba5bb' ),
				'.color-hololive'  : bgcolorGen( theme, '#8ee7f1' ),
				'.color-venus'     : bgcolorGen( theme, '#ffc0cb' ),
				'.color-idolmaster': bgcolorGen( theme, '#f8bde9' ),
				'.color-meta'      : bgcolorGen( theme, '#808080' )
			} )}
		/>
		{children}
	</Navigation>;
}
