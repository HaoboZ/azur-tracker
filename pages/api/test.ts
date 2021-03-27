export default function handler( req, res ) {
	console.log( res, req );
	res.status( 200 ).json( { res, req } );
}
