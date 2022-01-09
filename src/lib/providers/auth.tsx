import { Typography } from '@mui/material';
import axios from 'axios';
import { GoogleAuthProvider, signInWithCredential, signOut, User } from 'firebase/auth';
import { Credentials } from 'google-auth-library';
import Cookies from 'js-cookie';
import { createContext, useContext, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/client';

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

export async function login( width = 400, height = 550 ) {
	const win = window.open( '', undefined, Object.entries( {
		width,
		height,
		left    : window.top.outerWidth / 2 + window.top.screenX - width / 2,
		top     : window.top.outerHeight / 2 + window.top.screenY - height / 2,
		toolbar : false,
		menubar : false,
		location: false
		// noopener: false
	} ).map( ( val ) => val.join( '=' ) ).join( ',' ) );
	const { data } = await axios.post( `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login` );
	win.location.href = data;
	// @ts-ignore
	window.authenticate = async ( tokens: Credentials ) => {
		await signInWithCredential( auth, GoogleAuthProvider.credential( tokens.id_token, tokens.access_token ) );
		Cookies.set( 'access_token', tokens.access_token, { expires: new Date( 32503708800000 ) } );
		Cookies.set( 'refresh_token', tokens.refresh_token, { expires: new Date( 32503708800000 ) } );
	};
}

export async function logout() {
	await signOut( auth );
	Cookies.remove( 'access_token' );
	Cookies.remove( 'refresh_token' );
}
