import concealmentImage from '../../../public/images/other/concealment.png';
import determinationImage from '../../../public/images/other/determination.png';
import equilibriumImage from '../../../public/images/other/equilibrium.png';
import explorationImage from '../../../public/images/other/exploration.png';
import harmonyImage from '../../../public/images/other/harmony.png';
import { equipMap } from '../fleet/ship/equip/data';

export const opSiWeakness: [ StaticImageData, string, string ][] = [
	[ determinationImage, 'Determination', 'Airstrikes' ],
	[ explorationImage, 'Exploration', 'Airstrikes' ],
	[ concealmentImage, 'Concealment', 'Shelling' ],
	[ equilibriumImage, 'Equilibrium', 'Shelling' ],
	[ harmonyImage, 'Harmony', 'Torpedoes' ]
];

export const stageDrops = {
	'Chapter': {
		'1-' : {
			4: [
				equipMap[ 'Single 120mm QF Mark IX Naval Gun/R' ]
			]
		},
		'2-' : {
			1: [
				equipMap[ 'Hydraulic Steering Gear/R' ]
			],
			2: [
				equipMap[ 'Naval Camouflage/R' ]
			],
			3: [
				equipMap[ 'Air Radar/E' ],
				equipMap[ 'Fire Suppressor/R' ]
			],
			4: [
				equipMap[ 'Single 150mm SK C/28 Main Gun Mount/E' ],
				equipMap[ 'Air Radar/E' ]
			]
		},
		'3-' : {
			1: [
				equipMap[ 'Fuel Filter/E' ]
			],
			2: [
				equipMap[ 'Steam Catapult/E' ],
				equipMap[ 'Single 127mm Main Gun/E' ],
				equipMap[ 'SB2C Helldiver/E' ]
			],
			3: [
				equipMap[ '76mm AA Gun/R' ]
			],
			4: [
				equipMap[ 'Repair Toolkit/E' ],
				equipMap[ 'F4U Corsair/E' ]
			]
		},
		'4-' : {
			1: [
				equipMap[ 'Anti-Torpedo Bulge/E' ]
			],
			2: [
				equipMap[ 'Triple 152mm Main Gun/E' ],
				equipMap[ 'Twin 120mm Main Gun Mount/E' ],
				equipMap[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ]
			],
			3: [
				equipMap[ 'Fire Control Radar/E' ],
				equipMap[ 'Twin 152mm Main Gun/E' ],
				equipMap[ 'Twin 203mm (SK C/34)/E' ]
			],
			4: [
				equipMap[ '610mm Quadruple Torpedo Mount/E' ],
				equipMap[ 'Twin 203mm (SK C/34)/E' ]
			]
		},
		'5-' : {
			1: [
				equipMap[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/SR' ],
				equipMap[ 'Advanced Boiler/E' ],
				equipMap[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ]
			],
			2: [
				equipMap[ 'F6F Hellcat/SR' ],
				equipMap[ '533mm Quadruple Torpedo Mount/E' ],
				equipMap[ 'F6F Hellcat/E' ]
			],
			3: [
				equipMap[ 'BTD-1 Destroyer/SR' ],
				equipMap[ 'Aviation Oil Tank/E' ]
			],
			4: [
				equipMap[ 'Quadruple 40mm Bofors AA Gun Mount/SR' ],
				equipMap[ 'Quadruple 40mm Bofors AA Gun Mount/E' ],
				equipMap[ 'Octuple 40mm Pom-Pom Gun Mount/E' ]
			]
		},
		'6-' : {
			1: [
				equipMap[ 'SG Radar/SR' ],
				equipMap[ 'SG Radar/E' ],
				equipMap[ 'Twin 100mm Type 98 High-Angle Gun/E' ]
			],
			2: [
				equipMap[ 'Triple 155mm Main Gun Mount/SR' ],
				equipMap[ 'Gyroscope/E' ],
				equipMap[ 'Triple 406mm Mk 6 Main Gun Mount/E' ],
				equipMap[ 'Triple 155mm Main Gun Mount/E' ]
			],
			3: [
				equipMap[ 'Triple 406mm Main Gun/SR' ],
				equipMap[ 'Autoloader/E' ],
				equipMap[ 'Triple 406mm Mk 6 Main Gun Mount/E' ],
				equipMap[ 'Twin 410mm Naval Gun Mount/E' ]
			],
			4: [
				equipMap[ '610mm Quadruple Torpedo Mount/SR' ],
				equipMap[ '533mm Quintuple Torpedo Mount/E' ],
				equipMap[ '610mm Quadruple Torpedo Mount/E' ]
			]
		},
		'7-' : {
			1: [
				equipMap[ 'Octuple 40mm Pom-Pom Gun Mount/SR' ]
			],
			2: [
				equipMap[ 'Twin 113mm AA Gun Mount/SR' ],
				equipMap[ 'Steam Catapult/E' ],
				equipMap[ 'Barracuda/E' ],
				equipMap[ 'Triple 155mm Main Gun Mount/E' ]
			],
			3: [
				equipMap[ 'Twin 203mm (SK C/34)/SR' ],
				equipMap[ 'Twin 100mm Type 98 High-Angle Gun/E' ],
				equipMap[ 'Twin 410mm Naval Gun Mount/E' ]
			],
			4: [
				equipMap[ '533mm Quintuple Torpedo Mount/SR' ],
				equipMap[ 'Anti-Torpedo Bulge/E' ],
				equipMap[ 'SG Radar/E' ],
				equipMap[ 'Seafang/E' ]
			]
		},
		'8-' : {
			1: [
				equipMap[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/SR' ],
				equipMap[ 'Twin 120mm Main Gun Mount/E' ],
				equipMap[ 'Single 150mm SK C/28 Main Gun Mount/E' ]
			],
			2: [
				equipMap[ '610mm Quadruple Torpedo Mount/SR' ],
				equipMap[ 'Twin 100mm Type 98 High-Angle Gun/E' ]
			],
			3: [
				equipMap[ 'Triple 155mm Main Gun Mount/SR' ]
			],
			4: [
				equipMap[ 'Twin 203mm (SK C/34)/SR' ],
				equipMap[ 'Twin 203mm (SK C/34)/E' ]
			]
		},
		'9-' : {
			1: [
				equipMap[ 'Twin 105mm SK C/33 AA Gun Mount/SR' ],
				equipMap[ 'Advanced Boiler/E' ],
				equipMap[ 'Octuple 40mm Pom-Pom Gun Mount/E' ]
			],
			2: [
				equipMap[ 'Ship Maintenance Facility/SR' ],
				equipMap[ 'Fuel Filter/E' ]
			],
			3: [
				equipMap[ 'Type 0 Fighter Model 52/SR' ],
				equipMap[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ]
			],
			4: [
				equipMap[ 'Twin 100mm Type 98 High-Angle Gun/SR' ],
				equipMap[ 'Triple 152mm Main Gun/E' ]
			]
		},
		'10-': {
			1: [
				equipMap[ 'Twin 105mm SK C/33 AA Gun Mount/SR' ],
				equipMap[ 'Autoloader/E' ],
				equipMap[ 'Single 127mm Main Gun/E' ],
				equipMap[ 'Twin 152mm Main Gun/E' ]
			],
			2: [
				equipMap[ 'SG Radar/SR' ],
				equipMap[ 'Anti-Torpedo Bulge/E' ],
				equipMap[ 'Gyroscope/E' ],
				equipMap[ 'Triple 152mm Main Gun/E' ]
			],
			3: [
				equipMap[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/SR' ],
				equipMap[ 'Fire Control Radar/E' ],
				equipMap[ 'Repair Toolkit/E' ],
				equipMap[ 'Triple 152mm Main Gun/E' ]
			],
			4: [
				equipMap[ '610mm Quadruple Torpedo Mount/SR' ],
				equipMap[ 'Fuel Filter/E' ],
				equipMap[ '610mm Quadruple Torpedo Mount/E' ]
			]
		},
		'11-': {
			1: [
				equipMap[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/SR' ],
				equipMap[ 'Steam Catapult/E' ],
				equipMap[ 'Single 127mm Main Gun/E' ],
				equipMap[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ]
			],
			2: [
				equipMap[ '610mm Quadruple Torpedo Mount/SR' ],
				equipMap[ 'SG Radar/E' ],
				equipMap[ 'F4U Corsair/E' ],
				equipMap[ '610mm Quadruple Torpedo Mount/E' ],
				equipMap[ 'Single 150mm SK C/28 Main Gun Mount/E' ]
			],
			3: [
				equipMap[ 'Quadruple 40mm Bofors AA Gun Mount/SR' ],
				equipMap[ 'Autoloader/E' ],
				equipMap[ 'F6F Hellcat/E' ]
			],
			4: [
				equipMap[ 'Twin 113mm AA Gun Mount/SR' ],
				equipMap[ 'Triple 152mm Main Gun/E' ],
				equipMap[ 'SB2C Helldiver/E' ],
				equipMap[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ]
			]
		},
		'12-': {
			1: [
				equipMap[ 'Type 0 Fighter Model 52/SR' ]
			],
			2: [
				equipMap[ '610mm Quadruple Torpedo Mount/SR' ],
				equipMap[ '610mm Quadruple Torpedo Mount/E' ]
			],
			3: [
				equipMap[ 'Suisei/SR' ],
				equipMap[ 'Triple 155mm Main Gun Mount/E' ]
			],
			4: [
				equipMap[ 'Twin 100mm Type 98 High-Angle Gun/SR' ],
				equipMap[ 'Twin 100mm Type 98 High-Angle Gun/E' ],
				equipMap[ 'Twin 410mm Naval Gun Mount/E' ]
			]
		},
		'13-': {
			1: [
				equipMap[ 'Triple 155mm Main Gun Mount/SR' ],
				equipMap[ 'Triple 152mm Main Gun/E' ],
				equipMap[ 'Triple 155mm Main Gun Mount/E' ]
			],
			2: [
				equipMap[ 'Type 0 Fighter Model 52/SR' ]
			],
			3: [
				equipMap[ 'F6F Hellcat/SR' ],
				equipMap[ 'F4U Corsair/E' ],
				equipMap[ 'F6F Hellcat/E' ]
			],
			4: [
				equipMap[ 'Mark 16 Submarine Torpedo/SR' ],
				equipMap[ 'Twin 100mm Type 98 High-Angle Gun/E' ],
				equipMap[ 'Mark 16 Submarine Torpedo/E' ]
			]
		},
		'14-': {
			1: [
				equipMap[ 'Quadruple 40mm Bofors AA Gun Mount/SR' ],
				equipMap[ 'Fire Control Radar/E' ],
				equipMap[ 'Repair Toolkit/E' ],
				equipMap[ 'Twin 410mm Naval Gun Mount/E' ]
			],
			2: [
				equipMap[ 'Octuple 40mm Pom-Pom Gun Mount/SR' ],
				equipMap[ 'SG Radar/E' ],
				equipMap[ 'Anti-Torpedo Bulge/E' ]
			],
			3: [
				equipMap[ 'Twin 100mm Type 98 High-Angle Gun/SR' ],
				equipMap[ 'Autoloader/E' ],
				equipMap[ 'Advanced Boiler/E' ],
				equipMap[ '610mm Quadruple Torpedo Mount/E' ],
				equipMap[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ]
			],
			4: [
				equipMap[ 'SG Radar/SR' ],
				equipMap[ 'Gyroscope/E' ],
				equipMap[ 'Fuel Filter/E' ],
				equipMap[ 'Triple 155mm Main Gun Mount/E' ]
			]
		}
	},
	
	'Craft': {
		'Eagle Union '  : {
			'DD Main Guns'     : [
				equipMap[ 'Single 127mm Main Gun/E' ],
				equipMap[ 'Twin 127mm Secondary Gun Mount/E' ],
				equipMap[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/SR' ]
			],
			'CL Main Guns'     : [
				equipMap[ 'Triple 152mm Main Gun/E' ],
				equipMap[ 'Triple 152mm Mk 16 Main Gun Mount/SR' ]
			],
			'CA Main Guns'     : [
				equipMap[ 'Triple 203mm Mk 15 Main Gun Mount/SR' ]
			],
			'BB Main Guns'     : [
				equipMap[ 'Triple 406mm Mk 2 Main Gun Mount/E' ],
				equipMap[ 'Triple 406mm Mk 6 Main Gun Mount/E' ],
				equipMap[ 'Twin 406mm Mk 8 Main Gun Mount/E' ],
				equipMap[ 'Prototype 406mm Mk D Main Gun Mount/SR' ],
				equipMap[ 'Prototype Twin 406mm Mk4 Main Gun Mount/SR' ]
			],
			'Surface Torps'    : [
				equipMap[ '533mm Quadruple Torpedo Mount Mk 17/E' ],
				equipMap[ '533mm Quintuple Torpedo Mount Mk 17/SR' ]
			],
			'Anti-Air Guns'    : [
				equipMap[ 'Quadruple 40mm Bofors AA Gun Mount/SR' ],
				equipMap[ 'Twin 76mm Mk 27 RF AA Gun Mount/SR' ]
			],
			'Fighters'         : [
				equipMap[ 'F4U Corsair/E' ],
				equipMap[ 'F6F Hellcat/SR' ],
				equipMap[ 'F8F Bearcat/SR' ],
				equipMap[ 'F7F Tigercat/SR' ]
			],
			'Torp/Dive Bombers': [
				equipMap[ 'TBM-3 Avenger (ASW)/E' ],
				equipMap[ 'SB2C Helldiver/E' ],
				equipMap[ 'BTD-1 Destroyer/SR' ],
				equipMap[ 'Experimental XSB3C-1/SR' ],
				equipMap[ 'XTB2D-1 Skypirate/SR' ]
			],
			'Sub Torps'        : [
				equipMap[ 'Mark 16 Submarine Torpedo/SR' ],
				equipMap[ 'Mark 28 Submarine Torpedo/SR' ]
			]
		},
		'Royal Navy '   : {
			'DD Main Guns'     : [
				equipMap[ 'Single 120mm QF Mark IX Naval Gun/R' ],
				equipMap[ 'Twin 120mm Main Gun Mount/E' ],
				equipMap[ 'Twin 120mm Mk XI Dual-Purpose Gun Mount/SR' ]
			],
			'CL Main Guns'     : [
				equipMap[ 'Twin 152mm Main Gun/E' ],
				equipMap[ 'Triple 152mm Main Gun2/E' ],
				equipMap[ 'Prototype Triple 152mm Mk XXV Main Gun Mount/SR' ]
			],
			'CA Main Guns'     : [
				equipMap[ 'Prototype Triple 203mm Mk IX Main Gun Mount/SR' ]
			],
			'BB Main Guns'     : [
				equipMap[ 'Triple 406mm Main Gun/SR' ],
				equipMap[ 'Twin 381mm Advanced Main Gun Mount/SR' ],
				equipMap[ 'Quadruple 356mm Main Gun Mount/SR' ],
				equipMap[ 'Prototype Triple 381mm AA Gun/SR' ]
			],
			'Surface Torps'    : [
				equipMap[ '533mm Quadruple Torpedo Mount Mk IX/E' ],
				equipMap[ '533mm Quintuple Torpedo Mount Mk IX/SR' ]
			],
			'Anti-Air Guns'    : [
				equipMap[ 'Twin 40mm Bofors "Hazemeyer" AA Gun Mount/SR' ],
				equipMap[ 'Twin 113mm AA Gun Mount/SR' ],
				equipMap[ 'Twin 134mm AA Gun Mount/SR' ],
				equipMap[ 'Octuple 40mm Pom-Pom Gun Mount/SR' ],
				equipMap[ 'Twin 40mm Bofors STAAG/SR' ]
			],
			'Fighters'         : [
				equipMap[ 'Sea Fury/SR' ],
				equipMap[ 'Seafang/SR' ],
				equipMap[ 'Seafire FR.47/SR' ],
				equipMap[ 'Sea Hornet/SR' ]
			],
			'Torp/Dive Bombers': [
				equipMap[ 'Albacore/E' ],
				equipMap[ 'Blackburn Firebrand/SR' ],
				equipMap[ 'Firefly/SR' ],
				equipMap[ 'Barracuda/SR' ],
				equipMap[ 'Firecrest/SR' ],
				equipMap[ 'Wyvern/UR' ]
			],
			'Sub Torps'        : [
				equipMap[ 'Mark 12 "Ferry" Submarine Torpedo/SR' ],
				equipMap[ 'Mark 20 "Bidder" Submarine Torpedo/SR' ]
			]
		},
		'Sakura Empire ': {
			'DD Main Guns'     : [
				equipMap[ 'Twin 100mm Type 98 High-Angle Gun/SR' ]
			],
			'CL Main Guns'     : [
				equipMap[ 'Triple 155mm Main Gun Mount/SR' ],
				equipMap[ 'Prototype Triple 155mm Kai Naval Gun Mount/SR' ]
			],
			'CA Main Guns'     : [
				equipMap[ 'Prototype 203mm No. 3 Naval Gun Mount/SR' ]
			],
			'BB Main Guns'     : [
				equipMap[ 'Twin 410mm Naval Gun Mount/E' ],
				equipMap[ 'Twin 410mm Kai Naval Gun Mount/E' ],
				equipMap[ 'Prototype Triple 410mm Main Gun Mount/SR' ],
				equipMap[ 'Twin 410mm (Type 3 Shell) Naval Gun Mount/SR' ]
			],
			'Surface Torps'    : [
				equipMap[ '610mm Quadruple Torpedo Mount/SR' ],
				equipMap[ '610mm Quadruple Torpedo Mount Kai/SR' ]
			],
			'Anti-Air Guns'    : [
				equipMap[ 'Triple 25mm Type 96 AT/AA Gun Mount/SR' ],
				equipMap[ 'Twin 127mm Type 89 AA Gun Mount/SR' ]
			],
			'Fighters'         : [
				equipMap[ 'Type 2 Seaplane Fighter/E' ],
				equipMap[ 'N1K1 Kyoufuu/E' ],
				equipMap[ 'Kawanishi N1K3-A Shiden Kai 2/SR' ],
				equipMap[ 'Type 0 Fighter Model 52/SR' ],
				equipMap[ 'A7M Reppuu/SR' ]
			],
			'Torp/Dive Bombers': [
				equipMap[ 'Aichi E16A Zuiun/E' ],
				equipMap[ 'Tenzan/E' ],
				equipMap[ 'Seiran/E' ],
				equipMap[ 'Tenzan Kai/E' ],
				equipMap[ 'Suisei/SR' ],
				equipMap[ 'Suisei Model 21/SR' ],
				equipMap[ 'Aichi B7A Ryusei/SR' ],
				equipMap[ 'Suisei Model 12A/SR' ]
			],
			'Sub Torps'        : [
				equipMap[ 'Type 95 Submarine Torpedo/SR' ],
				equipMap[ 'Type 96 Submarine Torpedo/SR' ],
				equipMap[ 'Type 95 Kai Pure Oxygen Submarine Torpedo/UR' ]
			]
		},
		'Ironblood '    : {
			'DD Main Guns'     : [
				equipMap[ 'Twin 128mm SK C/41 Dual-Purpose Gun Mount/E' ],
				equipMap[ 'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount/SR' ]
			],
			'CL Main Guns'     : [
				equipMap[ 'Single 150mm SK C/28 Main Gun Mount/E' ],
				equipMap[ 'Twin 150mm SK C/28 Secondary Gun Mount/E' ],
				equipMap[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ],
				equipMap[ 'Prototype Twin 150mm SK C/28 Main Gun Mount/SR' ]
			],
			'CA Main Guns'     : [
				equipMap[ 'Prototype Triple 203mm SK C/34 Main Gun Mount/SR' ]
			],
			'BB Main Guns'     : [
				equipMap[ 'Twin 380mm SK C/34 Main Gun Mount/SR' ]
			],
			'Surface Torps'    : [
				equipMap[ '533mm Quadruple Torpedo Mount/E' ],
				equipMap[ '533mm Quadruple Magnetic Torpedo Mount/SR' ],
				equipMap[ '533mm Quintuple Magnetic Torpedo Mount/UR' ]
			],
			'Anti-Air Guns'    : [
				equipMap[ 'Twin 105mm SK C/33 AA Gun Mount/SR' ],
				equipMap[ 'Twin 105mm SK C/33 na AA Gun Mount/SR' ]
			],
			'Fighters'         : [
				equipMap[ 'Messerschmitt Me-155A/SR' ]
			],
			'Torp/Dive Bombers': [
				equipMap[ 'Ju-87C Dive Bomber/E' ],
				equipMap[ 'Ju-87 D-4/SR' ]
			],
			'Sub Torps'        : [
				equipMap[ 'G7e Acoustic Homing Submarine Torpedo/SR' ]
			]
		}
	},
	
	'Visitors Dyed In Red'          : {
		A: {
			1: [
				equipMap[ '533mm Quintuple Torpedo Mount/E' ]
			],
			2: [
				equipMap[ 'Advanced Boiler/E' ]
			],
			3: [
				equipMap[ 'Triple 155mm Main Gun Mount/E' ],
				equipMap[ 'Twin 410mm Naval Gun Mount/E' ]
			]
		},
		B: {
			1: [
				equipMap[ '610mm Quadruple Torpedo Mount/SR' ],
				equipMap[ '610mm Quadruple Torpedo Mount/E' ]
			],
			2: [
				equipMap[ 'Triple 155mm Main Gun Mount/SR' ]
			],
			3: [
				equipMap[ 'Suisei/SR' ]
			]
		},
		C: {
			1: [
				equipMap[ '533mm Quintuple Torpedo Mount/SR' ],
				equipMap[ '533mm Quintuple Torpedo Mount/E' ]
			],
			2: [
				equipMap[ 'Ship Maintenance Facility/SR' ],
				equipMap[ 'Advanced Boiler/E' ]
			],
			3: [
				equipMap[ 'Type 0 Fighter Model 52/SR' ],
				equipMap[ 'Triple 155mm Main Gun Mount/E' ],
				equipMap[ 'Twin 410mm Naval Gun Mount/E' ],
				equipMap[ 'Aichi E16A Zuiun/E' ]
			]
		},
		D: {
			1: [
				equipMap[ 'Twin 100mm Type 98 High-Angle Gun/SR' ],
				equipMap[ '610mm Quadruple Torpedo Mount/SR' ],
				equipMap[ '610mm Quadruple Torpedo Mount/E' ]
			],
			2: [
				equipMap[ 'A7M Reppuu/SR' ],
				equipMap[ 'Triple 155mm Main Gun Mount/SR' ],
				equipMap[ 'Tenzan/E' ],
				equipMap[ 'A7M Reppuu/E' ]
			],
			3: [
				equipMap[ 'Aichi B7A Ryusei/SR' ],
				equipMap[ 'Suisei/SR' ],
				equipMap[ 'Aichi B7A Ryusei/E' ]
			]
		}
	},
	'Frigid Winter\'s Crown'        : {
		A: {
			1: [
				equipMap[ 'Twin 152mm Main Gun/E' ],
				equipMap[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ]
			],
			2: [
				equipMap[ 'Fuel Filter/E' ],
				equipMap[ 'Gyroscope/E' ],
				equipMap[ 'Twin 203mm (SK C/34)/E' ]
			],
			3: [
				equipMap[ 'Fire Control Radar/E' ],
				equipMap[ 'Octuple 40mm Pom-Pom Gun Mount/E' ]
			]
		},
		B: {
			1: [
				equipMap[ 'Autoloader/E' ]
			],
			2: [
				equipMap[ 'Aviation Oil Tank/E' ],
				equipMap[ 'Barracuda/E' ]
			],
			3: [
				equipMap[ 'Advanced Boiler/E' ],
				equipMap[ 'Triple 406mm Mk 6 Main Gun Mount/E' ]
			]
		},
		C: {
			1: [
				equipMap[ '610mm Quadruple Torpedo Mount/SR' ],
				equipMap[ 'Triple 152mm Main Gun/E' ],
				equipMap[ 'Twin 152mm Main Gun/E' ],
				equipMap[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ]
			],
			2: [
				equipMap[ 'Twin 203mm (SK C/34)/SR' ],
				equipMap[ 'Fuel Filter/E' ],
				equipMap[ 'Gyroscope/E' ],
				equipMap[ 'Twin 203mm (SK C/34)/E' ]
			],
			3: [
				equipMap[ 'Octuple 40mm Pom-Pom Gun Mount/SR' ],
				equipMap[ 'Fire Control Radar/E' ],
				equipMap[ 'Octuple 40mm Pom-Pom Gun Mount/E' ]
			]
		},
		D: {
			1: [
				equipMap[ 'Triple 406mm Main Gun/SR' ],
				equipMap[ 'Autoloader/E' ]
			],
			2: [
				equipMap[ 'Seafang/SR' ],
				equipMap[ 'Barracuda/E' ]
			],
			3: [
				equipMap[ 'Twin 380mm SK C/34 Main Gun Mount/SR' ],
				equipMap[ 'Twin 105mm SK C/33 AA Gun Mount/SR' ],
				equipMap[ 'Triple 406mm Mk 6 Main Gun Mount/E' ]
			]
		}
	},
	'Fallen Wings'                  : {
		A: {
			1: [
				equipMap[ '533mm Quadruple Torpedo Mount/E' ],
				equipMap[ 'Single 127mm Main Gun/E' ],
				equipMap[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ]
			],
			2: [
				equipMap[ 'Air Radar/E' ],
				equipMap[ 'SG Radar/E' ],
				equipMap[ 'Triple 152mm Main Gun/E' ]
			],
			3: [
				equipMap[ 'Fuel Filter/E' ],
				equipMap[ 'Gyroscope/E' ]
			]
		},
		B: {
			1: [
				equipMap[ 'Fire Control Radar/E' ],
				equipMap[ 'Autoloader/E' ],
				equipMap[ 'Quadruple 40mm Bofors AA Gun Mount/E' ]
			],
			2: [
				equipMap[ 'Repair Toolkit/E' ],
				equipMap[ 'F4U Corsair/E' ]
			],
			3: [
				equipMap[ 'Steam Catapult/E' ],
				equipMap[ 'Triple 406mm Mk 6 Main Gun Mount/E' ],
				equipMap[ 'F6F Hellcat/E' ],
				equipMap[ 'SB2C Helldiver/E' ]
			]
		},
		C: {
			1: [
				equipMap[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/SR' ],
				equipMap[ 'Advanced Boiler/E' ],
				equipMap[ '533mm Quadruple Torpedo Mount/E' ],
				equipMap[ 'Single 127mm Main Gun/E' ],
				equipMap[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ]
			],
			2: [
				equipMap[ 'SG Radar/SR' ],
				equipMap[ 'Air Radar/E' ],
				equipMap[ 'SG Radar/E' ],
				equipMap[ 'Triple 152mm Main Gun/E' ]
			],
			3: [
				equipMap[ '533mm Quintuple Torpedo Mount/SR' ],
				equipMap[ 'Fuel Filter/E' ],
				equipMap[ 'Gyroscope/E' ]
			]
		},
		D: {
			1: [
				equipMap[ 'Quadruple 40mm Bofors AA Gun Mount/SR' ],
				equipMap[ 'Fire Control Radar/E' ],
				equipMap[ 'Autoloader/E' ],
				equipMap[ 'Quadruple 40mm Bofors AA Gun Mount/E' ]
			],
			2: [
				equipMap[ 'BTD-1 Destroyer/SR' ],
				equipMap[ 'F4U Corsair/E' ]
			],
			3: [
				equipMap[ 'Steam Catapult/SR' ],
				equipMap[ 'F6F Hellcat/SR' ],
				equipMap[ 'Triple 406mm Mk 6 Main Gun Mount/E' ],
				equipMap[ 'F6F Hellcat/E' ]
			]
		}
	},
	'Operation Divergent Chessboard': {
		A: {
			1: [
				equipMap[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ],
				equipMap[ 'Twin 128mm SK C/41 Dual-Purpose Gun Mount/E' ]
			],
			3: [
				equipMap[ '533mm Quadruple Torpedo Mount/E' ],
				equipMap[ '610mm Quadruple Torpedo Mount/E' ]
			],
			4: [
				equipMap[ 'Triple 283mm SK C/28 Main Gun Mount/E' ],
				equipMap[ 'Ju-87C Dive Bomber/E' ]
			]
		},
		B: {
			1: [
				equipMap[ '533mm Quadruple Torpedo Mount/E' ],
				equipMap[ '610mm Quadruple Torpedo Mount/E' ],
				equipMap[ '533mm Quadruple Magnetic Torpedo Mount/E' ]
			],
			2: [
				equipMap[ 'Air Radar/E' ],
				equipMap[ 'Aviation Oil Tank/E' ],
				equipMap[ 'Ju-87C Dive Bomber/E' ]
			],
			3: [
				equipMap[ '533mm Quadruple Torpedo Mount/E' ],
				equipMap[ 'Triple 283mm SK C/28 Main Gun Mount/E' ],
				equipMap[ '533mm Quintuple Magnetic Torpedo Mount/E' ]
			],
			4: [
				equipMap[ 'Steam Catapult/E' ],
				equipMap[ 'Twin 120mm Main Gun Mount/E' ],
				equipMap[ 'Twin 128mm SK C/41 Dual-Purpose Gun Mount/E' ]
			]
		},
		C: {
			1: [
				equipMap[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ],
				equipMap[ 'Twin 128mm SK C/41 Dual-Purpose Gun Mount/E' ]
			],
			3: [
				equipMap[ '533mm Quadruple Torpedo Mount/E' ],
				equipMap[ '610mm Quadruple Torpedo Mount/E' ]
			],
			4: [
				equipMap[ 'Triple 283mm SK C/28 Main Gun Mount/E' ],
				equipMap[ 'Ju-87C Dive Bomber/E' ]
			]
		},
		D: {
			1: [
				equipMap[ '533mm Quadruple Magnetic Torpedo Mount/SR' ],
				equipMap[ '533mm Quadruple Torpedo Mount/E' ],
				equipMap[ '610mm Quadruple Torpedo Mount/E' ],
				equipMap[ '533mm Quadruple Magnetic Torpedo Mount/E' ]
			],
			2: [
				equipMap[ 'Messerschmitt Me-155A/SR' ],
				equipMap[ 'Air Radar/E' ],
				equipMap[ 'Aviation Oil Tank/E' ],
				equipMap[ 'Ju-87C Dive Bomber/E' ]
			],
			3: [
				equipMap[ '533mm Quintuple Magnetic Torpedo Mount/SR' ],
				equipMap[ '533mm Quadruple Torpedo Mount/E' ],
				equipMap[ 'Triple 283mm SK C/28 Main Gun Mount/E' ],
				equipMap[ '533mm Quintuple Magnetic Torpedo Mount/E' ]
			],
			4: [
				equipMap[ 'Twin 380mm SK C/34 Main Gun Mount/SR' ],
				equipMap[ 'Steam Catapult/E' ],
				equipMap[ 'Twin 120mm Main Gun Mount/E' ],
				equipMap[ 'Twin 128mm SK C/41 Dual-Purpose Gun Mount/E' ]
			]
		}
	},
	'Iris of Light and Dark'        : {
		A: {
			1: [
				equipMap[ '533mm Quadruple Torpedo Mount/E' ]
			],
			2: [
				equipMap[ 'Single 150mm SK C/28 Main Gun Mount/E' ]
			],
			3: [
				equipMap[ 'Advanced Boiler/E' ],
				equipMap[ 'Quadruple 40mm Bofors AA Gun Mount/E' ],
				equipMap[ 'Fire Suppressor/R' ]
			]
		},
		B: {
			1: [
				equipMap[ 'SG Radar/E' ],
				equipMap[ 'Twin 152mm Main Gun/E' ],
				equipMap[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ]
			],
			2: [
				equipMap[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ],
				equipMap[ 'Twin 120mm Main Gun Mount/E' ],
				equipMap[ 'Single 138.6mm Mle 1929 Naval Gun/E' ]
			]
		},
		C: {
			1: [
				equipMap[ 'Twin 113mm AA Gun Mount/SR' ],
				equipMap[ '533mm Quadruple Torpedo Mount/E' ]
			],
			2: [
				equipMap[ 'Quadruple 356mm Main Gun Mount/SR' ],
				equipMap[ 'Single 150mm SK C/28 Main Gun Mount/E' ]
			],
			3: [
				equipMap[ 'Quadruple 40mm Bofors AA Gun Mount/SR' ],
				equipMap[ 'Advanced Boiler/E' ],
				equipMap[ 'Quadruple 40mm Bofors AA Gun Mount/E' ]
			]
		},
		D: {
			1: [
				equipMap[ 'SG Radar/SR' ],
				equipMap[ 'SG Radar/E' ],
				equipMap[ 'Twin 152mm Main Gun/E' ],
				equipMap[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ]
			],
			2: [
				equipMap[ 'Single 138.6mm Mle 1929 Naval Gun/SR' ],
				equipMap[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ],
				equipMap[ 'Twin 120mm Main Gun Mount/E' ],
				equipMap[ 'Single 138.6mm Mle 1929 Naval Gun/E' ]
			],
			3: [
				equipMap[ 'Quadruple 380mm Mle 1935 Main Gun Mount/SR' ]
			]
		}
	},
	'Ink-Stained Steel Sakura'      : {
		A: {
			1: [
				equipMap[ '533mm Quadruple Torpedo Mount/E' ],
				equipMap[ '610mm Quadruple Torpedo Mount/E' ]
			],
			2: [
				equipMap[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ],
				equipMap[ 'Twin 100mm Type 98 High-Angle Gun/E' ],
				equipMap[ '610mm Quadruple Torpedo Mount/E' ],
				equipMap[ '76mm AA Gun/R' ]
			],
			4: [
				equipMap[ 'Single 127mm Main Gun/E' ],
				equipMap[ '610mm Quadruple Torpedo Mount/E' ]
			]
		},
		B: {
			1: [
				equipMap[ 'Quadruple 40mm Bofors AA Gun Mount/E' ],
				equipMap[ 'Twin 410mm Naval Gun Mount/E' ]
			],
			2: [
				equipMap[ 'Fire Control Radar/E' ]
			]
		},
		C: {
			1: [
				equipMap[ '533mm Quintuple Torpedo Mount/SR' ],
				equipMap[ 'Fuel Filter/E' ],
				equipMap[ '533mm Quadruple Torpedo Mount/E' ],
				equipMap[ '610mm Quadruple Torpedo Mount/E' ]
			],
			2: [
				equipMap[ 'Twin 100mm Type 98 High-Angle Gun/SR' ],
				equipMap[ 'Autoloader/E' ],
				equipMap[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ],
				equipMap[ 'Twin 100mm Type 98 High-Angle Gun/E' ],
				equipMap[ '610mm Quadruple Torpedo Mount/E' ]
			],
			3: [
				equipMap[ 'Ship Maintenance Facility/SR' ],
				equipMap[ 'Anti-Torpedo Bulge/E' ]
			],
			4: [
				equipMap[ '610mm Quadruple Torpedo Mount/SR' ],
				equipMap[ 'Single 127mm Main Gun/E' ],
				equipMap[ '610mm Quadruple Torpedo Mount/E' ]
			]
		},
		D: {
			1: [
				equipMap[ 'Triple 406mm Main Gun/SR' ],
				equipMap[ 'Quadruple 40mm Bofors AA Gun Mount/E' ],
				equipMap[ 'Twin 410mm Naval Gun Mount/E' ]
			],
			2: [
				equipMap[ 'Steam Catapult/SR' ],
				equipMap[ 'Fire Control Radar/E' ]
			]
		}
	},
	'Crimson Echoes'                : {
		A: {
			3: [
				equipMap[ 'Fire Control Radar/E' ],
				equipMap[ 'Fuel Filter/E' ],
				equipMap[ 'Twin 410mm Naval Gun Mount/E' ]
			]
		},
		B: {
			1: [
				equipMap[ 'Repair Toolkit/E' ],
				equipMap[ 'Twin 100mm Type 98 High-Angle Gun/E' ],
				equipMap[ '610mm Quadruple Torpedo Mount/E' ]
			],
			2: [
				equipMap[ 'Advanced Boiler/E' ],
				equipMap[ 'Triple 155mm Main Gun Mount/E' ]
			],
			3: [
				equipMap[ 'Autoloader/E' ],
				equipMap[ 'Twin 100mm Type 98 High-Angle Gun/E' ],
				equipMap[ 'Triple 155mm Main Gun Mount/E' ],
				equipMap[ 'Twin 410mm Naval Gun Mount/E' ]
			]
		},
		C: {
			1: [
				equipMap[ 'Twin 100mm Type 98 High-Angle Gun/SR' ]
			],
			2: [
				equipMap[ 'Triple 155mm Main Gun Mount/SR' ],
				equipMap[ 'Triple 152mm Main Gun/E' ]
			],
			3: [
				equipMap[ 'Quadruple 40mm Bofors AA Gun Mount/SR' ],
				equipMap[ 'Fire Control Radar/E' ],
				equipMap[ 'Fuel Filter/E' ],
				equipMap[ 'Twin 410mm Naval Gun Mount/E' ]
			]
		},
		D: {
			1: [
				equipMap[ '610mm Quadruple Torpedo Mount/SR' ],
				equipMap[ 'Repair Toolkit/E' ],
				equipMap[ '610mm Quadruple Torpedo Mount/E' ]
			],
			2: [
				equipMap[ 'Twin 203mm (SK C/34)/SR' ],
				equipMap[ 'Advanced Boiler/E' ]
			],
			3: [
				equipMap[ 'Triple 406mm Main Gun/SR' ],
				equipMap[ 'Twin 100mm Type 98 High-Angle Gun/E' ],
				equipMap[ 'Triple 155mm Main Gun Mount/E' ],
				equipMap[ 'Twin 410mm Naval Gun Mount/E' ]
			]
		}
	},
	'Scherzo of Iron and Blood'     : {
		A: {
			1: [
				equipMap[ 'Single 120mm QF Mark IX Naval Gun/R' ]
			],
			2: [
				equipMap[ 'Aviation Oil Tank/E' ],
				equipMap[ 'Steam Catapult/E' ],
				equipMap[ 'Hydraulic Steering Gear/R' ]
			],
			3: [
				equipMap[ 'Barracuda/E' ],
				equipMap[ 'Seafang/E' ]
			]
		},
		B: {
			1: [
				equipMap[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ]
			],
			2: [
				equipMap[ 'Twin 152mm Main Gun/E' ],
				equipMap[ 'Twin 120mm Main Gun Mount/E' ]
			],
			3: [
				equipMap[ 'Quadruple 40mm Bofors AA Gun Mount/E' ],
				equipMap[ 'Triple 406mm Mk 6 Main Gun Mount/E' ],
				equipMap[ 'Repair Toolkit/E' ],
				equipMap[ 'Anti-Torpedo Bulge/E' ],
				equipMap[ 'Fire Control Radar/E' ]
			]
		},
		C: {
			1: [
				equipMap[ 'Octuple 40mm Pom-Pom Gun Mount/SR' ]
			],
			2: [
				equipMap[ 'F6F Hellcat/SR' ],
				equipMap[ 'Aviation Oil Tank/E' ],
				equipMap[ 'Steam Catapult/E' ]
			],
			3: [
				equipMap[ 'Barracuda/SR' ],
				equipMap[ 'Barracuda/E' ],
				equipMap[ 'Seafang/E' ]
			]
		},
		D: {
			1: [
				equipMap[ 'Twin 380mm SK C/34 Main Gun Mount/SR' ],
				equipMap[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ]
			],
			2: [
				equipMap[ 'Triple 406mm Main Gun/SR' ],
				equipMap[ 'Twin 152mm Main Gun/E' ]
			],
			3: [
				equipMap[ 'Quadruple 40mm Bofors AA Gun Mount/SR' ],
				equipMap[ 'Quadruple 40mm Bofors AA Gun Mount/E' ],
				equipMap[ 'Triple 406mm Mk 6 Main Gun Mount/E' ],
				equipMap[ 'Repair Toolkit/E' ],
				equipMap[ 'Anti-Torpedo Bulge/E' ]
			]
		}
	},
	
	'Strive, Wish, and Strategize': {
		SP: {
			1: [
				equipMap[ 'Tenzan/E' ]
			],
			2: [
				equipMap[ 'Twin 120mm Main Gun Mount/E' ],
				equipMap[ 'Twin 410mm Naval Gun Mount/E' ]
			],
			3: [
				equipMap[ 'Quadruple 356mm Main Gun Mount/SR' ],
				equipMap[ 'Twin 152mm Main Gun/E' ],
				equipMap[ '610mm Quadruple Torpedo Mount/E' ]
			]
		}
	},
	'The Pursuit of Graf Spee'    : {
		SP: {
			1: [
				equipMap[ 'Advanced Boiler/E' ]
			],
			2: [
				equipMap[ 'Octuple 40mm Pom-Pom Gun Mount/SR' ],
				equipMap[ 'Fuel Filter/E' ],
				equipMap[ 'Octuple 40mm Pom-Pom Gun Mount/E' ]
			],
			3: [
				equipMap[ '533mm Quadruple Magnetic Torpedo Mount/SR' ],
				equipMap[ 'Single 150mm SK C/28 Main Gun Mount/E' ],
				equipMap[ 'Triple 283mm SK C/28 Main Gun Mount/E' ],
				equipMap[ '533mm Quadruple Magnetic Torpedo Mount/E' ]
			]
		}
	},
	'Glorious Battle'             : {
		SP: {
			1: [
				equipMap[ 'Twin 203mm (SK C/34)/SR' ],
				equipMap[ '533mm Quadruple Torpedo Mount/E' ],
				equipMap[ 'Twin 120mm Main Gun Mount/E' ],
				equipMap[ 'Single 120mm QF Mark IX Naval Gun/R' ]
			],
			2: [
				equipMap[ 'Barracuda/SR' ]
			
			],
			3: [
				equipMap[ '533mm Quintuple Torpedo Mount/SR' ],
				equipMap[ '533mm Quadruple Torpedo Mount/E' ],
				equipMap[ 'Twin 120mm Main Gun Mount/E' ]
			]
		}
	},
	'Passionate Polaris'          : {
		SP: {
			1: [
				equipMap[ 'Twin 120mm Main Gun Mount/E' ],
				equipMap[ 'Single 127mm Main Gun/E' ]
			],
			2: [
				equipMap[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ]
			],
			3: [
				equipMap[ '533mm Quadruple Magnetic Torpedo Mount/E' ],
				equipMap[ 'Triple 283mm SK C/28 Main Gun Mount/E' ]
			],
			4: [
				equipMap[ 'Improved Depth Charge Projector/E' ],
				equipMap[ 'Advanced Sonar/E' ]
			],
			5: [
				equipMap[ 'Quadruple 380mm Mle 1935 Main Gun Mount/SR' ],
				equipMap[ 'Single 138.6mm Mle 1929 Naval Gun/E' ],
				equipMap[ 'Quadruple 40mm Bofors AA Gun Mount/E' ]
			]
		}
	}
};
