import type { NextApiHandler } from 'next';

const revalidate: NextApiHandler = async ( req, res ) => {
	try {
		await res.revalidate( '/event' );
		await res.revalidate( '/research' );
		await res.revalidate( '/fleet' );
		await res.revalidate( '/info' );
		await res.revalidate( '/tier' );
		return res.send( 'Success' );
	} catch ( err ) {
		console.error( err );
		return res.status( 500 ).send( 'Error revalidating' );
	}
};
// noinspection JSUnusedGlobalSymbols
export default revalidate;
