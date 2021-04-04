import { NextApiHandler } from 'next';

import getDrive from '../../lib/appData/getDrive';
import getInfo from '../../lib/appData/getInfo';
import writeData from '../../lib/appData/writeData';

export default ( async function( req, res ) {
	try {
		const { checksum } = req.query;
		const drive = await getDrive( req );
		const file = await getInfo( drive, 'data.json' );
		
		if ( checksum !== file.md5Checksum ) {
			await writeData( drive, file, req.body );
			res.json( 'true' );
			return;
		}
		res.json( 'false' );
	} catch ( e ) {
		res.status( 400 ).send( String( e ) );
	}
} as NextApiHandler );
