import { mapValues } from 'lodash-es';

export default function deepFlatMap<T>( obj: any, res: T[] = [] ) {
	mapValues( obj, ( value ) => Array.isArray( value )
		? res.push( ...value )
		: deepFlatMap( value, res ) );
	return res;
}
