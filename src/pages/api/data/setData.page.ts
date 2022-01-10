import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';
import { NextApiHandler } from 'next';
import hash from 'object-hash';
import { initialize } from '../../../lib/firebase/server';
import { checkCors } from '../cors';

const app = initialize();
const auth = getAuth( app );
const db = getDatabase( app );

const SetData: NextApiHandler = async ( req, res ) => {
	try {
		await checkCors( req, res );
		const { uid } = await auth.verifyIdToken( req.cookies.id_token, true );
		
		const data = {
			data     : req.body.data,
			checksum : hash( req.body.data ),
			timestamp: req.body.timestamp
		};
		// console.log( JSON.stringify( data ).length );
		// if ( JSON.stringify( data ).length > 20000 ) throw 'Too Large';
		
		const ref = db.ref( uid );
		await ref.set( data );
		
		res.end();
	} catch ( e ) {
		res.status( 400 ).send( String( e ) );
	}
};
// noinspection JSUnusedGlobalSymbols
export default SetData;
