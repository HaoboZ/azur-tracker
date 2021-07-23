import { Alert, AlertColor, Grow, Snackbar, Theme, useMediaQuery } from '@material-ui/core';
import React from 'react';

type C = ( message: string, type?: AlertColor ) => void;
const SnackBarContext = React.createContext<C>( () => null );
SnackBarContext.displayName = 'SnackBar';

type Message = {
	message: string,
	type: AlertColor
};

export default function SnackBarProvider( { children } ) {
	const wide = useMediaQuery<Theme>( ( theme ) => theme.breakpoints.up( 'sm' ) );
	
	const [ open, setOpen ] = React.useState( false );
	const [ nextSnack, setNextSnack ] = React.useState<Message>( undefined );
	const [ snack, setSnack ] = React.useState<Message>( undefined );
	
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
	
	return <SnackBarContext.Provider
		value={( message, type = 'success' ) => setNextSnack( { message, type } )}>
		{children}
		<Snackbar
			open={open}
			autoHideDuration={5000}
			anchorOrigin={{ vertical: wide ? 'bottom' : 'top', horizontal: 'center' }}
			sx={{
				'& .MuiSnackBar-root': {
					top: {
						xs: 'calc(env(safe-area-inset-top) + 24px)',
						sm: 0
					}
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
				color={snack?.type}
				onClose={() => setOpen( false )}>
				{snack?.message}
			</Alert>
		</Snackbar>
	</SnackBarContext.Provider>;
}

export function useSnackBar() {
	return React.useContext( SnackBarContext );
}

export function withSnackBar( Component ) {
	return ( props ) => <SnackBarContext.Consumer>
		{( snackBar ) => <Component snackBar={snackBar} {...props}/>}
	</SnackBarContext.Consumer>;
}
