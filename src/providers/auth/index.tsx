import { Storage } from '@capacitor/storage';
import { getAuth, onIdTokenChanged, sendEmailVerification, User } from 'firebase/auth';
import { pick } from 'lodash-es';
import { useSnackbar } from 'notistack';
import { createContext, useContext, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import AsyncLoadingButton from '../../components/asyncLoadingButton';
import { app } from '../../firebase/client';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUser } from '../../store/reducers/mainReducer';

const auth = getAuth( app );

const AuthContext = createContext<Partial<User>>( undefined );
AuthContext.displayName = 'Auth';

export default function AuthProvider( { children } ) {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const dispatch = useAppDispatch();
	const savedUser = useAppSelector( ( { main } ) => main.user );
	const [ user, loading, error ] = useAuthState( auth );
	
	useEffect( () => onIdTokenChanged( auth, async ( user ) => {
		const token = await user?.getIdToken();
		if ( token ) await Storage.set( { key: 'id_token', value: token } );
		else await Storage.remove( { key: 'id_token' } );
	} ), [] );
	
	useEffect( () => {
		if ( loading || error ) return;
		dispatch( setUser( pick( user, [
			'apiKey',
			'displayName',
			'email',
			'emailVerified',
			'isAnonymous',
			'phoneNumber',
			'photoURL',
			'providerId',
			'uid',
			'refreshToken'
		] ) ) );
		if ( !user || user.emailVerified ) return;
		const key = enqueueSnackbar( 'Email Not Verified', {
			variant: 'warning',
			persist: true,
			action : (
				<AsyncLoadingButton onClick={() => sendEmailVerification( user )}>
					Resend Email
				</AsyncLoadingButton>
			)
		} );
		return () => closeSnackbar( key );
	}, [ user ] );
	
	useEffect( () => {
		if ( !error ) return;
		enqueueSnackbar( `Error: ${error.message}`, { variant: 'warning' } );
	}, [ error ] );
	
	return (
		<AuthContext.Provider value={savedUser}>
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
