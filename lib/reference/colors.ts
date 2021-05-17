import { makeStyles } from '@material-ui/core';
import { CSSProperties } from 'react';

export const
	rarityColors = {
		'Decisive'  : 'rainbow',
		'Ultra Rare': 'rainbow',
		'UR'        : 'rainbow',
		'Priority'  : 'yellow',
		'Super Rare': 'yellow',
		'SR'        : 'yellow',
		'Elite'     : 'purple',
		'E'         : 'purple',
		'Rare'      : 'blue',
		'R'         : 'blue',
		'Common'    : 'gray',
		'N'         : 'gray'
	},
	typeColors   = {
		'Destroyer'             : 'blue',
		'Light Cruiser'         : 'orange',
		'Heavy Cruiser'         : 'orange',
		'Large Cruiser'         : 'orange',
		'Battlecruiser'         : 'red',
		'Battleship'            : 'red',
		'Aviation Battleship'   : 'red',
		'Light Aircraft Carrier': 'purple',
		'Aircraft Carrier'      : 'purple',
		'Monitor'               : 'red',
		'Submarine'             : 'green',
		'Submarine Carrier'     : 'green',
		'Repair Ship'           : 'aqua',
		'Munition Ship'         : 'aqua'
	},
	nationColors = {
		'Universal'          : 'gray',
		'Eagle Union'        : 'blue',
		'Royal Navy'         : 'royal',
		'Sakura Empire'      : 'sakura',
		'Ironblood'          : 'red',
		'Dragon Empery'      : 'purple',
		'Sardegna Empire'    : 'sardegna',
		'Northern Parliament': 'northern',
		'Iris Libre'         : 'iris',
		'Vichya Dominion'    : 'vichya',
		'Neptunia'           : 'neptunia',
		'KizunaAI'           : 'kizuna',
		'Hololive'           : 'hololive',
		'Venus Vacation'     : 'venus',
		'META'               : 'meta'
	},
	tierColors   = [
		'rainbow',
		'yellow',
		'purple',
		'blue',
		'gray'
	];

export const mappedColorStyles: Record<string, CSSProperties> = {
	rainbow: {
		background: `linear-gradient(to bottom right, ${'#afa'} 15%, ${'#aaf'}, ${'#faa'} 85%)`,
		color     : 'black'
	},
	yellow : { backgroundColor: '#eee8aa', color: 'black' },
	blue   : { backgroundColor: '#b0e0e6', color: 'black' },
	gray   : { backgroundColor: '#dcdcdc', color: 'black' },
	purple : { backgroundColor: '#dda0dd', color: 'black' },
	orange : { backgroundColor: '#ffdead', color: 'black' },
	red    : { backgroundColor: '#ffc0cb', color: 'black' },
	green  : { backgroundColor: '#98fb98', color: 'black' },
	aqua   : { backgroundColor: '#7fffd4', color: 'black' },
	
	royal   : { backgroundColor: '#83aaf0', color: 'white' },
	sakura  : { backgroundColor: '#fff0f5', color: 'black' },
	sardegna: { backgroundColor: '#6ebe93', color: 'black' },
	northern: { backgroundColor: '#f5f5f5', color: 'black' },
	iris    : { backgroundColor: '#ffd700', color: 'black' },
	vichya  : { backgroundColor: '#d77c7c', color: 'white' },
	neptunia: { backgroundColor: '#b39ae5', color: 'white' },
	kizuna  : { backgroundColor: '#fba5bb', color: 'black' },
	hololive: { backgroundColor: '#8ee7f1', color: 'black' },
	venus   : { backgroundColor: '#ffc0cb', color: 'black' },
	meta    : { backgroundColor: '#808080', color: 'white' }
};

export const useMappedColorClasses = makeStyles( mappedColorStyles as never );
