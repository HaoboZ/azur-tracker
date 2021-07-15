import { colors, createTheme, PaletteMode, Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

const lightTheme = createTheme( {
	palette   : {
		mode      : 'light',
		background: { paper: colors.grey[ '100' ] },
		primary   : { main: colors.lightBlue[ '600' ] },
		secondary : { main: colors.red[ '900' ] }
	},
	components: {
		MuiUseMediaQuery: {
			defaultProps: { noSsr: true }
		}
	}
} );

const darkTheme = createTheme( {
	palette   : {
		mode      : 'dark',
		background: { paper: colors.grey[ '900' ] },
		primary   : { main: colors.lightBlue[ '600' ] },
		secondary : { main: colors.red[ '900' ] }
	},
	components: {
		MuiUseMediaQuery: {
			defaultProps: { noSsr: true }
		}
	}
} );

export default function useTheme() {
	const main = useSelector( state => state.main );
	const dark = useMediaQuery( '(prefers-color-scheme: dark)' );
	
	const mode: PaletteMode = React.useMemo( () => {
		switch ( main.theme ) {
		case 'light':
		case 'dark':
			return main.theme;
		default:
			return dark ? 'dark' : 'light';
		}
	}, [ main.theme, dark ] );
	
	return mode === 'dark' ? darkTheme : lightTheme;
}

declare module '@material-ui/styles' {
	// noinspection JSUnusedGlobalSymbols
	interface DefaultTheme extends Theme {
	}
}
