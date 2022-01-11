import { NextApiHandler } from 'next';
import { oAuthClient } from '../../../lib/firebase/oAuthClient';

const login: NextApiHandler = async ( req, res ) => {
	try {
		const url = oAuthClient.generateAuthUrl( {
			scope       : [
				'https://www.googleapis.com/auth/userinfo.email',
				'https://www.googleapis.com/auth/userinfo.profile'
			],
			redirect_uri: process.env.GOOGLE_CLIENT_REDIRECT_URI
		} );
		res.send( url );
	} catch ( e ) {
		res.status( 400 ).send( String( e ) );
	}
};
// noinspection JSUnusedGlobalSymbols
export default login;
