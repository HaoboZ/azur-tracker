import { makeStyles, Theme, useMediaQuery } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import IndicatorProvider from '../../lib/providers/indicator';

const useStyles = makeStyles( ( theme ) => ( {
	snack: {
		[ theme.breakpoints.down( 'xs' ) ]: {
			top: 'env(safe-area-inset-top)'
		}
	}
} ) );

export default function Providers( { children }: { children?: React.ReactNode } ) {
	const classes = useStyles();
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ), { noSsr: true } );
	
	return <SnackbarProvider
		maxSnack={2}
		anchorOrigin={{ vertical: wide ? 'bottom' : 'top', horizontal: 'center' }}
		classes={{ root: classes.snack }}>
		<IndicatorProvider>
			{children}
		</IndicatorProvider>
	</SnackbarProvider>;
}
