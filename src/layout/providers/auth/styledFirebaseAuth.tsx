import type { Auth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { useEffect, useRef, useState } from 'react';

type Props = {
	uiConfig: auth.Config,
	firebaseAuth: Auth,
	className?: string,
	uiCallback?: ( ui: auth.AuthUI ) => void
};

export default function StyledFirebaseAuth( { uiConfig, firebaseAuth, className, uiCallback }: Props ) {
	const [ userSignedIn, setUserSignedIn ] = useState( false );
	const elementRef = useRef( null );
	
	useEffect( () => {
		const authUI = auth.AuthUI.getInstance() || new auth.AuthUI( firebaseAuth );
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
	}, [ uiConfig ] );
	
	return <div ref={elementRef} className={className}/>;
}
