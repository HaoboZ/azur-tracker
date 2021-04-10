import { Grow, Snackbar, Theme, useMediaQuery } from '@material-ui/core';
import { Alert, Color } from '@material-ui/lab';
import React from 'react';

const SnackbarContext = React.createContext<{
	showMessage: ( message: string, type?: Color ) => void
}>( {
	showMessage: () => null
} );
SnackbarContext.displayName = 'Snackbar';

type Message = {
	message: string
	type: Color
}

export default function SnackbarProvider( { children } ) {
	const size = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	const [ open, setOpen ]           = React.useState( false ),
	      [ nextSnack, setNextSnack ] = React.useState<Message>( undefined ),
	      [ snack, setSnack ]         = React.useState<Message>( undefined );
	
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
	
	return <SnackbarContext.Provider value={{
		showMessage: ( message, type = 'success' ) => {
			setNextSnack( { message, type } );
		}
	}}>
		{children}
		<Snackbar
			open={open}
			autoHideDuration={5000}
			anchorOrigin={{ vertical: size ? 'bottom' : 'top', horizontal: 'center' }}
			TransitionComponent={Grow}
			onClose={( e, reason ) => {
				if ( reason === 'clickaway' ) return;
				setOpen( false );
			}}
			onExited={() => setSnack( undefined )}>
			<Alert
				variant='filled'
				color={snack?.type}
				onClose={() => setOpen( false )}>
				{snack?.message}
			</Alert>
		</Snackbar>
	</SnackbarContext.Provider>;
}

export function useSnackBar() {
	return React.useContext( SnackbarContext );
}

export function withSnackbar() {
	return ( Component ) => ( props ) => (
		<SnackbarContext.Consumer>
			{( snackbar ) => <Component snackbar={snackbar} {...props}/>}
		</SnackbarContext.Consumer>
	);
}
