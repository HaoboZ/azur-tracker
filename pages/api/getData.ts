import { NextApiHandler } from 'next';

import getData from '../../lib/appData/getData';
import getDrive from '../../lib/appData/getDrive';
import getInfo from '../../lib/appData/getInfo';

export default ( async function( req, res ) {
	try {
		const { checksum } = req.query;
		const drive = await getDrive( req );
		const file = await getInfo( drive, 'data.json' );
		
		if ( checksum !== file.md5Checksum ) {
			const data = await getData( drive, file );
			res.json( data );
			return;
		}
		res.send( {} );
	} catch ( e ) {
		res.status( 400 ).send( String( e ) );
	}
} as NextApiHandler );
