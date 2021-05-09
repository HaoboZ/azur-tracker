import { createMuiTheme, PaletteType, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

export default function useTheme() {
	const main = useSelector( store => store.main );
	const dark = useMediaQuery( '(prefers-color-scheme: dark)' );
	
	const type: PaletteType = React.useMemo( () => {
		switch ( main.theme ) {
		case 'light':
			return 'light';
		case 'dark':
			return 'dark';
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
};
