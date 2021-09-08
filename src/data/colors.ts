// noinspection SpellCheckingInspection

export const
	rarityColors  = {
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
	typeColors    = {
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
	factionColors = {
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
		'The Idolmaster'     : 'idolmaster',
		'META'               : 'meta'
	},
	tierColors    = [
		'rainbow',
		'yellow',
		'purple',
		'blue',
		'gray'
	];

export const textBgColor = ( theme, backgroundColor ) => ( {
	color          : `${theme.palette.getContrastText( backgroundColor )} !important`,
	backgroundColor: `${backgroundColor} !important`
} );

