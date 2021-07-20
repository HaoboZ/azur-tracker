import { NextApiHandler } from 'next';

import getDrive from '../../lib/driveData/getDrive';
import getFile from '../../lib/driveData/getFile';
import getInfo from '../../lib/driveData/getInfo';

const GetData: NextApiHandler = async ( req, res ) => {
	try {
		const drive = await getDrive( req );
		const file = await getInfo( drive, 'data.json' );
		const data = await getFile( drive, file );
		res.json( { data, lastSaved: file.modifiedTime } );
	} catch ( e ) {
		res.status( 400 ).send( String( e ) );
	}
};
// noinspection JSUnusedGlobalSymbols
export default GetData;
