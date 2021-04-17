import { createMuiTheme } from '@material-ui/core';

export default {
	light: createMuiTheme( {
		palette: {
			type:    'light',
			primary: { main: '#039be5' }
			// secondary: red
		}
	} ),
	dark:  createMuiTheme( {
		palette: {
			type:    'dark',
			primary: { main: '#039be5' }
			// secondary: red
		}
	} )
};
