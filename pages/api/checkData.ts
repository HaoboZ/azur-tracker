import { NextApiHandler } from 'next';

import getDrive from '../../lib/driveData/getDrive';
import getInfo from '../../lib/driveData/getInfo';

export default ( async function( req, res ) {
	try {
		const { checksum, lastSaved } = req.query;
		const drive = await getDrive( req );
		const file = await getInfo( drive, 'data.json' );
		if ( checksum !== file.md5Checksum ) {
			if ( lastSaved < file.modifiedTime )
				res.json( '"prompt"' );
			else
				res.json( true );
		} else {
			res.json( false );
		}
	} catch ( e ) {
		res.status( 400 ).send( String( e ) );
	}
} as NextApiHandler );
