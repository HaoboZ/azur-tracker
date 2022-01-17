import { EmailAuthProvider, GoogleAuthProvider, sendEmailVerification } from 'firebase/auth';
import { useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth } from '../../firebase/client';
import { useModalControls } from '../modal';
import { ResponsiveModalContainer } from '../modal/responsiveModal';
import { useAuth } from './index';

export default function LoginModal() {
	const user = useAuth();
	const { closeModal } = useModalControls();
	
	useEffect( () => {
		if ( user ) closeModal();
	}, [ user ] );
	
	return (
		<ResponsiveModalContainer>
			<StyledFirebaseAuth
				firebaseAuth={auth}
				uiConfig={{
					// @ts-ignore
					signInFlow      : window.navigator.standalone ? 'redirect' : 'popup',
					privacyPolicyUrl: '/privacy',
					tosUrl          : '/tos',
					signInOptions   : [
						EmailAuthProvider.PROVIDER_ID,
						GoogleAuthProvider.PROVIDER_ID
					],
					callbacks       : {
						signInSuccessWithAuthResult: ( authResult ) => {
							if ( authResult.additionalUserInfo.isNewUser ) {
								sendEmailVerification( authResult.user ).then();
							}
							return false;
						}
					}
				}}
			/>
		</ResponsiveModalContainer>
	);
}
