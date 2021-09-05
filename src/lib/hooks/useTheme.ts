import { colors, createTheme, PaletteMode, Theme, ThemeOptions, useMediaQuery } from '@mui/material';
import { merge } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';

const commonTheme: ThemeOptions = {
	palette   : {
		primary  : { main: colors.lightBlue[ '600' ] },
		secondary: { main: colors.red[ '900' ] }
	},
	components: {
		MuiUseMediaQuery: {
			defaultProps: { noSsr: true }
		}
	}
};

const lightTheme = createTheme( merge( commonTheme, {
	palette: {
		mode      : 'light',
		background: { paper: colors.grey[ '100' ] }
	}
} ) );

const darkTheme = createTheme( merge( commonTheme, {
	palette: {
		mode      : 'dark',
		background: { paper: colors.grey[ '900' ] }
	}
} ) );

export default function useTheme() {
	const theme = useSelector( ( { main } ) => main.theme );
	const dark = useMediaQuery( '(prefers-color-scheme: dark)' );
	
	const mode: PaletteMode = React.useMemo( () => {
		switch ( theme ) {
		case 'light':
		case 'dark':
			return theme;
		default:
			return dark ? 'dark' : 'light';
		}
	}, [ theme, dark ] );
	
	return mode === 'dark' ? darkTheme : lightTheme;
}

declare module '@mui/private-theming' {
	// noinspection JSUnusedGlobalSymbols
	interface DefaultTheme extends Theme {
	}
}
