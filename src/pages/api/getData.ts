import { NextApiHandler } from 'next';

import getDrive from '../../lib/driveData/getDrive';
import getFile from '../../lib/driveData/getFile';
import getInfo from '../../lib/driveData/getInfo';

// noinspection JSUnusedGlobalSymbols
export default ( async function GetData( req, res ) {
	try {
		const drive = await getDrive( req );
		const file = await getInfo( drive, 'data.json' );
		const data = await getFile( drive, file );
		res.json( { data, lastSaved: file.modifiedTime } );
	} catch ( e ) {
		res.status( 400 ).send( String( e ) );
	}
} as NextApiHandler );
