import { createMuiTheme, PaletteType, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

export default function useTheme() {
	const main = useSelector( state => state.main );
	const dark = useMediaQuery( '(prefers-color-scheme: dark)' );
	
	const type: PaletteType = React.useMemo( () => {
		switch ( main.theme ) {
		case 'light':
		case 'dark':
			return main.theme;
		default:
			return dark ? 'dark' : 'light';
		}
	}, [ main.theme, dark ] );
	
	return createMuiTheme( {
		palette: {
			type,
			primary  : { main: '#039be5' },
			secondary: { main: '#d50000' }
		}
	} );
}
