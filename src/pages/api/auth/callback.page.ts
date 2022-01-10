import { NextApiHandler } from 'next';
import { oAuthClient } from '../../../lib/firebase/server';
import { checkCors } from '../cors';

const callback: NextApiHandler = async ( req, res ) => {
	try {
		await checkCors( req, res );
		const { tokens } = await oAuthClient.getToken( req.query.code as string );
		res.send( `<script defer>
	window.onload = async () => {
		await window.opener.authenticate( ${JSON.stringify( tokens )} );
		window.close();
	};
</script>` );
	} catch ( e ) {
		return res.status( 400 ).send( String( e ) );
	}
};
// noinspection JSUnusedGlobalSymbols
export default callback;
