import { google } from 'googleapis';
import { getToken } from 'next-auth/jwt';

import { auth } from './authInstance';

export default async function getDrive( req ) {
	const token = await getToken( { req, secret: process.env.SECRET } );
	auth.setCredentials( {
		access_token : token.accessToken as string,
		refresh_token: token.refreshToken as string
	} );
	return google.drive( { version: 'v3', auth } );
}
