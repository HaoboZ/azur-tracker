import concealmentImage from '../../../public/images/other/concealment.png';
import determinationImage from '../../../public/images/other/determination.png';
import equilibriumImage from '../../../public/images/other/equilibrium.png';
import explorationImage from '../../../public/images/other/exploration.png';
import harmonyImage from '../../../public/images/other/harmony.png';
import { equipMap as map } from '../fleet/ship/equip/data';

export const opSiWeakness: [ StaticImageData, string, string ][] = [
	[ determinationImage, 'Determination', 'Airstrikes' ],
	[ explorationImage, 'Exploration', 'Airstrikes' ],
	[ concealmentImage, 'Concealment', 'Shelling' ],
	[ equilibriumImage, 'Equilibrium', 'Shelling' ],
	[ harmonyImage, 'Harmony', 'Torpedoes' ]
];

export const stageDrops = {
	'Chapter': {
		1 : {
			4: [
				map[ 'Single 120mm QF Mark IX Naval Gun/R' ]
			]
		},
		2 : {
			1: [
				map[ 'Hydraulic Steering Gear/R' ]
			],
			2: [
				map[ 'Naval Camouflage/R' ]
			],
			3: [
				map[ 'Air Radar/E' ],
				map[ 'Fire Suppressor/R' ]
			],
			4: [
				map[ 'Single 150mm SK C/28 Main Gun Mount/E' ],
				map[ 'Air Radar/E' ]
			]
		},
		3 : {
			1: [
				map[ 'Fuel Filter/E' ]
			],
			2: [
				map[ 'Steam Catapult/E' ],
				map[ 'Single 127mm Main Gun/E' ],
				map[ 'SB2C Helldiver/E' ]
			],
			3: [
				map[ '76mm AA Gun/R' ]
			],
			4: [
				map[ 'Repair Toolkit/E' ],
				map[ 'F4U Corsair/E' ]
			]
		},
		4 : {
			1: [
				map[ 'Anti-Torpedo Bulge/E' ]
			],
			2: [
				map[ 'Triple 152mm Main Gun/E' ],
				map[ 'Twin 120mm Main Gun Mount/E' ],
				map[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ]
			],
			3: [
				map[ 'Fire Control Radar/E' ],
				map[ 'Twin 152mm Main Gun/E' ],
				map[ 'Twin 203mm (SK C/34)/E' ]
			],
			4: [
				map[ '610mm Quadruple Torpedo Mount/E' ],
				map[ 'Twin 203mm (SK C/34)/E' ]
			]
		},
		5 : {
			1: [
				map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/SR' ],
				map[ 'Advanced Boiler/E' ],
				map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ]
			],
			2: [
				map[ 'F6F Hellcat/SR' ],
				map[ '533mm Quadruple Torpedo Mount/E' ],
				map[ 'F6F Hellcat/E' ]
			],
			3: [
				map[ 'BTD-1 Destroyer/SR' ],
				map[ 'Aviation Oil Tank/E' ]
			],
			4: [
				map[ 'Quadruple 40mm Bofors AA Gun Mount/SR' ],
				map[ 'Quadruple 40mm Bofors AA Gun Mount/E' ],
				map[ 'Octuple 40mm Pom-Pom Gun Mount/E' ]
			]
		},
		6 : {
			1: [
				map[ 'SG Radar/SR' ],
				map[ 'SG Radar/E' ],
				map[ 'Twin 100mm Type 98 High-Angle Gun/E' ]
			],
			2: [
				map[ 'Triple 155mm Main Gun Mount/SR' ],
				map[ 'Gyroscope/E' ],
				map[ 'Triple 406mm Mk 6 Main Gun Mount/E' ],
				map[ 'Triple 155mm Main Gun Mount/E' ]
			],
			3: [
				map[ 'Triple 406mm Main Gun/SR' ],
				map[ 'Autoloader/E' ],
				map[ 'Triple 406mm Mk 6 Main Gun Mount/E' ],
				map[ 'Twin 410mm Naval Gun Mount/E' ]
			],
			4: [
				map[ '610mm Quadruple Torpedo Mount/SR' ],
				map[ '533mm Quintuple Torpedo Mount/E' ],
				map[ '610mm Quadruple Torpedo Mount/E' ]
			]
		},
		7 : {
			1: [
				map[ 'Octuple 40mm Pom-Pom Gun Mount/SR' ]
			],
			2: [
				map[ 'Twin 113mm AA Gun Mount/SR' ],
				map[ 'Steam Catapult/E' ],
				map[ 'Twin 113mm AA Gun Mount/E' ],
				map[ 'Barracuda/E' ],
				map[ 'Triple 155mm Main Gun Mount/E' ]
			],
			3: [
				map[ 'Twin 203mm (SK C/34)/SR' ],
				map[ 'Twin 100mm Type 98 High-Angle Gun/E' ],
				map[ 'Twin 410mm Naval Gun Mount/E' ]
			],
			4: [
				map[ '533mm Quintuple Torpedo Mount/SR' ],
				map[ 'Anti-Torpedo Bulge/E' ],
				map[ 'SG Radar/E' ],
				map[ 'Seafang/E' ]
			]
		},
		8 : {
			1: [
				map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/SR' ],
				map[ 'Twin 120mm Main Gun Mount/E' ],
				map[ 'Single 150mm SK C/28 Main Gun Mount/E' ]
			],
			2: [
				map[ '610mm Quadruple Torpedo Mount/SR' ],
				map[ 'Twin 100mm Type 98 High-Angle Gun/E' ]
			],
			3: [
				map[ 'Triple 155mm Main Gun Mount/SR' ]
			],
			4: [
				map[ 'Twin 203mm (SK C/34)/SR' ],
				map[ 'Twin 203mm (SK C/34)/E' ]
			]
		},
		9 : {
			1: [
				map[ 'Twin 105mm SK C/33 AA Gun Mount/SR' ],
				map[ 'Advanced Boiler/E' ],
				map[ 'Octuple 40mm Pom-Pom Gun Mount/E' ]
			],
			2: [
				map[ 'Ship Maintenance Facility/SR' ],
				map[ 'Fuel Filter/E' ]
			],
			3: [
				map[ 'Type 0 Fighter Model 52/SR' ],
				map[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ]
			],
			4: [
				map[ 'Twin 100mm Type 98 High-Angle Gun/SR' ],
				map[ 'Triple 152mm Main Gun/E' ]
			]
		},
		10: {
			1: [
				map[ 'Twin 105mm SK C/33 AA Gun Mount/SR' ],
				map[ 'Autoloader/E' ],
				map[ 'Single 127mm Main Gun/E' ],
				map[ 'Twin 152mm Main Gun/E' ]
			],
			2: [
				map[ 'SG Radar/SR' ],
				map[ 'Anti-Torpedo Bulge/E' ],
				map[ 'Gyroscope/E' ],
				map[ 'Triple 152mm Main Gun/E' ]
			],
			3: [
				map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/SR' ],
				map[ 'Fire Control Radar/E' ],
				map[ 'Repair Toolkit/E' ],
				map[ 'Triple 152mm Main Gun/E' ]
			],
			4: [
				map[ '610mm Quadruple Torpedo Mount/SR' ],
				map[ 'Fuel Filter/E' ],
				map[ '610mm Quadruple Torpedo Mount/E' ]
			]
		},
		11: {
			1: [
				map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/SR' ],
				map[ 'Steam Catapult/E' ],
				map[ 'Single 127mm Main Gun/E' ],
				map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ]
			],
			2: [
				map[ '610mm Quadruple Torpedo Mount/SR' ],
				map[ 'SG Radar/E' ],
				map[ 'F4U Corsair/E' ],
				map[ '610mm Quadruple Torpedo Mount/E' ],
				map[ 'Single 150mm SK C/28 Main Gun Mount/E' ]
			],
			3: [
				map[ 'Quadruple 40mm Bofors AA Gun Mount/SR' ],
				map[ 'Autoloader/E' ],
				map[ 'F6F Hellcat/E' ]
			],
			4: [
				map[ 'Twin 113mm AA Gun Mount/SR' ],
				map[ 'Triple 152mm Main Gun/E' ],
				map[ 'SB2C Helldiver/E' ],
				map[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ]
			]
		},
		12: {
			1: [
				map[ 'Type 0 Fighter Model 52/SR' ]
			],
			2: [
				map[ '610mm Quadruple Torpedo Mount/SR' ],
				map[ '610mm Quadruple Torpedo Mount/E' ]
			],
			3: [
				map[ 'Suisei/SR' ],
				map[ 'Triple 155mm Main Gun Mount/E' ]
			],
			4: [
				map[ 'Twin 100mm Type 98 High-Angle Gun/SR' ],
				map[ 'Twin 100mm Type 98 High-Angle Gun/E' ],
				map[ 'Twin 410mm Naval Gun Mount/E' ]
			]
		},
		13: {
			1: [
				map[ 'Triple 155mm Main Gun Mount/SR' ],
				map[ 'Triple 152mm Main Gun/E' ],
				map[ 'Triple 155mm Main Gun Mount/E' ]
			],
			2: [
				map[ 'Type 0 Fighter Model 52/SR' ]
			],
			3: [
				map[ 'F6F Hellcat/SR' ],
				map[ 'F4U Corsair/E' ],
				map[ 'F6F Hellcat/E' ]
			],
			4: [
				map[ 'Mark 16 Submarine Torpedo/SR' ],
				map[ 'Twin 100mm Type 98 High-Angle Gun/E' ],
				map[ 'Mark 16 Submarine Torpedo/E' ]
			]
		},
		14: {
			1: [
				map[ 'Quadruple 40mm Bofors AA Gun Mount/SR' ],
				map[ 'Fire Control Radar/E' ],
				map[ 'Repair Toolkit/E' ],
				map[ 'Twin 410mm Naval Gun Mount/E' ]
			],
			2: [
				map[ 'Octuple 40mm Pom-Pom Gun Mount/SR' ],
				map[ 'SG Radar/E' ],
				map[ 'Anti-Torpedo Bulge/E' ]
			],
			3: [
				map[ 'Twin 100mm Type 98 High-Angle Gun/SR' ],
				map[ 'Autoloader/E' ],
				map[ 'Advanced Boiler/E' ],
				map[ '610mm Quadruple Torpedo Mount/E' ],
				map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ]
			],
			4: [
				map[ 'SG Radar/SR' ],
				map[ 'Gyroscope/E' ],
				map[ 'Fuel Filter/E' ],
				map[ 'Triple 155mm Main Gun Mount/E' ]
			]
		}
	},
	
	'Visitors Dyed In Red'          : {
		A: {
			1: [
				map[ '533mm Quintuple Torpedo Mount/E' ]
			],
			2: [
				map[ 'Advanced Boiler/E' ]
			],
			3: [
				map[ 'Triple 155mm Main Gun Mount/E' ],
				map[ 'Twin 410mm Naval Gun Mount/E' ]
			]
		},
		B: {
			1: [
				map[ '610mm Quadruple Torpedo Mount/SR' ],
				map[ '610mm Quadruple Torpedo Mount/E' ]
			],
			2: [
				map[ 'Triple 155mm Main Gun Mount/SR' ]
			],
			3: [
				map[ 'Suisei/SR' ]
			]
		},
		C: {
			1: [
				map[ '533mm Quintuple Torpedo Mount/SR' ],
				map[ '533mm Quintuple Torpedo Mount/E' ]
			],
			2: [
				map[ 'Ship Maintenance Facility/SR' ],
				map[ 'Advanced Boiler/E' ]
			],
			3: [
				map[ 'Type 0 Fighter Model 52/SR' ],
				map[ 'Triple 155mm Main Gun Mount/E' ],
				map[ 'Twin 410mm Naval Gun Mount/E' ],
				map[ 'Aichi E16A Zuiun/E' ]
			]
		},
		D: {
			1: [
				map[ 'Twin 100mm Type 98 High-Angle Gun/SR' ],
				map[ '610mm Quadruple Torpedo Mount/SR' ],
				map[ '610mm Quadruple Torpedo Mount/E' ]
			],
			2: [
				map[ 'A7M Reppuu/SR' ],
				map[ 'Triple 155mm Main Gun Mount/SR' ],
				map[ 'Tenzan/E' ],
				map[ 'A7M Reppuu/E' ]
			],
			3: [
				map[ 'Aichi B7A Ryusei/SR' ],
				map[ 'Suisei/SR' ],
				map[ 'Aichi B7A Ryusei/E' ]
			]
		}
	},
	'Frigid Winter\'s Crown'        : {
		A: {
			1: [
				map[ 'Twin 152mm Main Gun/E' ],
				map[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ]
			],
			2: [
				map[ 'Fuel Filter/E' ],
				map[ 'Gyroscope/E' ],
				map[ 'Twin 203mm (SK C/34)/E' ]
			],
			3: [
				map[ 'Fire Control Radar/E' ],
				map[ 'Octuple 40mm Pom-Pom Gun Mount/E' ]
			]
		},
		B: {
			1: [
				map[ 'Autoloader/E' ]
			],
			2: [
				map[ 'Aviation Oil Tank/E' ],
				map[ 'Barracuda/E' ]
			],
			3: [
				map[ 'Advanced Boiler/E' ],
				map[ 'Triple 406mm Mk 6 Main Gun Mount/E' ]
			]
		},
		C: {
			1: [
				map[ '610mm Quadruple Torpedo Mount/SR' ],
				map[ 'Triple 152mm Main Gun/E' ],
				map[ 'Twin 152mm Main Gun/E' ],
				map[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ]
			],
			2: [
				map[ 'Twin 203mm (SK C/34)/SR' ],
				map[ 'Fuel Filter/E' ],
				map[ 'Gyroscope/E' ],
				map[ 'Twin 203mm (SK C/34)/E' ]
			],
			3: [
				map[ 'Octuple 40mm Pom-Pom Gun Mount/SR' ],
				map[ 'Fire Control Radar/E' ],
				map[ 'Octuple 40mm Pom-Pom Gun Mount/E' ]
			]
		},
		D: {
			1: [
				map[ 'Triple 406mm Main Gun/SR' ],
				map[ 'Autoloader/E' ]
			],
			2: [
				map[ 'Seafang/SR' ],
				map[ 'Barracuda/E' ]
			],
			3: [
				map[ 'Twin 380mm SK C/34 Main Gun Mount/SR' ],
				map[ 'Twin 105mm SK C/33 AA Gun Mount/SR' ],
				map[ 'Triple 406mm Mk 6 Main Gun Mount/E' ]
			]
		}
	},
	'Fallen Wings'                  : {
		A: {
			1: [
				map[ '533mm Quadruple Torpedo Mount/E' ],
				map[ 'Single 127mm Main Gun/E' ],
				map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ]
			],
			2: [
				map[ 'Air Radar/E' ],
				map[ 'SG Radar/E' ],
				map[ 'Triple 152mm Main Gun/E' ]
			],
			3: [
				map[ 'Fuel Filter/E' ],
				map[ 'Gyroscope/E' ]
			]
		},
		B: {
			1: [
				map[ 'Fire Control Radar/E' ],
				map[ 'Autoloader/E' ],
				map[ 'Quadruple 40mm Bofors AA Gun Mount/E' ]
			],
			2: [
				map[ 'Repair Toolkit/E' ],
				map[ 'F4U Corsair/E' ]
			],
			3: [
				map[ 'Steam Catapult/E' ],
				map[ 'Triple 406mm Mk 6 Main Gun Mount/E' ],
				map[ 'F6F Hellcat/E' ],
				map[ 'SB2C Helldiver/E' ]
			]
		},
		C: {
			1: [
				map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/SR' ],
				map[ 'Advanced Boiler/E' ],
				map[ '533mm Quadruple Torpedo Mount/E' ],
				map[ 'Single 127mm Main Gun/E' ],
				map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ]
			],
			2: [
				map[ 'SG Radar/SR' ],
				map[ 'Air Radar/E' ],
				map[ 'SG Radar/E' ],
				map[ 'Triple 152mm Main Gun/E' ]
			],
			3: [
				map[ '533mm Quadruple Torpedo Mount/SR' ],
				map[ 'Fuel Filter/E' ],
				map[ 'Gyroscope/E' ]
			]
		},
		D: {
			1: [
				map[ 'Quadruple 40mm Bofors AA Gun Mount/SR' ],
				map[ 'Fire Control Radar/E' ],
				map[ 'Autoloader/E' ],
				map[ 'Quadruple 40mm Bofors AA Gun Mount/E' ]
			],
			2: [
				map[ 'BTD-1 Destroyer/SR' ],
				map[ 'F4U Corsair/E' ]
			],
			3: [
				map[ 'Steam Catapult/SR' ],
				map[ 'F6F Hellcat/SR' ],
				map[ 'Triple 406mm Mk 6 Main Gun Mount/E' ],
				map[ 'F6F Hellcat/E' ]
			]
		}
	},
	'Operation Divergent Chessboard': {
		A: {
			1: [
				map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ],
				map[ 'Twin 128mm SK C/41 Dual-Purpose Gun Mount/E' ]
			],
			3: [
				map[ '533mm Quadruple Torpedo Mount/E' ],
				map[ '610mm Quadruple Torpedo Mount/E' ]
			],
			4: [
				map[ 'Triple 283mm SK C/28 Main Gun Mount/E' ],
				map[ 'Ju-87C Dive Bomber/E' ]
			]
		},
		B: {
			1: [
				map[ '533mm Quadruple Torpedo Mount/E' ],
				map[ '610mm Quadruple Torpedo Mount/E' ],
				map[ '533mm Quadruple Magnetic Torpedo Mount/E' ]
			],
			2: [
				map[ 'Air Radar/E' ],
				map[ 'Aviation Oil Tank/E' ],
				map[ 'Ju-87C Dive Bomber/E' ]
			],
			3: [
				map[ '533mm Quadruple Torpedo Mount/E' ],
				map[ 'Triple 283mm SK C/28 Main Gun Mount/E' ],
				map[ '533mm Quintuple Magnetic Torpedo Mount/E' ]
			],
			4: [
				map[ 'Steam Catapult/E' ],
				map[ 'Twin 120mm Main Gun Mount/E' ],
				map[ 'Twin 128mm SK C/41 Dual-Purpose Gun Mount/E' ]
			]
		},
		C: {
			1: [
				map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ],
				map[ 'Twin 128mm SK C/41 Dual-Purpose Gun Mount/E' ]
			],
			3: [
				map[ '533mm Quadruple Torpedo Mount/E' ],
				map[ '610mm Quadruple Torpedo Mount/E' ]
			],
			4: [
				map[ 'Triple 283mm SK C/28 Main Gun Mount/E' ],
				map[ 'Ju-87C Dive Bomber/E' ]
			]
		},
		D: {
			1: [
				map[ '533mm Quadruple Magnetic Torpedo Mount/SR' ],
				map[ '533mm Quadruple Torpedo Mount/E' ],
				map[ '610mm Quadruple Torpedo Mount/E' ],
				map[ '533mm Quadruple Magnetic Torpedo Mount/E' ]
			],
			2: [
				map[ 'Messerschmitt Me-155A/SR' ],
				map[ 'Air Radar/E' ],
				map[ 'Aviation Oil Tank/E' ],
				map[ 'Ju-87C Dive Bomber/E' ]
			],
			3: [
				map[ '533mm Quintuple Magnetic Torpedo Mount/SR' ],
				map[ '533mm Quadruple Torpedo Mount/E' ],
				map[ 'Triple 283mm SK C/28 Main Gun Mount/E' ],
				map[ '533mm Quintuple Magnetic Torpedo Mount/E' ]
			],
			4: [
				map[ 'Twin 380mm SK C/34 Main Gun Mount/SR' ],
				map[ 'Steam Catapult/E' ],
				map[ 'Twin 120mm Main Gun Mount/E' ],
				map[ 'Twin 128mm SK C/41 Dual-Purpose Gun Mount/E' ]
			]
		}
	},
	'Iris of Light and Dark'        : {
		A: {
			1: [
				map[ '533mm Quadruple Torpedo Mount/E' ]
			],
			2: [
				map[ 'Single 150mm SK C/28 Main Gun Mount/E' ]
			],
			3: [
				map[ 'Advanced Boiler/E' ],
				map[ 'Quadruple 40mm Bofors AA Gun Mount/E' ],
				map[ 'Fire Suppressor/R' ]
			]
		},
		B: {
			1: [
				map[ 'SG Radar/E' ],
				map[ 'Twin 152mm Main Gun/E' ],
				map[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ]
			],
			2: [
				map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ],
				map[ 'Twin 120mm Main Gun Mount/E' ],
				map[ 'Single 138.6mm Mle 1929 Naval Gun/E' ]
			]
		},
		C: {
			1: [
				map[ 'Twin 113mm AA Gun Mount/SR' ],
				map[ '533mm Quadruple Torpedo Mount/E' ],
				map[ 'Twin 113mm AA Gun Mount/E' ]
			],
			2: [
				map[ 'Quadruple 356mm Main Gun Mount/SR' ],
				map[ 'Single 150mm SK C/28 Main Gun Mount/E' ]
			],
			3: [
				map[ 'Quadruple 40mm Bofors AA Gun Mount/SR' ],
				map[ 'Advanced Boiler/E' ],
				map[ 'Quadruple 40mm Bofors AA Gun Mount/E' ]
			]
		},
		D: {
			1: [
				map[ 'SG Radar/SR' ],
				map[ 'SG Radar/E' ],
				map[ 'Twin 152mm Main Gun/E' ],
				map[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ]
			],
			2: [
				map[ 'Single 138.6mm Mle 1929 Naval Gun/SR' ],
				map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ],
				map[ 'Twin 120mm Main Gun Mount/E' ],
				map[ 'Single 138.6mm Mle 1929 Naval Gun/E' ]
			],
			3: [
				map[ 'Quadruple 380mm Mle 1935 Main Gun Mount/SR' ]
			]
		}
	},
	'Ink-Stained Steel Sakura'      : {
		A: {
			1: [
				map[ '533mm Quadruple Torpedo Mount/E' ],
				map[ '610mm Quadruple Torpedo Mount/E' ]
			],
			2: [
				map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ],
				map[ 'Twin 100mm Type 98 High-Angle Gun/E' ],
				map[ '610mm Quadruple Torpedo Mount/E' ],
				map[ '76mm AA Gun/R' ]
			],
			4: [
				map[ 'Single 127mm Main Gun/E' ],
				map[ '610mm Quadruple Torpedo Mount/E' ]
			]
		},
		B: {
			1: [
				map[ 'Quadruple 40mm Bofors AA Gun Mount/E' ],
				map[ 'Twin 410mm Naval Gun Mount/E' ]
			],
			2: [
				map[ 'Fire Control Radar/E' ]
			]
		},
		C: {
			1: [
				map[ '533mm Quintuple Torpedo Mount/SR' ],
				map[ 'Fuel Filter/E' ],
				map[ '533mm Quadruple Torpedo Mount/E' ],
				map[ '610mm Quadruple Torpedo Mount/E' ]
			],
			2: [
				map[ 'Twin 100mm Type 98 High-Angle Gun/SR' ],
				map[ 'Autoloader/E' ],
				map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ],
				map[ 'Twin 100mm Type 98 High-Angle Gun/E' ],
				map[ '610mm Quadruple Torpedo Mount/E' ]
			],
			3: [
				map[ 'Ship Maintenance Facility/SR' ],
				map[ 'Anti-Torpedo Bulge/E' ]
			],
			4: [
				map[ '610mm Quadruple Torpedo Mount/SR' ],
				map[ 'Single 127mm Main Gun/E' ],
				map[ '610mm Quadruple Torpedo Mount/E' ]
			]
		},
		D: {
			1: [
				map[ 'Triple 406mm Main Gun/SR' ],
				map[ 'Quadruple 40mm Bofors AA Gun Mount/E' ],
				map[ 'Twin 410mm Naval Gun Mount/E' ]
			],
			2: [
				map[ 'Steam Catapult/SR' ],
				map[ 'Fire Control Radar/E' ]
			]
		}
	},
	'Crimson Echoes'                : {
		A: {
			3: [
				map[ 'Fire Control Radar/E' ],
				map[ 'Fuel Filter/E' ],
				map[ 'Twin 410mm Naval Gun Mount/E' ]
			]
		},
		B: {
			1: [
				map[ 'Repair Toolkit/E' ],
				map[ 'Twin 100mm Type 98 High-Angle Gun/E' ],
				map[ '610mm Quadruple Torpedo Mount/E' ]
			],
			2: [
				map[ 'Advanced Boiler/E' ],
				map[ 'Triple 155mm Main Gun Mount/E' ]
			],
			3: [
				map[ 'Autoloader/E' ],
				map[ 'Twin 100mm Type 98 High-Angle Gun/E' ],
				map[ 'Triple 155mm Main Gun Mount/E' ],
				map[ 'Twin 410mm Naval Gun Mount/E' ]
			]
		},
		C: {
			1: [
				map[ 'Twin 100mm Type 98 High-Angle Gun/SR' ]
			],
			2: [
				map[ 'Triple 155mm Main Gun Mount/SR' ],
				map[ 'Triple 152mm Main Gun/E' ]
			],
			3: [
				map[ 'Quadruple 40mm Bofors AA Gun Mount/SR' ],
				map[ 'Fire Control Radar/E' ],
				map[ 'Fuel Filter/E' ],
				map[ 'Twin 410mm Naval Gun Mount/E' ]
			]
		},
		D: {
			1: [
				map[ '610mm Quadruple Torpedo Mount/SR' ],
				map[ 'Repair Toolkit/E' ],
				map[ '610mm Quadruple Torpedo Mount/E' ]
			],
			2: [
				map[ 'Twin 203mm (SK C/34)/SR' ],
				map[ 'Advanced Boiler/E' ]
			],
			3: [
				map[ 'Triple 406mm Main Gun/SR' ],
				map[ 'Twin 100mm Type 98 High-Angle Gun/E' ],
				map[ 'Triple 155mm Main Gun Mount/E' ],
				map[ 'Twin 410mm Naval Gun Mount/E' ]
			]
		}
	},
	'Scherzo of Iron and Blood'     : {
		A: {
			1: [
				map[ 'Single 120mm QF Mark IX Naval Gun/R' ]
			],
			2: [
				map[ 'Aviation Oil Tank/E' ],
				map[ 'Steam Catapult/E' ],
				map[ 'Hydraulic Steering Gear/R' ]
			],
			3: [
				map[ 'Barracuda/E' ],
				map[ 'Seafang/E' ]
			]
		},
		B: {
			1: [
				map[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ]
			],
			2: [
				map[ 'Twin 152mm Main Gun/E' ],
				map[ 'Twin 120mm Main Gun Mount/E' ]
			],
			3: [
				map[ 'Quadruple 40mm Bofors AA Gun Mount/E' ],
				map[ 'Triple 406mm Mk 6 Main Gun Mount/E' ],
				map[ 'Repair Toolkit/E' ],
				map[ 'Anti-Torpedo Bulge/E' ],
				map[ 'Fire Control Radar/E' ]
			]
		},
		C: {
			1: [
				map[ 'Octuple 40mm Pom-Pom Gun Mount/SR' ]
			],
			2: [
				map[ 'F6F Hellcat/SR' ],
				map[ 'Aviation Oil Tank/E' ],
				map[ 'Steam Catapult/E' ]
			],
			3: [
				map[ 'Barracuda/SR' ],
				map[ 'Barracuda/E' ],
				map[ 'Seafang/E' ]
			]
		},
		D: {
			1: [
				map[ 'Twin 380mm SK C/34 Main Gun Mount/SR' ],
				map[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ]
			],
			2: [
				map[ 'Triple 406mm Main Gun/SR' ],
				map[ 'Twin 152mm Main Gun/E' ]
			],
			3: [
				map[ 'Quadruple 40mm Bofors AA Gun Mount/SR' ],
				map[ 'Quadruple 40mm Bofors AA Gun Mount/E' ],
				map[ 'Triple 406mm Mk 6 Main Gun Mount/E' ],
				map[ 'Repair Toolkit/E' ],
				map[ 'Anti-Torpedo Bulge/E' ]
			]
		}
	},
	
	'Strive, Wish, and Strategize': {
		SP: {
			1: [
				map[ 'Tenzan/E' ]
			],
			2: [
				map[ 'Twin 120mm Main Gun Mount/E' ],
				map[ 'Twin 410mm Naval Gun Mount/E' ]
			],
			3: [
				map[ 'Quadruple 356mm Main Gun Mount/SR' ],
				map[ 'Twin 152mm Main Gun/E' ],
				map[ '610mm Quadruple Torpedo Mount/E' ]
			]
		}
	},
	'The Pursuit of Graf Spee'    : {
		SP: {
			1: [
				map[ 'Advanced Boiler/E' ]
			],
			2: [
				map[ 'Octuple 40mm Pom-Pom Gun Mount/SR' ],
				map[ 'Fuel Filter/E' ],
				map[ 'Octuple 40mm Pom-Pom Gun Mount/E' ]
			],
			3: [
				map[ '533mm Quadruple Magnetic Torpedo Mount/SR' ],
				map[ 'Single 150mm SK C/28 Main Gun Mount/E' ],
				map[ 'Triple 283mm SK C/28 Main Gun Mount/E' ],
				map[ '533mm Quadruple Magnetic Torpedo Mount/E' ]
			]
		}
	},
	'Glorious Battle'             : {
		SP: {
			1: [
				map[ 'Twin 203mm (SK C/34)/SR' ],
				map[ '533mm Quadruple Torpedo Mount/E' ],
				map[ 'Twin 120mm Main Gun Mount/E' ],
				map[ 'Single 120mm QF Mark IX Naval Gun/R' ]
			],
			2: [
				map[ 'Barracuda/SR' ]
			
			],
			3: [
				map[ '533mm Quintuple Torpedo Mount/SR' ],
				map[ '533mm Quadruple Torpedo Mount/E' ],
				map[ 'Twin 120mm Main Gun Mount/E' ]
			]
		}
	},
	'Passionate Polaris'          : {
		SP: {
			1: [
				map[ 'Twin 120mm Main Gun Mount/E' ],
				map[ 'Single 127mm Main Gun/E' ]
			],
			2: [
				map[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ]
			],
			3: [
				map[ '533mm Quadruple Magnetic Torpedo Mount/E' ],
				map[ 'Triple 283mm SK C/28 Main Gun Mount/E' ]
			],
			4: [
				map[ 'Improved Depth Charge Projector/E' ],
				map[ 'Advanced Sonar/E' ]
			],
			5: [
				map[ 'Quadruple 380mm Mle 1935 Main Gun Mount/SR' ],
				map[ 'Single 138.6mm Mle 1929 Naval Gun/E' ],
				map[ 'Quadruple 40mm Bofors AA Gun Mount/E' ]
			]
		}
	},
	
	'Craft': {
		'Eagle Union '  : {
			'DD Main Guns'     : [
				map[ 'Single 127mm Main Gun/E' ],
				map[ 'Twin 127mm Secondary Gun Mount/E' ],
				map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/SR' ]
			],
			'CL Main Guns'     : [
				map[ 'Triple 152mm Main Gun/E' ],
				map[ 'Triple 152mm Mk 16 Main Gun Mount/SR' ]
			],
			'CA Main Guns'     : [
				map[ 'Triple 203mm Mk 15 Main Gun Mount/SR' ]
			],
			'BB Main Guns'     : [
				map[ 'Triple 406mm Mk 2 Main Gun Mount/E' ],
				map[ 'Triple 406mm Mk 6 Main Gun Mount/E' ],
				map[ 'Twin 406mm Mk 8 Main Gun Mount/E' ],
				map[ 'Prototype 406mm Mk D Main Gun Mount/SR' ],
				map[ 'Prototype Twin 406mm Mk4 Main Gun Mount/SR' ]
			],
			'Surface Torps'    : [
				map[ '533mm Quintuple Torpedo Mount Mk 17/E' ],
				map[ '533mm Quintuple Torpedo Mount Mk 17/SR' ]
			],
			'Anti-Air Guns'    : [
				map[ 'Quadruple 40mm Bofors AA Gun Mount/SR' ],
				map[ 'Twin 76mm Mk 27 RF AA Gun Mount/SR' ]
			],
			'Fighters'         : [
				map[ 'F4U Corsair/E' ],
				map[ 'F6F Hellcat/SR' ],
				map[ 'F8F Bearcat/SR' ],
				map[ 'F7F Tigercat/SR' ]
			],
			'Torp/Dive Bombers': [
				map[ 'TBM-3 Avenger (ASW)/E' ],
				map[ 'SB2C Helldiver/E' ],
				map[ 'BTD-1 Destroyer/SR' ],
				map[ 'Experimental XSB3C-1/SR' ],
				map[ 'XTB2D-1 Skypirate/SR' ]
			],
			'Sub Torps'        : [
				map[ 'Mark 16 Submarine Torpedo/SR' ],
				map[ 'Mark 28 Submarine Torpedo/SR' ]
			]
		},
		'Royal Navy '   : {
			'DD Main Guns'     : [
				map[ 'Single 120mm QF Mark IX Naval Gun/R' ],
				map[ 'Twin 120mm Main Gun Mount/E' ],
				map[ 'Twin 120mm Mk XI Dual-Purpose Gun Mount/SR' ]
			],
			'CL Main Guns'     : [
				map[ 'Twin 152mm Main Gun/E' ],
				map[ 'Triple 152mm Main Gun2/E' ],
				map[ 'Prototype Triple 152mm Mk XXV Main Gun Mount/SR' ]
			],
			'CA Main Guns'     : [
				map[ 'Prototype Triple 203mm Mk IX Main Gun Mount/SR' ]
			],
			'BB Main Guns'     : [
				map[ 'Triple 406mm Main Gun/SR' ],
				map[ 'Twin 381mm Advanced Main Gun Mount/SR' ],
				map[ 'Quadruple 356mm Main Gun Mount/SR' ],
				map[ 'Prototype Triple 381mm AA Gun/SR' ]
			],
			'Surface Torps'    : [
				map[ '533mm Quadruple Torpedo Mount Mk IX/E' ],
				map[ '533mm Quadruple Torpedo Mount Mk IX/SR' ]
			],
			'Anti-Air Guns'    : [
				map[ 'Twin 40mm Bofors "Hazemeyer" AA Gun Mount/SR' ],
				map[ 'Twin 113mm AA Gun Mount/SR' ],
				map[ 'Twin 134mm AA Gun Mount/SR' ],
				map[ 'Octuple 40mm Pom-Pom Gun Mount/SR' ],
				map[ 'Twin 40mm Bofors STAAG/SR' ]
			],
			'Fighters'         : [
				map[ 'Sea Fury/SR' ],
				map[ 'Seafang/SR' ],
				map[ 'Seafire FR.47/SR' ],
				map[ 'Sea Hornet/SR' ]
			],
			'Torp/Dive Bombers': [
				map[ 'Albacore/E' ],
				map[ 'Blackburn Firebrand/SR' ],
				map[ 'Firefly/SR' ],
				map[ 'Barracuda/SR' ],
				map[ 'Firecrest/SR' ],
				map[ 'Wyvern/UR' ]
			],
			'Sub Torps'        : [
				map[ 'Mark 12 "Ferry" Submarine Torpedo/SR' ],
				map[ 'Mark 20 "Bidder" Submarine Torpedo/SR' ]
			]
		},
		'Sakura Empire ': {
			'DD Main Guns'     : [
				map[ 'Twin 100mm Type 98 High-Angle Gun/SR' ]
			],
			'CL Main Guns'     : [
				map[ 'Triple 155mm Main Gun Mount/SR' ],
				map[ 'Prototype Triple 155mm Kai Naval Gun Mount/SR' ]
			],
			'CA Main Guns'     : [
				map[ 'Prototype 203mm No. 3 Naval Gun Mount/SR' ]
			],
			'BB Main Guns'     : [
				map[ 'Twin 410mm Naval Gun Mount/E' ],
				map[ 'Twin 410mm Kai Naval Gun Mount/E' ],
				map[ 'Prototype Triple 410mm Main Gun Mount/SR' ],
				map[ 'Twin 410mm (Type 3 Shell) Naval Gun Mount/SR' ]
			],
			'Surface Torps'    : [
				map[ '610mm Quadruple Torpedo Mount/SR' ],
				map[ '610mm Quadruple Torpedo Mount Kai/SR' ]
			],
			'Anti-Air Guns'    : [
				map[ 'Triple 25mm Type 96 AT/AA Gun Mount/SR' ],
				map[ 'Twin 127mm Type 89 AA Gun Mount/SR' ]
			],
			'Fighters'         : [
				map[ 'Type 2 Seaplane Fighter/E' ],
				map[ 'N1K1 Kyoufuu/E' ],
				map[ 'Kawanishi N1K3-A Shiden Kai 2/SR' ],
				map[ 'Type 0 Fighter Model 52/SR' ],
				map[ 'A7M Reppuu/SR' ]
			],
			'Torp/Dive Bombers': [
				map[ 'Aichi E16A Zuiun/E' ],
				map[ 'Tenzan/E' ],
				map[ 'Seiran/E' ],
				map[ 'Tenzan Kai/E' ],
				map[ 'Suisei/SR' ],
				map[ 'Suisei Model 21/SR' ],
				map[ 'Aichi B7A Ryusei/SR' ],
				map[ 'Suisei Model 12A/SR' ]
			],
			'Sub Torps'        : [
				map[ 'Type 95 Submarine Torpedo/SR' ],
				map[ 'Type 96 Submarine Torpedo/SR' ],
				map[ 'Type 95 Kai Pure Oxygen Submarine Torpedo/UR' ]
			]
		},
		'Ironblood '    : {
			'DD Main Guns'     : [
				map[ 'Twin 128mm SK C/41 Dual-Purpose Gun Mount/E' ],
				map[ 'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount/SR' ]
			],
			'CL Main Guns'     : [
				map[ 'Single 150mm SK C/28 Main Gun Mount/E' ],
				map[ 'Twin 150mm SK C/28 Secondary Gun Mount/E' ],
				map[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ],
				map[ 'Prototype Twin 150mm SK C/28 Main Gun Mount/SR' ]
			],
			'CA Main Guns'     : [
				map[ 'Prototype Triple 203mm SK C/34 Main Gun Mount/SR' ]
			],
			'BB Main Guns'     : [
				map[ 'Twin 380mm SK C/34 Main Gun Mount/SR' ]
			],
			'Surface Torps'    : [
				map[ '533mm Quadruple Torpedo Mount/E' ],
				map[ '533mm Quadruple Magnetic Torpedo Mount/SR' ],
				map[ '533mm Quintuple Magnetic Torpedo Mount/UR' ]
			],
			'Anti-Air Guns'    : [
				map[ 'Twin 105mm SK C/33 AA Gun Mount/SR' ],
				map[ 'Twin 105mm SK C/33 na AA Gun Mount/SR' ]
			],
			'Fighters'         : [
				map[ 'Messerschmitt Me-155A/SR' ]
			],
			'Torp/Dive Bombers': [
				map[ 'Ju-87C Dive Bomber/E' ],
				map[ 'Ju-87 D-4/SR' ]
			],
			'Sub Torps'        : [
				map[ 'G7e Acoustic Homing Submarine Torpedo/SR' ]
			]
		}
	}
};
