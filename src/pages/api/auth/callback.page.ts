import { NextApiHandler } from 'next';
import oAuthClient from '../../../lib/firebase/oAuthClient';

const callback: NextApiHandler = async ( req, res ) => {
	try {
		const { tokens } = await oAuthClient.getToken( req.query.code as string );
		res.send( `<html lang='en'>
<script defer>
	window.onload = async () => document.getElementById( 'main' ).innerText
		= await window.opener.authenticate( ${JSON.stringify( tokens )} );
	// window.close();
</script>
<body>
	<div id='main'>Something went wrong</div>
</body>
</html>` );
	} catch ( e ) {
		return res.status( 400 ).send( String( e ) );
	}
};
// noinspection JSUnusedGlobalSymbols
export default callback;
