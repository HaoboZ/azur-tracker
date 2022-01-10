import { NextApiHandler } from 'next';
import { oAuthClient } from '../../../lib/firebase/server';
import { checkCors } from '../cors';

const login: NextApiHandler = async ( req, res ) => {
	try {
		await checkCors( req, res );
		const url = oAuthClient.generateAuthUrl( {
			access_type : 'offline',
			prompt      : 'consent',
			scope       : [
				'https://www.googleapis.com/auth/userinfo.email',
				'https://www.googleapis.com/auth/userinfo.profile',
				'https://www.googleapis.com/auth/drive.appdata'
			],
			redirect_uri: `${process.env.GOOGLE_CLIENT_REDIRECT_URI}/api/auth/callback`
		} );
		res.send( url );
	} catch ( e ) {
		res.status( 400 ).send( String( e ) );
	}
};
// noinspection JSUnusedGlobalSymbols
export default login;
