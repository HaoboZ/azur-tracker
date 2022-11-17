import type { Auth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import type { auth } from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { useEffect, useRef, useState } from 'react';
import { useAsyncEffect } from 'rooks';

type Props = {
	uiConfig: auth.Config,
	firebaseAuth: Auth,
	uiCallback?: ( ui: auth.AuthUI ) => void
};

export default function StyledFirebaseAuth( { uiConfig, firebaseAuth, uiCallback }: Props ) {
	const [ userSignedIn, setUserSignedIn ] = useState( false );
	const elementRef = useRef( null );
	const [ authUI, setAuthUI ] = useState<auth.AuthUI>( null );
	
	useAsyncEffect( async () => {
		const { auth } = await import( 'firebaseui' );
		setAuthUI( auth.AuthUI.getInstance() || new auth.AuthUI( firebaseAuth ) );
	}, [] );
	
	useEffect( () => {
		if ( !authUI ) return;
		if ( uiConfig.signInFlow === 'popup' ) authUI.reset();
		
		const unregisterAuthObserver = onAuthStateChanged( firebaseAuth, ( user ) => {
			if ( !user && userSignedIn ) authUI.reset();
			setUserSignedIn( Boolean( user ) );
		} );
		
		uiCallback?.( authUI );
		
		authUI.start( elementRef.current, uiConfig );
		
		return () => {
			unregisterAuthObserver();
			authUI.reset();
		};
	}, [ authUI, uiConfig ] );
	
	return <div ref={elementRef}/>;
}
