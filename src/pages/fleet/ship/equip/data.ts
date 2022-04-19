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
