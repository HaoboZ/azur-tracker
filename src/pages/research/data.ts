// noinspection SpellCheckingInspection
import Anchorage from '../../../public/images/ships/Anchorage.png';
import August_von_Parseval from '../../../public/images/ships/August_von_Parseval.png';
import Azuma from '../../../public/images/ships/Azuma.png';
import Champagne from '../../../public/images/ships/Champagne.png';
import Cheshire from '../../../public/images/ships/Cheshire.png';
import Drake from '../../../public/images/ships/Drake.png';
import Friedrich_der_Grosse from '../../../public/images/ships/Friedrich_der_Große.png';
import Gascogne from '../../../public/images/ships/Gascogne.png';
import Georgia from '../../../public/images/ships/Georgia.png';
import Hakuryuu from '../../../public/images/ships/Hakuryuu.png';
import Neptune from '../../../public/images/ships/HMS_Neptune.png';
import Ibuki from '../../../public/images/ships/Ibuki.png';
import Izumo from '../../../public/images/ships/Izumo.png';
import Kitakaze from '../../../public/images/ships/Kitakaze.png';
import Mainz from '../../../public/images/ships/Mainz.png';
import Marco_Polo from '../../../public/images/ships/Marco_Polo.png';
import Monarch from '../../../public/images/ships/Monarch.png';
import Odin from '../../../public/images/ships/Odin.png';
import Roon from '../../../public/images/ships/Roon.png';
import Saint_Louis from '../../../public/images/ships/Saint_Louis.png';
import Seattle from '../../../public/images/ships/Seattle.png';
import Agir from '../../../public/images/ships/Ägir.png';

const researchData: {
	name: string,
	ships: { name: string, type: number, fate: boolean, image: StaticImageData, url: string }[]
}[] = [ {
	name : 'PR1',
	ships: [
		{ name: 'Neptune', type: 0, fate: true, image: Neptune, url: 'HMS_Neptune' },
		{ name: 'Monarch', type: 0, fate: true, image: Monarch, url: 'Monarch' },
		{ name: 'Ibuki', type: 0, fate: true, image: Ibuki, url: 'Ibuki' },
		{ name: 'Izumo', type: 0, fate: true, image: Izumo, url: 'Izumo' },
		{ name: 'Roon', type: 0, fate: true, image: Roon, url: 'Roon' },
		{ name: 'Saint Louis', type: 0, fate: true, image: Saint_Louis, url: 'Saint_Louis' }
	]
}, {
	name : 'PR2',
	ships: [
		{ name: 'Seattle', type: 0, fate: true, image: Seattle, url: 'Seattle' },
		{ name: 'Georgia', type: 0, fate: true, image: Georgia, url: 'Georgia' },
		{ name: 'Kitakaze', type: 0, fate: true, image: Kitakaze, url: 'Kitakaze' },
		{ name: 'Azuma', type: 1, fate: true, image: Azuma, url: 'Azuma' },
		{ name: 'Friedrich der Große', type: 1, fate: false, image: Friedrich_der_Grosse, url: 'Friedrich_der_Große' },
		{ name: 'Gascogne', type: 0, fate: true, image: Gascogne, url: 'Gascogne' }
	]
}, {
	name : 'PR3',
	ships: [
		{ name: 'Cheshire', type: 0, fate: true, image: Cheshire, url: 'Cheshire' },
		{ name: 'Drake', type: 1, fate: false, image: Drake, url: 'Drake' },
		{ name: 'Mainz', type: 0, fate: true, image: Mainz, url: 'Mainz' },
		{ name: 'Odin', type: 0, fate: true, image: Odin, url: 'Odin' },
		{ name: 'Champagne', type: 0, fate: true, image: Champagne, url: 'Champagne' }
	]
}, {
	name : 'PR4',
	ships: [
		{ name: 'Anchorage', type: 0, fate: false, image: Anchorage, url: 'Anchorage' },
		{ name: 'Hakuryuu', type: 1, fate: false, image: Hakuryuu, url: 'Hakuryuu' },
		{ name: 'Ägir', type: 1, fate: false, image: Agir, url: 'Ägir' },
		{ name: 'August von Parseval', type: 0, fate: false, image: August_von_Parseval, url: 'August_von_Parseval' },
		{ name: 'Marco Polo', type: 0, fate: false, image: Marco_Polo, url: 'Marco_Polo' }
	]
} ];
export default researchData;

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
	[ 10, 0, 20, 0 ],
	[ 20, 10, 30, 20 ],
	[ 30, 30, 40, 50 ],
	[ 40, 60, 50, 90 ],
	[ 65, 100, 75, 140 ],
	[ 0, 165, 0, 215 ]
];
