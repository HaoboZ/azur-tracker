import { google } from 'googleapis';
import { getToken } from 'next-auth/jwt';

import { auth } from '../authInstance';

export default async function getDrive( req ) {
	const { accessToken } = await getToken( { req, secret: process.env.SECRET } );
	auth.setCredentials( { access_token: accessToken as string } );
	return google.drive( { version: 'v3', auth } );
}
