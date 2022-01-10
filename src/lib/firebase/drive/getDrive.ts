import { google } from 'googleapis';
import { oAuthClient } from '../server';

export default async function getDrive( req ) {
	oAuthClient.setCredentials( {
		access_token : req.cookies.access_token,
		refresh_token: req.cookies.refresh_token
	} );
	return google.drive( { version: 'v3', auth: oAuthClient } );
}
