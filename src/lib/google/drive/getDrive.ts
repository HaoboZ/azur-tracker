import { google } from 'googleapis';
import { getToken } from 'next-auth/jwt';

import { auth } from '../authInstance';

export default async function getDrive( req ) {
	const { accessToken, refreshToken } = await getToken( { req, secret: process.env.SECRET } );
	auth.setCredentials( { access_token: accessToken as string, refresh_token: refreshToken as string } );
	return google.drive( { version: 'v3', auth } );
}
