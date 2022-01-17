import { Storage } from '@capacitor/storage';
import { Typography } from '@mui/material';
import { sendEmailVerification, User } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import { createContext, useContext, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import AsyncLoadingButton from '../../components/asyncLoadingButton';
import { auth } from '../../firebase/client';

const AuthContext = createContext<User>( undefined );
AuthContext.displayName = 'Auth';

export default function AuthProvider( { children } ) {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [ user, loading, error ] = useAuthState( auth );
	
	useEffect( () => {
		if ( loading || error ) return;
		( async () => {
			const token = await user?.getIdToken();
			if ( token ) await Storage.set( { key: 'id_token', value: token } );
			else await Storage.remove( { key: 'id_token' } );
		} )();
		if ( !user || user.emailVerified ) return;
		const key = enqueueSnackbar( 'Email Not Verified', {
			variant: 'warning',
			action : (
				<AsyncLoadingButton onClick={() => sendEmailVerification( user )}>
					Resend Email
				</AsyncLoadingButton>
			),
			persist: true
		} );
		return () => closeSnackbar( key );
	}, [ user ] );
	
	if ( loading ) return null;
	if ( error ) return <Typography>Error: {error.message}</Typography>;
	
	return (
		<AuthContext.Provider value={user}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext( AuthContext );
}

export function withAuth( Component ) {
	return ( props ) => (
		<AuthContext.Consumer>
			{( user ) => <Component user={user} {...props}/>}
		</AuthContext.Consumer>
	);
}
