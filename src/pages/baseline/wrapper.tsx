import { GlobalStyles, Theme } from '@mui/material';
import { debounce } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { backupMutex, checkDataIntegrity, getBackup, setBackup } from '../../lib/backup';
import useIntervalEffect from '../../lib/hooks/useIntervalEffect';
import { useAuth } from '../../lib/providers/auth';
import { useIndicator } from '../../lib/providers/indicator';
import { textBgColor } from '../colors';
import Navigation from './navigation';

export default function Wrapper( { children } ) {
	const { main, ...store } = useSelector( ( state ) => state );
	const user = useAuth();
	const indicator = useIndicator();
	
	const delayedSetBackup = useCallback( debounce( () => backupMutex.runExclusive(
		async () => await indicator( setBackup( await checkDataIntegrity() ) )
	), main.autoSaveInterval ), [ main.autoSaveInterval ] );
	
	// auto save
	useEffect( () => {
		if ( main.autoSave && user ) delayedSetBackup();
	}, Object.values( store ) );
	
	async function loadData() {
		if ( main.autoLoad && user ) await backupMutex.runExclusive(
			async () => await indicator( getBackup( await checkDataIntegrity() ) )
		);
	}
	
	// load on log
	useEffect( () => {
		loadData().then();
	}, [ user ] );
	
	// auto load
	useIntervalEffect( loadData, main.autoLoadInterval, [ main.autoLoadInterval ] );
	
	// noinspection ES6RedundantNestingInTemplateLiteral
	return (
		<Navigation>
			<GlobalStyles
				styles={( theme: Theme ) => ( {
					'.numberInput input': {
						'::-webkit-outer-spin-button, ::-webkit-inner-spin-button': {
							WebkitAppearance: 'none',
							m               : 0
						},
						
						'textAlign'    : 'right',
						'MozAppearance': 'textfield'
					},
					'.color-rainbow'    : {
						background: `linear-gradient(to bottom right, ${'#aaffaa'} 15%, ${'#aaaaff'}, ${'#ffaaaa'} 85%) !important`,
						color     : 'black !important'
					},
					'.color-gray'       : textBgColor( theme, '#cccccc' ),
					'.color-blue'       : textBgColor( theme, '#9fe8ff' ),
					'.color-purple'     : textBgColor( theme, '#c4adff' ),
					'.color-yellow'     : textBgColor( theme, '#eeee99' ),
					'.color-orange'     : textBgColor( theme, '#ffd192' ),
					'.color-red'        : textBgColor( theme, '#ff8d8d' ),
					'.color-green'      : textBgColor( theme, '#98fb98' ),
					'.color-aqua'       : textBgColor( theme, '#76ffdd' ),
					
					'.color-eagle'     : textBgColor( theme, '#9fe8ff' ),
					'.color-royal'     : textBgColor( theme, '#000080' ),
					'.color-sakura'    : textBgColor( theme, '#f4c0ff' ),
					'.color-iron'      : textBgColor( theme, '#ffb4b4' ),
					'.color-dragon'    : textBgColor( theme, '#c4adff' ),
					'.color-northern'  : textBgColor( theme, '#f7f7f7' ),
					'.color-iris'      : textBgColor( theme, '#ffd192' ),
					'.color-vichya'    : textBgColor( theme, '#ff8d8d' ),
					'.color-sardegna'  : textBgColor( theme, '#98fb98' ),
					'.color-neptunia'  : textBgColor( theme, '#c4adff' ),
					'.color-kizuna'    : textBgColor( theme, '#fba5bb' ),
					'.color-hololive'  : textBgColor( theme, '#8ee7f1' ),
					'.color-venus'     : textBgColor( theme, '#f5497f' ),
					'.color-idolmaster': textBgColor( theme, '#f8bde9' ),
					'.color-ssss'      : textBgColor( theme, '#6B6C65' ),
					'.color-meta'      : textBgColor( theme, '#808080' )
				} )}
			/>
			{children}
		</Navigation>
	);
}
