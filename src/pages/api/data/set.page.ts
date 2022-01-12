import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';
import { NextApiHandler } from 'next';
import hash from 'object-hash';
import { initialize } from '../../../lib/firebase/server';

const app = initialize();
const auth = getAuth( app );
const db = getDatabase( app );

const SetData: NextApiHandler = async ( req, res ) => {
	try {
		const { uid, email_verified } = await auth.verifyIdToken( req.cookies.id_token, true );
		if ( !email_verified ) throw new Error( 'Email not verified' );
		
		const data = {
			data     : req.body.data,
			checksum : hash( req.body.data ),
			timestamp: req.body.timestamp
		};
		if ( JSON.stringify( data ).length > 20000 ) throw 'Size Exceeded';
		
		const ref = db.ref( uid );
		await ref.set( data );
		
		res.end();
	} catch ( e ) {
		res.status( 400 ).send( String( e ) );
	}
};
// noinspection JSUnusedGlobalSymbols
export default SetData;
