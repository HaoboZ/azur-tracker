import { createMuiTheme, PaletteType, useMediaQuery } from '@material-ui/core';
import { useSelector } from 'react-redux';

export default function useTheme() {
	const main = useSelector( store => store.main );
	const dark = useMediaQuery( '(prefers-color-scheme: dark)' );

	return createMuiTheme( {
		palette: {
			type:       main.theme === 'default' ? (dark ? 'dark' : 'light') : main.theme as PaletteType,
			primary:   { main: '#039be5' },
			secondary: { main: '#d50000' }
		}
	} );
};
