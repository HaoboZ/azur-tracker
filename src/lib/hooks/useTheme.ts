import {
	colors,
	createTheme,
	darkScrollbar,
	PaletteMode,
	responsiveFontSizes,
	ThemeOptions,
	useMediaQuery
} from '@mui/material';
import { merge } from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const commonTheme: ThemeOptions = {
	palette   : {
		primary  : { main: colors.lightBlue[ '600' ] },
		secondary: { main: colors.red[ '900' ] }
	},
	typography: {
		h1: { fontSize: 28 },
		h2: { fontSize: 24 },
		h3: { fontSize: 22 },
		h4: { fontSize: 20 },
		h5: { fontSize: 18 },
		h6: { fontSize: 16 }
	},
	components: {
		MuiUseMediaQuery: {
			defaultProps: { noSsr: true }
		}
	}
};

const lightTheme = responsiveFontSizes( createTheme(
	merge( commonTheme, {
		palette: {
			mode      : 'light',
			background: { paper: colors.grey[ '100' ] }
		}
	} )
) );

const darkTheme = responsiveFontSizes( createTheme(
	merge( commonTheme, {
		palette   : {
			mode      : 'dark',
			background: { paper: colors.grey[ '900' ] }
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: {
					body: darkScrollbar()
				}
			},
			MuiAppBar     : {
				styleOverrides: {
					root: { backgroundImage: 'none' }
				}
			}
		}
	} )
) );

export default function useTheme() {
	const theme = useSelector( ( { main } ) => main.theme );
	const dark = useMediaQuery( '(prefers-color-scheme: dark)' );
	
	const mode: PaletteMode = useMemo( () => {
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
