import Cors from 'cors';

const cors = Cors();
export default cors;

export function checkCors( req, res ) {
	return new Promise( ( resolve, reject ) => {
		cors( req, res, ( result ) => {
			if ( result instanceof Error ) {
				return reject( result );
			}
			return resolve( result );
		} );
	} );
}
