import { NextApiHandler } from 'next';
import oAuthClient from '../../../lib/firebase/oAuthClient';

const callback: NextApiHandler = async ( req, res ) => {
	try {
		const { tokens } = await oAuthClient.getToken( req.query.code as string );
		res.send( `<script>
	window.opener.authenticate( ${JSON.stringify( tokens )} );
	window.close();
</script>` );
	} catch ( e ) {
		return res.status( 400 ).send( String( e ) );
	}
};
// noinspection JSUnusedGlobalSymbols
export default callback;
