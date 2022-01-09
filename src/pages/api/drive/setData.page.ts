import { NextApiHandler } from 'next';
import getDrive from '../../../lib/firebase/drive/getDrive';
import getInfo from '../../../lib/firebase/drive/getInfo';
import setFile from '../../../lib/firebase/drive/setFile';

const SetData: NextApiHandler = async ( req, res ) => {
	try {
		const drive = await getDrive( req );
		const file = await getInfo( drive, 'data.json' );
		
		await setFile( drive, file, req.body.data, req.body.modifiedTime );
		res.end();
	} catch ( e ) {
		res.status( 400 ).send( String( e ) );
	}
};
// noinspection JSUnusedGlobalSymbols
export default SetData;
