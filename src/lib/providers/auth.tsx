import { Typography } from '@mui/material';
import { signInWithPopup, signOut, User } from 'firebase/auth';
import Cookies from 'js-cookie';
import { createContext, useContext, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/client';
import { googleProvider } from '../firebase/googleProvider';

const AuthContext = createContext<User>( undefined );
AuthContext.displayName = 'Auth';

export default function AuthProvider( { children } ) {
	const [ user, loading, error ] = useAuthState( auth );
	
	useEffect( () => {
		if ( loading || error ) return;
		( async () => {
			const token = await user?.getIdToken();
			if ( token ) Cookies.set( 'id_token', token );
			else Cookies.remove( 'id_token' );
		} )();
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

export async function login() {
	await signInWithPopup( auth, googleProvider );
}

export async function logout() {
	await signOut( auth );
}
