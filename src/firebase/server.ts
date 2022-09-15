import { cert, getApps, initializeApp } from 'firebase-admin/app';

const firebaseServerApp = getApps()[ 0 ] || initializeApp( {
	credential: cert( {
		projectId  : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
		privateKey : process.env.FIREBASE_PRIVATE_KEY
	} ),
	projectId : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
} );
export default firebaseServerApp;
