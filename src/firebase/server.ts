import { cert, getApps, initializeApp } from 'firebase-admin/app';
import serviceAccount from './serviceAccountKey.json';

const firebaseServerApp =
	getApps()[0] ||
	initializeApp({
		credential: cert(serviceAccount),
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	});
export default firebaseServerApp;
