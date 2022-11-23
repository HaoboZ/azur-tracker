import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async ( req, res ) => {
	try {
		res.send( 'pong' );
	} catch ( e ) {
		res.status( 500 ).send( e.response?.data || e.message );
	}
};
export default handler;
