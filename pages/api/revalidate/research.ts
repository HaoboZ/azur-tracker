import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async ( req, res ) => {
	try {
		await res.revalidate( '/research' );
		res.end();
	} catch ( e ) {
		res.status( 500 ).send( e.response?.data || e.message );
	}
};
export default handler;
