import { NextApiHandler } from 'next';

const revalidate: NextApiHandler = async ( req, res ) => {
	if ( req.query.secret !== process.env.SECRET ) {
		return res.status( 401 ).json( { message: 'Invalid token' } );
	}
	
	try {
		await res.revalidate( '/' );
		await res.revalidate( '/research' );
		await res.revalidate( '/fleet' );
		await res.revalidate( '/info' );
		return res.end();
	} catch ( err ) {
		return res.status( 500 ).send( 'Error revalidating' );
	}
};
export default revalidate;
