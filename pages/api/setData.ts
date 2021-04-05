import { NextApiHandler } from 'next';

import getDrive from '../../lib/driveData/getDrive';
import getInfo from '../../lib/driveData/getInfo';
import setFile from '../../lib/driveData/setFile';

export default ( async function( req, res ) {
	try {
		const { modifiedTime } = req.query as Record<string, string>;
		const drive = await getDrive( req );
		const file = await getInfo( drive, 'data.json' );
		const lastSaved = await setFile( drive, file, req.body, modifiedTime );
		res.json( { lastSaved } );
	} catch ( e ) {
		res.status( 400 ).send( String( e ) );
	}
} as NextApiHandler );
