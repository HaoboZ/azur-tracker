import { NextApiHandler } from 'next';

import getDrive from '../../lib/driveData/getDrive';
import getInfo from '../../lib/driveData/getInfo';

const CheckData: NextApiHandler = async ( req, res ) => {
	try {
		const { checksum, lastSaved } = req.query;
		const drive = await getDrive( req );
		const file = await getInfo( drive, 'data.json' );
		
		if ( checksum !== file.md5Checksum ) {
			if ( lastSaved < file.modifiedTime )
				res.json( '"prompt"' );
			else if ( lastSaved > file.modifiedTime )
				res.json( '"update"' );
			else
				res.json( true );
		} else {
			res.json( false );
		}
	} catch ( e ) {
		res.status( 400 ).send( String( e ) );
	}
};
// noinspection JSUnusedGlobalSymbols
export default CheckData;
