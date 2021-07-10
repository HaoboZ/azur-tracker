export const researchShips: Record<string, { name: string, type: number, fate: boolean, url: string }[]> = {
	'PR1': [
		{ name: 'Neptune', type: 0, fate: true, url: 'HMS_Neptune' },
		{ name: 'Monarch', type: 0, fate: true, url: 'Monarch' },
		{ name: 'Ibuki', type: 0, fate: true, url: 'Ibuki' },
		{ name: 'Izumo', type: 0, fate: true, url: 'Izumo' },
		{ name: 'Roon', type: 0, fate: true, url: 'Roon' },
		{ name: 'Saint Louis', type: 0, fate: true, url: 'Saint_Louis' }
	],
	'PR2': [
		{ name: 'Seattle', type: 0, fate: true, url: 'Seattle' },
		{ name: 'Georgia', type: 0, fate: true, url: 'Georgia' },
		{ name: 'Kitakaze', type: 0, fate: true, url: 'Kitakaze' },
		{ name: 'Azuma', type: 1, fate: false, url: 'Azuma' },
		{ name: 'Friedrich der Groβe', type: 1, fate: false, url: 'Friedrich_der_Grosse' },
		{ name: 'Gascogne', type: 0, fate: true, url: 'Gascogne' }
	],
	'PR3': [
		{ name: 'Cheshire', type: 0, fate: true, url: 'Cheshire' },
		{ name: 'Drake', type: 1, fate: false, url: 'Drake' },
		{ name: 'Mainz', type: 0, fate: true, url: 'Mainz' },
		{ name: 'Odin', type: 0, fate: true, url: 'Odin' },
		{ name: 'Champagne', type: 0, fate: true, url: 'Champagne' }
	],
	'PR4': [
		{ name: 'Anchorage', type: 0, fate: false, url: 'Anchorage' },
		{ name: 'Hakuryuu', type: 1, fate: false, url: 'Hakuryuu' },
		{ name: 'Ägir', type: 1, fate: false, url: 'Ägir' },
		{ name: 'August von Parseval', type: 0, fate: false, url: 'August_von_Parseval' },
		{ name: 'Marco Polo', type: 0, fate: false, url: 'Marco_Polo' }
	]
};

export const devLevels = [
	[ 2, 0, 3, 0 ],
	[ 2, 2, 3, 3 ],
	[ 2, 4, 3, 6 ],
	[ 2, 6, 3, 9 ],
	[ 5, 8, 8, 12 ],
	[ 4, 13, 6, 20 ],
	[ 4, 17, 6, 26 ],
	[ 4, 21, 6, 32 ],
	[ 4, 25, 6, 38 ],
	[ 8, 29, 12, 44 ],
	[ 6, 37, 9, 56 ],
	[ 6, 43, 9, 65 ],
	[ 6, 49, 9, 74 ],
	[ 6, 55, 9, 83 ],
	[ 12, 61, 18, 92 ],
	[ 10, 73, 15, 110 ],
	[ 10, 83, 15, 125 ],
	[ 10, 93, 15, 140 ],
	[ 10, 103, 15, 155 ],
	[ 20, 113, 30, 170 ],
	[ 15, 133, 22, 200 ],
	[ 15, 148, 22, 222 ],
	[ 15, 163, 22, 244 ],
	[ 15, 178, 22, 266 ],
	[ 30, 193, 45, 288 ],
	[ 20, 223, 30, 333 ],
	[ 20, 243, 30, 363 ],
	[ 20, 263, 30, 393 ],
	[ 20, 283, 30, 423 ],
	[ 40, 303, 60, 453 ],
	[ 0, 343, 0, 513 ]
];

export const fateLevels = [
	[ 10, 0 ],
	[ 20, 10 ],
	[ 30, 30 ],
	[ 40, 60 ],
	[ 65, 100 ],
	[ 0, 165 ]
];
