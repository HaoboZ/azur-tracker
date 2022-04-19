// noinspection SpellCheckingInspection

export enum EquipGroup {
	T,
	AA,
	DD,
	M,
	CL,
	CA,
	CB,
	SS,
	BB,
	F,
	DB,
	TB,
	ST,
	SP,
	SSP,
	A,
	C
}

export const typeNames = {
	[ EquipGroup.T ]  : 'Torpedo',
	[ EquipGroup.AA ] : 'Anti-Air Gun',
	[ EquipGroup.DD ] : 'Destroyer Gun',
	[ EquipGroup.M ]  : 'Missile',
	[ EquipGroup.CL ] : 'Light Cruiser Gun',
	[ EquipGroup.CA ] : 'Heavy/Large Cruiser Gun',
	[ EquipGroup.CB ] : 'Heavy/Large Cruiser Gun',
	[ EquipGroup.SS ] : 'Heavy/Large Cruiser Gun',
	[ EquipGroup.BB ] : 'Battleship Gun',
	[ EquipGroup.F ]  : 'Fighter',
	[ EquipGroup.DB ] : 'Dive Bomber',
	[ EquipGroup.TB ] : 'Torpedo Bomber',
	[ EquipGroup.ST ] : 'Submarine Torpedo',
	[ EquipGroup.SP ] : 'Sea Plane',
	[ EquipGroup.SSP ]: 'Sea Plane',
	[ EquipGroup.A ]  : 'Auxiliary',
	[ EquipGroup.C ]  : 'Cargo'
};

export type EquipType = {
	id: number,
	name: string,
	href: string,
	image: string,
	type: EquipGroup,
	rarity: 'UR' | 'SR' | 'E' | 'R' | 'N'
};

