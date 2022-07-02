import { NextApiHandler } from 'next';

const revalidate: NextApiHandler = async ( req, res ) => {
	if ( req.query.secret !== process.env.SECRET ) {
		return res.status( 401 ).send( 'Invalid token' );
	}
	
	try {
		await res.revalidate( '/' );
		await res.revalidate( '/research' );
		await res.revalidate( '/fleet' );
		await res.revalidate( '/info' );
		return res.send( 'Success' );
	} catch ( err ) {
		return res.status( 500 ).send( 'Error revalidating' );
	}
};
export default revalidate;
