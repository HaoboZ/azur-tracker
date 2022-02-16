import * as fs from 'fs';
import { argv } from 'process';
import neatJSON from './neatJSON';

const file = fs.readFileSync( argv[ 2 ], { encoding: 'utf8' } ).toString();

fs.writeFileSync( argv[ 2 ], neatJSON( JSON.parse( file ), {
	wrap       : true,
	indent     : '\t',
	aligned    : true,
	padding    : 1,
	afterComma : 1,
	afterColonN: 1
} ) );
