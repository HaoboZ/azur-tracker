import stringify from 'json-stable-stringify';
import LZ from 'lz-string';
import { createTransform } from 'redux-persist';

export default createTransform(
	( state ) => {
		return LZ.compressToUTF16( stringify( state ) );
	},
	( state ) => {
		if ( typeof state !== 'string' ) return state;
		try {
			return JSON.parse( LZ.decompressFromUTF16( state ) );
		} catch ( err ) {
			return null;
		}
	}
);
