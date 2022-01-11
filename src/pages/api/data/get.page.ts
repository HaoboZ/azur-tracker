import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';
import { NextApiHandler } from 'next';
import { initialize } from '../../../lib/firebase/server';

const app = initialize();
const auth = getAuth( app );
const db = getDatabase( app );

const GetData: NextApiHandler = async ( req, res ) => {
	try {
		const { uid } = await auth.verifyIdToken( req.cookies.id_token, true );
		
		const ref = db.ref( uid );
		const data = ( await ref.child( 'data' ).get() ).val();
		const timestamp = ( await ref.child( 'timestamp' ).get() ).val();
		
		res.json( { data, timestamp } );
	} catch ( e ) {
		res.status( 400 ).send( String( e ) );
	}
};
// noinspection JSUnusedGlobalSymbols
export default GetData;
