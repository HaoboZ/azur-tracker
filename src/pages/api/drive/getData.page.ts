import { NextApiHandler } from 'next';
import getDrive from '../../../lib/firebase/drive/getDrive';
import getFile from '../../../lib/firebase/drive/getFile';
import getInfo from '../../../lib/firebase/drive/getInfo';

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
