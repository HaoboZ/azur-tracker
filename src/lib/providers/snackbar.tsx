import { Alert, AlertColor, Grow, Snackbar, Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';

type C = {
	enqueueSnackbar: ( message: string, props?: { variant: AlertColor } ) => void,
	closeSnackbar: () => void
};
const SnackbarContext = React.createContext<C>( {
	enqueueSnackbar: () => null,
	closeSnackbar  : () => null
} );
SnackbarContext.displayName = 'Snackbar';

type Message = {
	message: string,
	props?: { variant: AlertColor }
};

export default function SnackbarProvider( { children } ) {
	const wide = useMediaQuery<Theme>( ( { breakpoints } ) => breakpoints.up( 'sm' ) );
	
	const [ open, setOpen ] = React.useState( false );
	const [ nextSnack, setNextSnack ] = React.useState<Message>( undefined );
	const [ snack, setSnack ] = React.useState<Message>( undefined );
	
	// queues up snack
	React.useEffect( () => {
		if ( nextSnack && !snack ) {
			// Set a new snack when we don't have an active one
			setSnack( nextSnack );
			setNextSnack( undefined );
			setOpen( true );
		} else if ( nextSnack && snack && open ) {
			// Close an active snack when a new one is added
			setOpen( false );
		}
	}, [ nextSnack, snack ] );
	
	// noinspection JSUnusedGlobalSymbols
	return <SnackbarContext.Provider
		value={{
			enqueueSnackbar: ( message, props ) => setNextSnack( { message, props } ),
			closeSnackbar  : () => setOpen( false )
		}}>
		{children}
		<Snackbar
			open={open}
			autoHideDuration={5000}
			anchorOrigin={{ vertical: wide ? 'bottom' : 'top', horizontal: 'center' }}
			sx={{
				pointerEvents: 'none',
				mt           : {
					xs: 'env(safe-area-inset-top)',
					sm: 0
				}
			}}
			TransitionComponent={Grow}
			onClose={( e, reason ) => {
				if ( reason === 'clickaway' ) return;
				setOpen( false );
			}}
			TransitionProps={{ onExited: () => setSnack( undefined ) }}>
			<Alert
				variant='filled'
				color={snack?.props?.variant}
				sx={{ pointerEvents: 'auto' }}
				onClose={() => setOpen( false )}>
				{snack?.message}
			</Alert>
		</Snackbar>
	</SnackbarContext.Provider>;
}

export function useSnackbar() {
	return React.useContext( SnackbarContext );
}

export function withSnackbar( Component ) {
	return props => <SnackbarContext.Consumer>
		{snackbar => <Component snackbar={snackbar} {...props}/>}
	</SnackbarContext.Consumer>;
}
