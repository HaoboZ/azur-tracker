import { NextApiHandler } from 'next';
import getDrive from '../../lib/google/drive/getDrive';
import getInfo from '../../lib/google/drive/getInfo';

const CheckData: NextApiHandler = async ( req, res ) => {
	try {
		const { checksum, lastSaved } = req.body;
		const drive = await getDrive( req );
		const file = await getInfo( drive, 'data.json' );
		
		if ( checksum !== file.md5Checksum ) {
			if ( lastSaved < file.modifiedTime )
				res.json( { action: 'prompt' } );
			else if ( lastSaved > file.modifiedTime )
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
