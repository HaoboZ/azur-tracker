import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';
import { NextApiHandler } from 'next';
import { initialize } from '../../../lib/firebase/server';

const app = initialize();
const auth = getAuth( app );
const db = getDatabase( app );

const CheckData: NextApiHandler = async ( req, res ) => {
	try {
		const { uid, email_verified } = await auth.verifyIdToken( req.cookies.id_token, true );
		if ( !email_verified ) throw new Error( 'Email not verified' );
		
		const ref = db.ref( uid );
		const checksum = ( await ref.child( 'checksum' ).get() ).val();
		const timestamp = ( await ref.child( 'timestamp' ).get() ).val();
		
		if ( req.body.checksum !== checksum ) {
			if ( req.body.timestamp < timestamp )
				res.json( { action: 'prompt' } );
			else if ( req.body.timestamp > timestamp )
				res.json( { action: 'update' } );
			else
				res.json( { action: true } );
		} else {
			res.json( { action: false } );
		}
	} catch ( e ) {
		res.status( 400 ).send( String( e ) );
	}
};
// noinspection JSUnusedGlobalSymbols
export default CheckData;