export function getEquipTier( equipData: any[] ): Record<string, Record<number, number[]>> {
	const map = equipData.reduce<Record<string, number>>( ( obj, item ) => {
		obj[ `${item.name}/${item.rarity}` ] = item.id;
		return obj;
	}, {} );
	
	let a;
	// tiers of equipment by slot
	return {
		'T': {
			[ map[ '533mm Quintuple Magnetic Torpedo Mount/UR' ] ]: [ 0, a = 0 ],
			[ map[ '533mm Quadruple Magnetic Torpedo Mount/SR' ] ]: [ 0, ++a ],
			[ map[ '610mm Quintuple Torpedo Mount/UR' ] ]         : [ 0, ++a ],
			[ map[ '533mm Quintuple Torpedo Mount Mk 17/SR' ] ]   : [ 1, ++a ],
			[ map[ '533mm Quintuple Torpedo Mount/SR' ] ]         : [ 1, ++a ],
			[ map[ '533mm Quintuple Magnetic Torpedo Mount/SR' ] ]: [ 2, ++a ],
			[ map[ '533mm Quintuple Torpedo Mount Mk IX/SR' ] ]   : [ 2, ++a ],
			[ map[ '610mm Quadruple Torpedo Mount Kai/SR' ] ]     : [ 2, ++a ],
			[ map[ '610mm Quadruple Torpedo Mount/SR' ] ]         : [ 2, ++a ],
			[ map[ '533mm Quadruple Torpedo Mount Mk 17/E' ] ]    : [ 3, ++a ],
			[ map[ '533mm Quadruple Torpedo Mount/E' ] ]          : [ 3, ++a ],
			[ map[ '533mm Quadruple Magnetic Torpedo Mount/E' ] ] : [ 3, ++a ],
			[ map[ '533mm Quintuple Torpedo Mount/E' ] ]          : [ 3, ++a ],
			[ map[ '533mm Quintuple Magnetic Torpedo Mount/E' ] ] : [ 4, ++a ],
			[ map[ '533mm Quadruple Torpedo Mount Mk IX/E' ] ]    : [ 4, ++a ],
			[ map[ '610mm Quadruple Torpedo Mount/E' ] ]          : [ 4, ++a ]
		},
		get 'T/A'() {
			return this.T;
		},
		'M': {
			[ map[ 'SY-1 Missile/SR' ] ]: [ 0, 0 ]
		},
		
		'AA/Damage': {
			[ map[ 'Sextuple 40mm Bofors AA Gun Mount/SR' ] ]            : [ 0, a = 0 ],
			[ map[ 'Twin 134mm AA Gun Mount/SR' ] ]                      : [ 0, ++a ],
			[ map[ 'Twin 113mm AA Gun Mount/SR' ] ]                      : [ 1, ++a ],
			[ map[ 'Octuple 40mm Pom-Pom Gun Mount/SR' ] ]               : [ 1, ++a ],
			[ map[ 'Twin 105mm SK C/33 na AA Gun Mount/SR' ] ]           : [ 1, ++a ],
			[ map[ 'Twin 100mm Type 98 AA Gun Mount/SR' ] ]              : [ 2, ++a ],
			[ map[ 'Twin 127mm Type 89 AA Gun Mount/SR' ] ]              : [ 2, ++a ],
			[ map[ 'Twin 105mm SK C/33 AA Gun Mount/SR' ] ]              : [ 3, ++a ],
			[ map[ 'Prototype Twin 90mm Model 1939 High Angle Gun/SR' ] ]: [ 3, ++a ],
			[ map[ 'Quadruple 40mm Bofors AA Gun Mount/SR' ] ]           : [ 3, ++a ],
			[ map[ 'Quadruple 40mm Bofors AA Gun Mount/E' ] ]            : [ 4, ++a ],
			[ map[ 'Octuple 40mm Pom-Pom Gun Mount/E' ] ]                : [ 4, ++a ]
		},
		'AA'       : {
			[ map[ 'Sextuple 40mm Bofors AA Gun Mount/SR' ] ]            : [ 0, a = 0 ],
			[ map[ 'Prototype Twin 90mm Model 1939 High Angle Gun/SR' ] ]: [ 0, ++a ],
			[ map[ 'Quadruple 40mm Bofors AA Gun Mount/SR' ] ]           : [ 0, ++a ],
			[ map[ 'Twin 76mm Mk 27 RF AA Gun Mount/SR' ] ]              : [ 0, ++a ],
			[ map[ 'Octuple 40mm Pom-Pom Gun Mount/SR' ] ]               : [ 1, ++a ],
			[ map[ 'Twin 105mm SK C/33 na AA Gun Mount/SR' ] ]           : [ 1, ++a ],
			[ map[ 'Twin 40mm Bofors Type 5 AA Gun Mount/SR' ] ]         : [ 1, ++a ],
			[ map[ 'Twin 100mm Type 98 AA Gun Mount/SR' ] ]              : [ 2, ++a ],
			[ map[ 'Twin 105mm SK C/33 AA Gun Mount/SR' ] ]              : [ 2, ++a ],
			[ map[ 'Single 90mm Model 1939 AA Gun/SR' ] ]                : [ 3, ++a ],
			[ map[ 'Twin 113mm AA Gun Mount/SR' ] ]                      : [ 3, ++a ],
			[ map[ 'Quadruple 40mm Bofors AA Gun Mount/E' ] ]            : [ 4, ++a ],
			[ map[ 'Octuple 40mm Pom-Pom Gun Mount/E' ] ]                : [ 4, ++a ]
		},
		'AA/Speed' : {
			[ map[ 'Triple 25mm Type 96 AT/AA Gun Mount/SR' ] ]          : [ 0, a = 0 ],
			[ map[ 'Twin 76mm Mk 27 RF AA Gun Mount/SR' ] ]              : [ 0, ++a ],
			[ map[ 'Twin 40mm Bofors Type 5 AA Gun Mount/SR' ] ]         : [ 1, ++a ],
			[ map[ 'Quadruple 40mm Bofors AA Gun Mount/SR' ] ]           : [ 1, ++a ],
			[ map[ 'Twin 37mm Mle 1936 AA Gun Mount/SR' ] ]              : [ 2, ++a ],
			[ map[ 'Twin 134mm AA Gun Mount/SR' ] ]                      : [ 3, ++a ],
			[ map[ 'Single 90mm Model 1939 AA Gun/SR' ] ]                : [ 3, ++a ],
			[ map[ 'Prototype Twin 90mm Model 1939 High Angle Gun/SR' ] ]: [ 4, ++a ],
			[ map[ 'Quadruple 40mm Bofors AA Gun Mount/E' ] ]            : [ 4, ++a ]
		},
		'AA/Main'  : {
			[ map[ 'Twin 40mm Bofors STAAG/SR' ] ]                   : [ 0, a = 0 ],
			[ map[ 'Twin 40mm Bofors "Hazemeyer" AA Gun Mount/SR' ] ]: [ 0, ++a ],
			[ map[ 'Twin 76mm Mk 27 RF AA Gun Mount/SR' ] ]          : [ 1, ++a ],
			[ map[ 'Twin 40mm Bofors Type 5 AA Gun Mount/SR' ] ]     : [ 1, ++a ],
			[ map[ 'Quadruple 40mm Bofors AA Gun Mount/SR' ] ]       : [ 2, ++a ],
			[ map[ 'Twin 37mm Mle 1936 AA Gun Mount/SR' ] ]          : [ 3, ++a ],
			[ map[ 'Twin 134mm AA Gun Mount/SR' ] ]                  : [ 3, ++a ],
			[ map[ 'Quadruple 40mm Bofors AA Gun Mount/E' ] ]        : [ 4, ++a ]
		},
		get 'AA/A'() {
			return this.AA;
		},
		
		'DD'         : {
			[ map[ '135mm Twin Main Gun Mount Model 1938/SR' ] ]        : [ 0, a = 0 ],
			[ map[ 'Twin 130mm B-2LM Main Gun Mount/SR' ] ]             : [ 0, ++a ],
			[ map[ 'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount/SR' ] ]: [ 0, ++a ],
			[ map[ 'Twin 114mm Mk IV Dual-Purpose Gun Mount/SR' ] ]     : [ 0, ++a ],
			[ map[ 'Single 138.6mm Mle 1929 Naval Gun/SR' ] ]           : [ 1, ++a ],
			[ map[ 'Twin 120mm Mk XI Dual-Purpose Gun Mount/SR' ] ]     : [ 1, ++a ],
			[ map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/SR' ] ]     : [ 1, ++a ],
			[ map[ 'Single 138.6mm Mle 1927 Naval Gun/E' ] ]            : [ 2, ++a ],
			[ map[ 'Twin 120mm Main Gun Mount/E' ] ]                    : [ 2, ++a ],
			[ map[ 'Twin 120mm M1936 Main Gun Mount/E' ] ]              : [ 2, ++a ],
			[ map[ 'Single 130mm Naval Gun/E' ] ]                       : [ 3, ++a ],
			[ map[ 'Single 138.6mm Mle 1929 Naval Gun/E' ] ]            : [ 3, ++a ],
			[ map[ 'Single 127mm Main Gun/E' ] ]                        : [ 3, ++a ],
			[ map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ] ]      : [ 4, ++a ]
		},
		'DD/Speed'   : {
			[ map[ 'Twin 114mm Mk IV Dual-Purpose Gun Mount/SR' ] ]     : [ 0, a = 0 ],
			[ map[ '135mm Twin Main Gun Mount Model 1938/SR' ] ]        : [ 0, ++a ],
			[ map[ 'Twin 130mm B-2LM Main Gun Mount/SR' ] ]             : [ 0, ++a ],
			[ map[ 'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount/SR' ] ]: [ 1, ++a ],
			[ map[ 'Twin 100mm Type 98 High-Angle Gun/SR' ] ]           : [ 1, ++a ],
			[ map[ 'Twin 120mm Mk XI Dual-Purpose Gun Mount/SR' ] ]     : [ 2, ++a ],
			[ map[ 'Single 138.6mm Mle 1929 Naval Gun/SR' ] ]           : [ 2, ++a ],
			[ map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/SR' ] ]     : [ 2, ++a ],
			[ map[ 'Single 127mm Main Gun/E' ] ]                        : [ 3, ++a ],
			[ map[ 'Twin 120mm Main Gun Mount/E' ] ]                    : [ 3, ++a ],
			[ map[ 'Twin 100mm Type 98 High-Angle Gun/E' ] ]            : [ 3, ++a ],
			[ map[ 'Single 130mm Naval Gun/E' ] ]                       : [ 4, ++a ]
		},
		'DD/SSpeed'  : {
			[ map[ 'Twin 114mm Mk IV Dual-Purpose Gun Mount/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'Twin 130mm B-2LM Main Gun Mount/SR' ] ]        : [ 0, ++a ],
			[ map[ 'Twin 100mm Type 98 High-Angle Gun/SR' ] ]      : [ 1, ++a ],
			[ map[ '76mm AA Gun/R' ] ]                             : [ 2, ++a ],
			[ map[ 'Single 120mm QF Mark IX Naval Gun/R' ] ]       : [ 2, ++a ],
			[ map[ 'Single 127mm Main Gun/E' ] ]                   : [ 3, ++a ]
		},
		'DD/SSSpeed' : {
			[ map[ '76mm AA Gun/R' ] ]                             : [ 0, a = 0 ],
			[ map[ 'Single 120mm QF Mark IX Naval Gun/R' ] ]       : [ 0, ++a ],
			[ map[ 'Twin 114mm Mk IV Dual-Purpose Gun Mount/SR' ] ]: [ 1, ++a ],
			[ map[ 'Twin 100mm Type 98 High-Angle Gun/SR' ] ]      : [ 2, ++a ]
		},
		'DD/AP'      : {
			[ map[ 'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'Single 138.6mm Mle 1929 Naval Gun/SR' ] ]           : [ 1, ++a ],
			[ map[ 'Twin 114mm Mk IV Dual-Purpose Gun Mount/SR' ] ]     : [ 2, ++a ],
			[ map[ 'Twin 120mm Mk XI Dual-Purpose Gun Mount/SR' ] ]     : [ 2, ++a ],
			[ map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/SR' ] ]     : [ 2, ++a ],
			[ map[ 'Twin 128mm SK C/41 Dual-Purpose Gun Mount/E' ] ]    : [ 3, ++a ],
			[ map[ 'Single 138.6mm Mle 1927 Naval Gun/E' ] ]            : [ 3, ++a ],
			[ map[ 'Twin 120mm Main Gun Mount/E' ] ]                    : [ 3, ++a ],
			[ map[ 'Twin 120mm M1936 Main Gun Mount/E' ] ]              : [ 3, ++a ],
			[ map[ 'Single 130mm Naval Gun/E' ] ]                       : [ 4, ++a ],
			[ map[ 'Single 138.6mm Mle 1929 Naval Gun/E' ] ]            : [ 4, ++a ],
			[ map[ 'Single 127mm Main Gun/E' ] ]                        : [ 4, ++a ]
		},
		'DD/AP/Speed': {
			[ map[ 'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'Twin 114mm Mk IV Dual-Purpose Gun Mount/SR' ] ]     : [ 1, ++a ],
			[ map[ 'Twin 120mm Mk XI Dual-Purpose Gun Mount/SR' ] ]     : [ 2, ++a ],
			[ map[ 'Twin 100mm Type 98 High-Angle Gun/SR' ] ]           : [ 2, ++a ],
			[ map[ 'Twin 128mm SK C/41 Dual-Purpose Gun Mount/E' ] ]    : [ 3, ++a ],
			[ map[ 'Single 138.6mm Mle 1929 Naval Gun/SR' ] ]           : [ 3, ++a ],
			[ map[ 'Single 127mm Main Gun/E' ] ]                        : [ 4, ++a ],
			[ map[ 'Twin 100mm Type 98 High-Angle Gun/E' ] ]            : [ 4, ++a ]
		},
		get 'CL/DD'() {
			return this.DD;
		},
		get 'CL/DD/Speed'() {
			return this[ 'DD/Speed' ];
		},
		get 'T/DD'() {
			return this.DD;
		},
		'DD/Aux' : {
			[ map[ 'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'Twin 114mm Mk IV Dual-Purpose Gun Mount/SR' ] ]     : [ 0, ++a ],
			[ map[ 'Single 138.6mm Mle 1929 Naval Gun/SR' ] ]           : [ 1, ++a ],
			[ map[ 'Twin 100mm Type 98 High-Angle Gun/SR' ] ]           : [ 1, ++a ],
			[ map[ 'Twin 120mm Mk XI Dual-Purpose Gun Mount/SR' ] ]     : [ 2, ++a ],
			[ map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/SR' ] ]     : [ 2, ++a ],
			[ map[ 'Twin 100mm Type 98 High-Angle Gun/E' ] ]            : [ 3, ++a ],
			[ map[ 'Single 127mm Main Gun/E' ] ]                        : [ 3, ++a ],
			[ map[ 'Single 138.6mm Mle 1929 Naval Gun/E' ] ]            : [ 3, ++a ],
			[ map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/E' ] ]      : [ 4, ++a ],
			[ map[ 'Twin 120mm Main Gun Mount/E' ] ]                    : [ 4, ++a ]
		},
		'DD/Main': {
			[ map[ 'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'Twin 127mm Secondary Gun Mount/E' ] ]               : [ 1, ++a ],
			[ map[ 'Twin 128mm SK C/41 Dual-Purpose Gun Mount/E' ] ]    : [ 2, ++a ],
			[ map[ 'Twin 120mm Main Gun Mount/E' ] ]                    : [ 3, ++a ]
		},
		'DD/Sub' : {
			[ map[ 'Twin 100mm Type 98 High-Angle Gun/SR' ] ]      : [ 0, a = 0 ],
			[ map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/SR' ] ]: [ 0, ++a ],
			[ map[ 'Twin 120mm Main Gun Mount/E' ] ]               : [ 1, ++a ],
			[ map[ 'Twin 100mm Type 98 High-Angle Gun/E' ] ]       : [ 2, ++a ]
		},
		
		'CL'     : {
			[ map[ 'Prototype Triple 152mm DP Mk 17 Main Gun Mount/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'Triple 152mm B-38 MK 5 Main Gun Mount/SR' ] ]         : [ 0, ++a ],
			[ map[ 'Prototype Triple 155mm Kai Naval Gun Mount/SR' ] ]    : [ 0, ++a ],
			[ map[ 'Prototype Triple 152mm Mk XXV Main Gun Mount/SR' ] ]  : [ 1, ++a ],
			[ map[ 'Triple 152mm Model 1934 Main Gun Mount/SR' ] ]        : [ 1, ++a ],
			[ map[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ] ]           : [ 2, ++a ],
			[ map[ 'Triple 152mm Mk 16 Main Gun Mount/SR' ] ]             : [ 3, ++a ],
			[ map[ 'Triple 155mm Main Gun Mount/SR' ] ]                   : [ 3, ++a ],
			[ map[ 'Triple 152mm B-38 MK 5 Main Gun Mount/E' ] ]          : [ 4, ++a ],
			[ map[ 'Triple 155mm Main Gun Mount/E' ] ]                    : [ 4, ++a ],
			[ map[ 'Single 150mm SK C/28 Main Gun Mount/E' ] ]            : [ 4, ++a ]
		},
		'CL/AP'  : {
			[ map[ 'Prototype Triple 152mm Mk XXV Main Gun Mount/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'Prototype Twin 150mm SK C/28 Main Gun Mount/SR' ] ] : [ 0, ++a ],
			[ map[ 'Triple 152mm Model 1934 Main Gun Mount/SR' ] ]      : [ 0, ++a ],
			[ map[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ] ]         : [ 1, ++a ],
			[ map[ 'Single 150mm SK C/28 Main Gun Mount/E' ] ]          : [ 2, ++a ]
		},
		'CL/Main': {
			[ map[ 'Prototype Triple 152mm Mk XXV Main Gun Mount/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'Triple 152mm Mk 16 Main Gun Mount/SR' ] ]           : [ 0, ++a ],
			[ map[ 'Triple 155mm Main Gun Mount/SR' ] ]                 : [ 1, ++a ],
			[ map[ 'Triple 152mm Main Gun2/E' ] ]                       : [ 1, ++a ],
			[ map[ 'Twin 152mm Main Gun/E' ] ]                          : [ 2, ++a ],
			[ map[ 'Twin 150mm SK C/28 Secondary Gun Mount/E' ] ]       : [ 2, ++a ],
			[ map[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ] ]         : [ 3, ++a ],
			[ map[ 'Triple 152mm Main Gun/E' ] ]                        : [ 3, ++a ]
		},
		get 'CL/DD/Main'() {
			return this[ 'CL/Main' ];
		},
		get 'CL/AA'() {
			return this.CL;
		},
		get 'CL/A'() {
			return this.CL;
		},
		get 'CL/DB'() {
			return this[ 'CL/Main' ];
		},
		
		'CA'         : {
			[ map[ 'Prototype Triple 234mm Main Gun Mount/UR' ] ]        : [ 0, a = 0 ],
			[ map[ 'Prototype Twin 234mm Main Gun Mount/SR' ] ]          : [ 0, ++a ],
			[ map[ 'Triple 203mm Mk 15 Main Gun Mount/SR' ] ]            : [ 1, ++a ],
			[ map[ 'Prototype Triple 203mm SK C/34 Main Gun Mount/SR' ] ]: [ 1, ++a ],
			[ map[ 'Twin 203mm (SK C/34)/SR' ] ]                         : [ 1, ++a ],
			[ map[ 'Twin 203mm Mle 1931 Main Gun Mount/SR' ] ]           : [ 2, ++a ],
			[ map[ 'Prototype Triple 203mm Mk IX Main Gun Mount/SR' ] ]  : [ 2, ++a ],
			[ map[ 'Prototype 203mm No. 3 Naval Gun Mount/SR' ] ]        : [ 3, ++a ],
			[ map[ 'Prototype Triple 203mm AA Gun/SR' ] ]                : [ 3, ++a ],
			[ map[ 'Twin 203mm (SK C/34)/E' ] ]                          : [ 4, ++a ],
			[ map[ 'Twin 203mm Naval Gun Mount/E' ] ]                    : [ 4, ++a ]
		},
		'CA/HE'      : {
			[ map[ 'Twin 203mm Mle 1931 Main Gun Mount/SR' ] ]         : [ 0, a = 0 ],
			[ map[ 'Prototype Triple 203mm Mk IX Main Gun Mount/SR' ] ]: [ 1, ++a ],
			[ map[ 'Prototype 203mm No. 3 Naval Gun Mount/SR' ] ]      : [ 2, ++a ],
			[ map[ 'Prototype Triple 203mm AA Gun/SR' ] ]              : [ 2, ++a ],
			[ map[ 'Twin 203mm Naval Gun Mount/E' ] ]                  : [ 3, ++a ]
		},
		'CA/Modified': {
			[ map[ 'Prototype Triple 234mm Main Gun Mount/UR' ] ]        : [ 0, a = 0 ],
			[ map[ 'Prototype Triple 203mm SK C/34 Main Gun Mount/SR' ] ]: [ 0, ++a ],
			[ map[ 'Twin 203mm (SK C/34)/SR' ] ]                         : [ 1, ++a ],
			[ map[ 'Triple 203mm Mk 15 Main Gun Mount/SR' ] ]            : [ 2, ++a ],
			[ map[ 'Twin 203mm (SK C/34)/E' ] ]                          : [ 3, ++a ]
		},
		'CA/CB'      : {
			[ map[ 'Prototype Triple 234mm Main Gun Mount/UR' ] ]        : [ 0, a = 0 ],
			[ map[ 'Triple 283mm SK C/28 Main Gun Mount/E' ] ]           : [ 0, ++a ],
			[ map[ 'Prototype Twin 234mm Main Gun Mount/SR' ] ]          : [ 0, ++a ],
			[ map[ 'Triple 203mm Mk 15 Main Gun Mount/SR' ] ]            : [ 1, ++a ],
			[ map[ 'Prototype Triple 203mm SK C/34 Main Gun Mount/SR' ] ]: [ 1, ++a ],
			[ map[ 'Twin 203mm (SK C/34)/SR' ] ]                         : [ 1, ++a ],
			[ map[ 'Twin 203mm Mle 1931 Main Gun Mount/SR' ] ]           : [ 2, ++a ],
			[ map[ 'Prototype Triple 203mm Mk IX Main Gun Mount/SR' ] ]  : [ 2, ++a ],
			[ map[ 'Prototype 203mm No. 3 Naval Gun Mount/SR' ] ]        : [ 3, ++a ],
			[ map[ 'Prototype Triple 203mm AA Gun/SR' ] ]                : [ 3, ++a ],
			[ map[ 'Twin 203mm (SK C/34)/E' ] ]                          : [ 4, ++a ],
			[ map[ 'Twin 203mm Naval Gun Mount/E' ] ]                    : [ 4, ++a ]
		},
		get 'CA/CL'() {
			return this.CA;
		},
		'CB/CA'   : {
			[ map[ 'B-50 Triple 305mm Mk-15 Main Gun Mount/SR' ] ]            : [ 0, a = 0 ],
			[ map[ 'Prototype Triple 305mm SK C/39 Main Gun Mount (CB)/SR' ] ]: [ 1, ++a ],
			[ map[ 'Prototype Triple 310mm Type 0 Main Gun Mount/SR' ] ]      : [ 2, ++a ],
			[ map[ 'Triple 283mm SK C/28 Main Gun Mount/E' ] ]                : [ 3, ++a ]
		},
		'CB/CA/HE': {
			[ map[ 'Prototype Triple 310mm Type 0 Main Gun Mount/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'Triple 283mm SK C/28 Main Gun Mount/E' ] ]          : [ 1, ++a ]
		},
		
		'BB/Damage'  : {
			[ map[ 'Triple 406mm MK7 Main Gun/UR' ] ]                : [ 0, a = 0 ],
			[ map[ 'Prototype Triple 381mm AA Gun/SR' ] ]            : [ 0, ++a ],
			[ map[ 'Prototype Twin 457mm Mk A Main Gun Mount/UR' ] ] : [ 1, ++a ],
			[ map[ 'Triple 406mm Mk 6 Main Gun Mount/E' ] ]          : [ 1, ++a ],
			[ map[ 'Prototype Triple 406mm /50 Main Gun Mount/SR' ] ]: [ 2, ++a ],
			[ map[ 'Prototype Triple 410mm Main Gun Mount/SR' ] ]    : [ 3, ++a ],
			[ map[ 'Prototype 406mm Mk D Main Gun Mount/SR' ] ]      : [ 3, ++a ]
		},
		'BB/Speed'   : {
			[ map[ 'Prototype 406mm SK C/34 Main Gun Mount/SR' ] ]            : [ 0, a = 0 ],
			[ map[ 'Prototype Triple 305mm SK C/39 Main Gun Mount (BB)/SR' ] ]: [ 0, ++a ],
			[ map[ 'Prototype Twin 457mm Mk A Main Gun Mount/UR' ] ]          : [ 1, ++a ],
			[ map[ 'Twin 381mm Advanced Main Gun Mount/SR' ] ]                : [ 1, ++a ],
			[ map[ 'Twin 410mm Naval Gun Mount/E' ] ]                         : [ 2, ++a ],
			[ map[ 'Twin 380mm SK C/34 Main Gun Mount/SR' ] ]                 : [ 3, ++a ],
			[ map[ 'Twin 406mm Mk 8 Main Gun Mount/E' ] ]                     : [ 3, ++a ]
		},
		'BB/Modified': {
			[ map[ 'Prototype Twin 457mm Mk A Main Gun Mount/UR' ] ]  : [ 0, a = 0 ],
			[ map[ 'Triple 406mm Main Gun/SR' ] ]                     : [ 1, ++a ],
			[ map[ 'Prototype Triple 406mm Model 1940 Main Gun/SR' ] ]: [ 1, ++a ],
			[ map[ 'Prototype Triple 406mm /50 Main Gun Mount/SR' ] ] : [ 1, ++a ],
			[ map[ 'Prototype Triple 410mm Main Gun Mount/SR' ] ]     : [ 2, ++a ],
			[ map[ 'Prototype 406mm Mk D Main Gun Mount/SR' ] ]       : [ 2, ++a ],
			[ map[ 'Triple 406mm Mk 6 Main Gun Mount/E' ] ]           : [ 3, ++a ]
		},
		
		'F' : {
			[ map[ 'F7F Tigercat/SR' ] ]                 : [ 0, a = 0 ],
			[ map[ 'Sea Hornet/SR' ] ]                   : [ 0, ++a ],
			[ map[ 'Prototype BF-109G/SR' ] ]            : [ 1, ++a ],
			[ map[ 'F4U (VF-17 "Pirate" Squad)/SR' ] ]   : [ 1, ++a ],
			[ map[ 'F6F Hellcat/SR' ] ]                  : [ 1, ++a ],
			[ map[ 'Kawanishi N1K3-A Shiden Kai 2/SR' ] ]: [ 2, ++a ],
			[ map[ 'A7M Reppuu/SR' ] ]                   : [ 2, ++a ],
			[ map[ 'Sea Fury/SR' ] ]                     : [ 2, ++a ],
			[ map[ 'Seafang/SR' ] ]                      : [ 2, ++a ],
			[ map[ 'F4U Corsair/E' ] ]                   : [ 3, ++a ],
			[ map[ 'A7M Reppuu/E' ] ]                    : [ 3, ++a ],
			[ map[ 'F6F Hellcat/E' ] ]                   : [ 3, ++a ],
			[ map[ 'Seafang/E' ] ]                       : [ 3, ++a ],
			[ map[ 'F8F Bearcat/SR' ] ]                  : [ 4, ++a ],
			[ map[ 'Type 0 Fighter Model 52/SR' ] ]      : [ 4, ++a ],
			[ map[ 'Seafire FR.47/SR' ] ]                : [ 4, ++a ],
			[ map[ 'F2A Buffalo (Thach Squadron)/SR' ] ] : [ 4, ++a ],
			[ map[ 'Messerschmitt Me-155A/SR' ] ]        : [ 4, ++a ]
		},
		'DB': {
			[ map[ 'Prototype Tenrai/UR' ] ]                 : [ 0, a = 0 ],
			[ map[ 'Experimental XSB3C-1/SR' ] ]             : [ 0, ++a ],
			[ map[ 'SB2C Helldiver/E' ] ]                    : [ 1, ++a ],
			[ map[ 'Suisei Model 12A/SR' ] ]                 : [ 1, ++a ],
			[ map[ 'Ju-87C Dive Bomber/E' ] ]                : [ 2, ++a ],
			[ map[ 'Firefly/SR' ] ]                          : [ 2, ++a ],
			[ map[ 'Suisei/SR' ] ]                           : [ 2, ++a ],
			[ map[ 'SBD Dauntless (McClusky Division)/SR' ] ]: [ 3, ++a ],
			[ map[ 'BTD-1 Destroyer/SR' ] ]                  : [ 3, ++a ],
			[ map[ 'Barracuda (831 Squadron)/SR' ] ]         : [ 3, ++a ]
		},
		'TB': {
			[ map[ 'Wyvern/UR' ] ]           : [ 0, a = 0 ],
			[ map[ 'XTB2D-1 Skypirate/SR' ] ]: [ 0, ++a ],
			// [ map[ 'Aichi B7A Ryusei/SR' ] ]:               [ 0, ++a ],
			// [ map[ 'Prototype Saiun Kai/SR' ] ]:            [ 0, ++a ],
			// [ map[ 'Ju-87 D-4/SR' ] ]:                      [ 0, ++a ],
			[ map[ 'Barracuda/SR' ] ]          : [ 1, ++a ],
			[ map[ 'Firecrest/SR' ] ]          : [ 1, ++a ],
			[ map[ 'Blackburn Firebrand/SR' ] ]: [ 1, ++a ],
			// [ map[ 'Tenzan Kai/E' ] ]:                      [ 1, ++a ],
			[ map[ 'TBM Avenger (VT-18 Squadron)/SR' ] ]  : [ 2, ++a ],
			[ map[ 'TBD Devastator (VT-8 Squadron)/SR' ] ]: [ 2, ++a ],
			[ map[ 'Barracuda/E' ] ]                      : [ 3, ++a ],
			// [ map[ 'Aichi B7A Ryusei/E' ] ]:                [ 3, ++a ],
			// [ map[ 'Tenzan/E' ] ]:             [ 3, ++a ],
			[ map[ 'Swordfish (818 Squad)/SR' ] ]: [ 4, ++a ],
			[ map[ 'Albacore/E' ] ]              : [ 4, ++a ]
		},
		get 'F/DB'() {
			return this.F;
		},
		get 'F/TB'() {
			return this.F;
		},
		get 'DB/TB'() {
			return this.DB;
		},
		get 'P'() {
			return this.F;
		},
		
		'SP'    : {
			[ map[ 'Seiran/E' ] ]                 : [ 0, a = 0 ],
			[ map[ 'N1K1 Kyoufuu/E' ] ]           : [ 1, ++a ],
			[ map[ 'Aichi E16A Zuiun/E' ] ]       : [ 2, ++a ],
			[ map[ 'Type 2 Seaplane Fighter/E' ] ]: [ 3, ++a ]
		},
		'SP/BBV': {
			[ map[ 'Suisei Model 21/SR' ] ]       : [ 0, a = 0 ],
			[ map[ 'Seiran/E' ] ]                 : [ 1, ++a ],
			[ map[ 'N1K1 Kyoufuu/E' ] ]           : [ 1, ++a ],
			[ map[ 'Aichi E16A Zuiun/E' ] ]       : [ 2, ++a ],
			[ map[ 'Type 2 Seaplane Fighter/E' ] ]: [ 3, ++a ]
		},
		get 'SP/DD'() {
			return this.SP;
		},
		'SSP': {
			[ map[ 'Seiran/E' ] ]          : [ 0, a = 0 ],
			[ map[ 'Aichi E16A Zuiun/E' ] ]: [ 1, ++a ]
		},
		'ST' : {
			[ map[ 'Mark 20 "Bidder" Submarine Torpedo/SR' ] ]       : [ 0, a = 0 ],
			[ map[ 'G7e Acoustic Homing Submarine Torpedo/SR' ] ]    : [ 0, ++a ],
			[ map[ 'Type 95 Kai Pure Oxygen Submarine Torpedo/UR' ] ]: [ 0, ++a ],
			[ map[ 'Mark 16 Submarine Torpedo/SR' ] ]                : [ 0, ++a ],
			[ map[ 'Type 96 Submarine Torpedo/SR' ] ]                : [ 1, ++a ],
			[ map[ 'Mark 28 Submarine Torpedo/SR' ] ]                : [ 1, ++a ],
			[ map[ 'Type 95 Submarine Torpedo/SR' ] ]                : [ 1, ++a ],
			[ map[ 'Mark 12 "Ferry" Submarine Torpedo/SR' ] ]        : [ 1, ++a ],
			[ map[ 'G7e Acoustic Homing Submarine Torpedo/E' ] ]     : [ 2, ++a ],
			[ map[ 'G7a Submarine Torpedo/E' ] ]                     : [ 2, ++a ],
			[ map[ 'Mark 16 Submarine Torpedo/E' ] ]                 : [ 2, ++a ],
			[ map[ 'Type 95 Submarine Torpedo/E' ] ]                 : [ 2, ++a ]
		},
		'SS' : {
			[ map[ 'Twin 203mm Mle 1924 Submarine Gun Mount/R' ] ]: [ 0, 0 ]
		},
		
		'A/DD1'  : {
			[ map[ 'Repair Toolkit/E' ] ] : [ 0, a = 0 ],
			[ map[ 'Pyoko-Pyoko/SR' ] ]   : [ 0, ++a ],
			[ map[ 'Advanced Boiler/E' ] ]: [ 1, ++a ]
		},
		'A/DD2'  : {
			[ map[ 'Intel Report - Arctic Stronghold/E' ] ]: [ 0, a = 0 ],
			[ map[ 'Autoloader/E' ] ]                      : [ 1, ++a ],
			[ map[ 'Repair Toolkit/E' ] ]                  : [ 2, ++a ],
			[ map[ 'Fire Suppressor/R' ] ]                 : [ 3, ++a ],
			[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]    : [ 3, ++a ]
		},
		'A/DD1/T': {
			[ map[ 'Repair Toolkit/E' ] ]              : [ 0, a = 0 ],
			[ map[ 'Pyoko-Pyoko/SR' ] ]                : [ 0, ++a ],
			[ map[ 'Advanced Boiler/E' ] ]             : [ 1, ++a ],
			[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]: [ 2, ++a ]
		},
		'A/DD2/T': {
			[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]: [ 0, a = 0 ],
			[ map[ '533mm Magnetic Torpedo/SR' ] ]     : [ 0, ++a ],
			[ map[ 'Repair Toolkit/E' ] ]              : [ 1, ++a ],
			[ map[ 'Autoloader/E' ] ]                  : [ 2, ++a ],
			[ map[ 'Fire Suppressor/R' ] ]             : [ 3, ++a ]
		},
		'A/CL1'  : {
			[ map[ 'Repair Toolkit/E' ] ]    : [ 0, ++a ],
			[ map[ 'Fuel Filter/E' ] ]       : [ 1, ++a ],
			[ map[ 'Anti-Torpedo Bulge/E' ] ]: [ 2, ++a ]
		},
		'A/CL2'  : {
			[ map[ 'High Performance Hydraulic Steering Gear/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'Beaver Squad Tag/SR' ] ]                        : [ 0, ++a ],
			[ map[ 'High Performance Air Radar/SR' ] ]              : [ 0, ++a ],
			[ map[ 'Air Radar/E' ] ]                                : [ 1, ++a ],
			[ map[ 'Hydraulic Steering Gear/R' ] ]                  : [ 2, ++a ],
			[ map[ 'Naval Camouflage/R' ] ]                         : [ 2, ++a ]
		},
		'A/CL1/T': {
			[ map[ 'Repair Toolkit/E' ] ]              : [ 0, a = 0 ],
			[ map[ 'Fuel Filter/E' ] ]                 : [ 1, ++a ],
			[ map[ 'Anti-Torpedo Bulge/E' ] ]          : [ 2, ++a ],
			[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]: [ 3, ++a ]
		},
		'A/CL2/T': {
			[ map[ 'High Performance Hydraulic Steering Gear/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'Beaver Squad Tag/SR' ] ]                        : [ 0, ++a ],
			[ map[ 'High Performance Air Radar/SR' ] ]              : [ 0, ++a ],
			[ map[ 'Air Radar/E' ] ]                                : [ 1, ++a ],
			[ map[ 'Hydraulic Steering Gear/R' ] ]                  : [ 2, ++a ],
			[ map[ 'Naval Camouflage/R' ] ]                         : [ 2, ++a ],
			[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]             : [ 3, ++a ]
		},
		'A/CA1'  : {
			[ map[ 'Repair Toolkit/E' ] ]    : [ 0, a = 0 ],
			[ map[ 'Fuel Filter/E' ] ]       : [ 1, ++a ],
			[ map[ 'Anti-Torpedo Bulge/E' ] ]: [ 2, ++a ]
		},
		'A/CA2'  : {
			[ map[ 'High Performance Hydraulic Steering Gear/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'Beaver Squad Tag/SR' ] ]                        : [ 0, ++a ],
			[ map[ 'Cosmic Kicks/SR' ] ]                            : [ 0, ++a ],
			[ map[ 'Hydraulic Steering Gear/R' ] ]                  : [ 1, ++a ],
			[ map[ 'Naval Camouflage/R' ] ]                         : [ 1, ++a ],
			[ map[ 'SG Radar/SR' ] ]                                : [ 2, ++a ],
			[ map[ 'SG Radar/E' ] ]                                 : [ 2, ++a ],
			[ map[ 'Fire Control Radar/E' ] ]                       : [ 2, ++a ],
			[ map[ 'Gyroscope/E' ] ]                                : [ 3, ++a ]
		},
		'A/CA1/T': {
			[ map[ 'Repair Toolkit/E' ] ]              : [ 0, a = 0 ],
			[ map[ 'Fuel Filter/E' ] ]                 : [ 1, ++a ],
			[ map[ 'Anti-Torpedo Bulge/E' ] ]          : [ 2, ++a ],
			[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]: [ 3, ++a ]
		},
		'A/CA2/T': {
			[ map[ 'High Performance Hydraulic Steering Gear/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'Beaver Squad Tag/SR' ] ]                        : [ 0, ++a ],
			[ map[ 'Cosmic Kicks/SR' ] ]                            : [ 0, ++a ],
			[ map[ 'Hydraulic Steering Gear/R' ] ]                  : [ 1, ++a ],
			[ map[ 'Naval Camouflage/R' ] ]                         : [ 1, ++a ],
			[ map[ 'SG Radar/SR' ] ]                                : [ 2, ++a ],
			[ map[ 'SG Radar/E' ] ]                                 : [ 2, ++a ],
			[ map[ 'Gyroscope/E' ] ]                                : [ 3, ++a ],
			[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]             : [ 3, ++a ]
		},
		'A/CB1'  : {
			[ map[ 'VH Armor Plating/SR' ] ] : [ 0, a = 0 ],
			[ map[ 'Repair Toolkit/E' ] ]    : [ 1, ++a ],
			[ map[ 'Fuel Filter/E' ] ]       : [ 2, ++a ],
			[ map[ 'Anti-Torpedo Bulge/E' ] ]: [ 3, ++a ]
		},
		get 'A/CB2'() {
			return this[ 'A/CA2' ];
		},
		'A/BB1': {
			[ map[ 'Type 1 AP Shell/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'Type 91 AP Shell/E' ] ]: [ 1, ++a ]
		},
		'A/BB2': {
			[ map[ 'Super Heavy Shell/SR' ] ]               : [ 0, a = 0 ],
			[ map[ 'High Standard Fire-Control Radar/SR' ] ]: [ 1, ++a ],
			[ map[ 'Nelson\'s Pennant of Victory/SR' ] ]    : [ 2, ++a ],
			[ map[ 'SG Radar/SR' ] ]                        : [ 2, ++a ],
			[ map[ 'Fire Control Radar/E' ] ]               : [ 3, ++a ],
			[ map[ 'SG Radar/E' ] ]                         : [ 3, ++a ],
			[ map[ 'Fire Suppressor/R' ] ]                  : [ 4, ++a ]
		},
		get 'A/BBV1'() {
			return this[ 'A/BB1' ];
		},
		get 'A/BBV2'() {
			return this[ 'A/BB2' ];
		},
		'A/CV1': {
			[ map[ 'Steam Catapult/SR' ] ]  : [ 0, a = 0 ],
			[ map[ 'Aviation Oil Tank/E' ] ]: [ 1, ++a ],
			[ map[ 'Steam Catapult/E' ] ]   : [ 1, ++a ]
			
		},
		'A/CV2': {
			[ map[ 'Steam Catapult/SR' ] ]      : [ 0, a = 0 ],
			[ map[ 'Frontier Medal/SR' ] ]      : [ 0, ++a ],
			[ map[ 'Homing Beacon/E' ] ]        : [ 1, ++a ],
			[ map[ 'Aviation Oil Tank/E' ] ]    : [ 2, ++a ],
			[ map[ '100/150 Aviation Fuel/E' ] ]: [ 2, ++a ],
			[ map[ 'Steam Catapult/E' ] ]       : [ 2, ++a ]
		},
		'A/SS1': {
			[ map[ 'Improved Snorkel/SR' ] ]           : [ 0, a = 0 ],
			[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]: [ 0, ++a ],
			[ map[ 'Fuel Filter/E' ] ]                 : [ 1, ++a ]
		},
		'A/SS2': {
			[ map[ 'Pressure-Resistant Hull Design/E' ] ]: [ 0, a = 0 ],
			[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]  : [ 0, ++a ],
			[ map[ 'Autoloader/E' ] ]                    : [ 1, ++a ]
		},
		'A/AR' : {
			[ map[ 'High Performance Air Radar/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'Ship Maintenance Facility/SR' ] ] : [ 0, ++a ],
			[ map[ 'Fuel Filter/E' ] ]                : [ 1, ++a ]
		},
		'A/AR1': {
			[ map[ 'High Performance Air Radar/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'Air Radar/E' ] ]                  : [ 1, ++a ]
		},
		'A/AR2': {
			[ map[ 'High Performance Air Radar/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'Air Radar/E' ] ]                  : [ 1, ++a ]
		},
		'A/BM1': {
			[ map[ 'Repair Toolkit/E' ] ]                   : [ 0, a = 0 ],
			[ map[ 'High Standard Fire-Control Radar/SR' ] ]: [ 1, ++a ],
			[ map[ 'FuMO 25/SR' ] ]                         : [ 1, ++a ],
			[ map[ 'Fire Control Radar/E' ] ]               : [ 2, ++a ]
		},
		'A/BM2': {
			[ map[ 'High Standard Fire-Control Radar/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'FuMO 25/SR' ] ]                         : [ 0, ++a ],
			[ map[ 'Fire Control Radar/E' ] ]               : [ 1, ++a ],
			[ map[ 'Repair Toolkit/E' ] ]                   : [ 1, ++a ],
			[ map[ 'SG Radar/SR' ] ]                        : [ 2, ++a ],
			[ map[ 'Fire Suppressor/R' ] ]                  : [ 3, ++a ],
			[ map[ 'SG Radar/E' ] ]                         : [ 3, ++a ]
		},
		'A/AE1': {
			[ map[ 'Beaver Squad Tag/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'Fuel Filter/E' ] ]      : [ 1, ++a ]
		},
		'A/AE2': {
			[ map[ 'High Performance Hydraulic Steering Gear/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'Hydraulic Steering Gear/R' ] ]                  : [ 1, ++a ],
			[ map[ 'Naval Camouflage/R' ] ]                         : [ 1, ++a ]
		},
		
		'C': {
			[ map[ '40cm Type 94 Naval Gun Parts (Cargo)/SR' ] ]: [ 0, a = 0 ],
			[ map[ 'Aviation Materials (Cargo)/E' ] ]           : [ 1, ++a ],
			[ map[ 'Small-Caliber Naval Gun Parts (Cargo)/E' ] ]: [ 1, ++a ],
			[ map[ 'Torpedo Materials (Cargo)/E' ] ]            : [ 1, ++a ]
		}
		
		// [ map[ '/SR' ] ]: [0, ++a],
	};
}

// type of weapon that can be equipped at each slot
export const equippable: Record<string, EquipGroup[]> = {
	'T'  : [ EquipGroup.T ],
	'T/A': [ EquipGroup.T, EquipGroup.A ],
	
	'M': [ EquipGroup.M ],
	
	'AA/Damage': [ EquipGroup.AA ],
	'AA'       : [ EquipGroup.AA ],
	'AA/Speed' : [ EquipGroup.AA ],
	'AA/Main'  : [ EquipGroup.AA ],
	'AA/A'     : [ EquipGroup.AA, EquipGroup.A ],
	
	'DD'         : [ EquipGroup.DD ],
	'DD/Speed'   : [ EquipGroup.DD ],
	'DD/SSpeed'  : [ EquipGroup.DD ],
	'DD/SSSpeed' : [ EquipGroup.DD ],
	'DD/AP'      : [ EquipGroup.DD ],
	'DD/AP/Speed': [ EquipGroup.DD ],
	'CL/DD'      : [ EquipGroup.CL, EquipGroup.DD ],
	'CL/DD/Speed': [ EquipGroup.CL, EquipGroup.DD ],
	'T/DD'       : [ EquipGroup.T, EquipGroup.DD ],
	'DD/Aux'     : [ EquipGroup.DD ],
	'DD/Main'    : [ EquipGroup.DD ],
	'DD/Sub'     : [ EquipGroup.DD ],
	
	'CL'        : [ EquipGroup.CL ],
	'CL/AP'     : [ EquipGroup.CL ],
	'CL/Main'   : [ EquipGroup.CL ],
	'CL/DD/Main': [ EquipGroup.CL ],
	'CL/AA'     : [ EquipGroup.CL, EquipGroup.AA ],
	'CL/A'      : [ EquipGroup.CL, EquipGroup.A ],
	'CL/DB'     : [ EquipGroup.CL, EquipGroup.DB ],
	
	'CA'         : [ EquipGroup.CA ],
	'CA/HE'      : [ EquipGroup.CA ],
	'CA/Modified': [ EquipGroup.CA ],
	'CA/CB'      : [ EquipGroup.CA, EquipGroup.CB ],
	'CA/CL'      : [ EquipGroup.CA, EquipGroup.CL ],
	'CB/CA'      : [ EquipGroup.CA, EquipGroup.CB ],
	'CB/CA/HE'   : [ EquipGroup.CA, EquipGroup.CB ],
	
	'BB/Damage'  : [ EquipGroup.BB ],
	'BB/Speed'   : [ EquipGroup.BB ],
	'BB/Modified': [ EquipGroup.BB ],
	
	'F'    : [ EquipGroup.F ],
	'DB'   : [ EquipGroup.DB ],
	'TB'   : [ EquipGroup.TB ],
	'F/DB' : [ EquipGroup.F, EquipGroup.DB ],
	'F/TB' : [ EquipGroup.F, EquipGroup.TB ],
	'DB/TB': [ EquipGroup.DB, EquipGroup.TB ],
	'P'    : [ EquipGroup.F, EquipGroup.DB, EquipGroup.TB ],
	
	'SP'    : [ EquipGroup.SP, EquipGroup.SSP ],
	'SP/BBV': [ EquipGroup.SP, EquipGroup.SSP ],
	'SP/DD' : [ EquipGroup.SP, EquipGroup.SSP, EquipGroup.DD ],
	'SSP'   : [ EquipGroup.SSP ],
	'ST'    : [ EquipGroup.ST ],
	'SS'    : [ EquipGroup.SS ],
	
	'A/DD1'  : [ EquipGroup.A ],
	'A/DD2'  : [ EquipGroup.A ],
	'A/DD1/T': [ EquipGroup.A ],
	'A/DD2/T': [ EquipGroup.A ],
	'A/CL1'  : [ EquipGroup.A ],
	'A/CL2'  : [ EquipGroup.A ],
	'A/CL1/T': [ EquipGroup.A ],
	'A/CL2/T': [ EquipGroup.A ],
	'A/CA1'  : [ EquipGroup.A ],
	'A/CA2'  : [ EquipGroup.A ],
	'A/CA1/T': [ EquipGroup.A ],
	'A/CA2/T': [ EquipGroup.A ],
	'A/CB1'  : [ EquipGroup.A ],
	'A/CB2'  : [ EquipGroup.A ],
	'A/BB1'  : [ EquipGroup.A ],
	'A/BB2'  : [ EquipGroup.A ],
	'A/BBV1' : [ EquipGroup.A ],
	'A/BBV2' : [ EquipGroup.A ],
	'A/CV1'  : [ EquipGroup.A ],
	'A/CV2'  : [ EquipGroup.A ],
	'A/SS1'  : [ EquipGroup.A ],
	'A/SS2'  : [ EquipGroup.A ],
	'A/AR'   : [ EquipGroup.A ],
	'A/AR1'  : [ EquipGroup.A ],
	'A/AR2'  : [ EquipGroup.A ],
	'A/BM1'  : [ EquipGroup.A ],
	'A/BM2'  : [ EquipGroup.A ],
	'A/AE1'  : [ EquipGroup.A ],
	'A/AE2'  : [ EquipGroup.A ],
	
	'C': [ EquipGroup.C, EquipGroup.A ]
};
