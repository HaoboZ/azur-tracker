import { FirebaseOptions, initializeApp } from 'firebase/app';

const firebaseConfig: FirebaseOptions = {
	apiKey     : process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId  : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
};

export const app = initializeApp( firebaseConfig );
