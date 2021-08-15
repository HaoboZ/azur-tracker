import { NextApiHandler } from 'next';

import getDrive from '../../lib/google/drive/getDrive';
import getInfo from '../../lib/google/drive/getInfo';
import setFile from '../../lib/google/drive/setFile';

const SetData: NextApiHandler = async ( req, res ) => {
	try {
		const { modifiedTime } = req.query as Record<string, string>;
		const drive = await getDrive( req );
		const file = await getInfo( drive, 'data.json' );
		
		await setFile( drive, file, req.body, modifiedTime );
		res.end();
	} catch ( e ) {
		res.status( 400 ).send( String( e ) );
	}
};
// noinspection JSUnusedGlobalSymbols
export default SetData;
