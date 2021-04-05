import { google } from 'googleapis';
import { getToken } from 'next-auth/jwt';

export default async function getDrive( req ) {
	const auth = new google.auth.OAuth2( process.env.NEXT_PUBLIC_GOOGLE_ID, process.env.GOOGLE_SECRET );
	const token = await getToken( { req, secret: process.env.SECRET } );
	auth.setCredentials( {
		access_token:  token.accessToken as string,
		refresh_token: token.refreshToken as string
	} );
	return google.drive( { version: 'v3', auth } );
}
