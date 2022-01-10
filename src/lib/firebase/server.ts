import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { google } from 'googleapis';

export const initialize = () => getApps()[ 0 ] || initializeApp( {
	credential : cert( {
		projectId  : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
		privateKey : process.env.FIREBASE_PRIVATE_KEY?.replace( /\\n/g, '\n' )
	} ),
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
}, 'azurLaneTracker' );

export const oAuthClient = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	`${process.env.GOOGLE_CLIENT_REDIRECT_URI}/api/auth/callback`
);
