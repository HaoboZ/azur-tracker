enum type {
	T,
	AA,
	DD,
	CL,
	CA,
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

export const typeNames = [
	'Torpedo',
	'Anti-Air Gun',
	'Destroyer Gun',
	'Light Cruiser Gun',
	'Heavy/Large Cruiser Gun',
	'Battleship Gun',
	'Fighter',
	'Dive Bomber',
	'Torpedo Bomber',
	'Sea Plane',
	'Sea Plane',
	'Submarine Torpedo',
	'Submarine Gun',
	'Auxiliary',
	'Cargo'
];

enum rarity {
	UR = 'Ultra Rare',
	SR = 'Super Rare',
	E  = 'Elite',
	R  = 'Rare',
	N  = 'Normal'
}

const equipment = [
	//region Torpedo
	{
		name:   '533mm Quintuple Torpedo Mount MkIX',
		image:  '533mm_Quintuple_Torpedo_Mount_MkIX.png',
		type:   type.T,
		rarity: rarity.SR
	},
	{
		name:   '533mm Quintuple Torpedo Mount Mk17',
		image:  '533mm_Quintuple_Torpedo_Mount_Mk17.png',
		type:   type.T,
		rarity: rarity.SR
	},
	{
		name:   '610mm Quadruple Torpedo Mount Kai',
		image:  '610mm_Quadruple_Torpedo_Mount_Kai.png',
		type:   type.T,
		rarity: rarity.SR
	},
	{
		name:   'Quintuple 533mm Torpedo',
		image:  'Quintuple_533mm_Torpedo.png',
		type:   type.T,
		rarity: rarity.SR
	},
	{
		name:   'Quadruple 610mm Torpedo',
		image:  'Quadruple_610mm_Torpedo.png',
		type:   type.T,
		rarity: rarity.SR
	},
	{
		name:   '533mm Quadruple Torpedo Mount Mk17',
		image:  '533mm_Quadruple_Torpedo_Mount_Mk17.png',
		type:   type.T,
		rarity: rarity.E
	},
	{
		name:   '533mm Quadruple Torpedo Mount MkIX',
		image:  '533mm_Quadruple_Torpedo_Mount_MkIX.png',
		type:   type.T,
		rarity: rarity.E
	},
	{
		name:   'Quadruple 533mm Torpedo',
		image:  'Quadruple_533mm_Torpedo.png',
		type:   type.T,
		rarity: rarity.E
	},
	{
		name:   'Quintuple 533mm Torpedo',
		image:  'Quintuple_533mm_Torpedo.png',
		type:   type.T,
		rarity: rarity.E
	},
	{
		name:   'Quintuple 533mm Magnetic Torpedo',
		image:  'Quintuple_533mm_Magnetic_Torpedo.png',
		type:   type.T,
		rarity: rarity.UR
	},
	{
		name:   'Quadruple 610mm Torpedo',
		image:  'Quadruple_610mm_Torpedo.png',
		type:   type.T,
		rarity: rarity.E
	},
	{
		name:   'Quadruple 533mm Magnetic Torpedo',
		image:  'Quadruple_533mm_Magnetic_Torpedo.png',
		type:   type.T,
		rarity: rarity.SR
	},
	{
		name:   'Quintuple 533mm Magnetic Torpedo',
		image:  'Quintuple_533mm_Magnetic_Torpedo.png',
		type:   type.T,
		rarity: rarity.SR
	},
	{
		name:   'Quadruple 533mm Magnetic Torpedo',
		image:  'Quadruple_533mm_Magnetic_Torpedo.png',
		type:   type.T,
		rarity: rarity.E
	},
	{
		name:   'Quintuple 533mm Magnetic Torpedo',
		image:  'Quintuple_533mm_Magnetic_Torpedo.png',
		type:   type.T,
		rarity: rarity.E
	},
	{
		name:   'Triple 533mm Magnetic Torpedo',
		image:  'Triple_533mm_Magnetic_Torpedo.png',
		type:   type.T,
		rarity: rarity.E
	},
	//endregion
	//region Anti-Air
	{
		name:   'Sextuple Bofors 40mm AA Gun',
		image:  'Sextuple_Bofors_40mm_AA_Gun.png',
		type:   type.AA,
		rarity: rarity.SR
	},
	{
		name:   'Quadruple 40mm Bofors Gun',
		image:  'Quadruple_40mm_Bofors_Gun.png',
		type:   type.AA,
		rarity: rarity.SR
	},
	{
		name:   'Twin 76mm Rapid Fire Gun Mount Mk27',
		image:  'Twin_76mm_Rapid_Fire_Gun_Mount_Mk27.png',
		type:   type.AA,
		rarity: rarity.SR
	},
	{
		name:   'Octuple 40mm Pom Pom Gun',
		image:  'Octuple_40mm_Pom_Pom_Gun.png',
		type:   type.AA,
		rarity: rarity.SR
	},
	{
		name:   'Twin 105mm SK C/33 na Anti-Air Gun Mount',
		image:  'Twin_105mm_SK_C33_na_Anti-Air_Gun_Mount.png',
		type:   type.AA,
		rarity: rarity.SR
	},
	{
		name:   'Twin 40mm Bofors STAAG',
		image:  'Twin_40mm_Bofors_STAAG.png',
		type:   type.AA,
		rarity: rarity.SR
	},
	{
		name:   'Prototype 40mm AA Gun (Type 5)',
		image:  'Prototype_40mm_AA_Gun_Type 5.png',
		type:   type.AA,
		rarity: rarity.SR
	},
	{
		name:   '100mm Mounted AA Gun',
		image:  '100mm_Mounted_AA_Gun.png',
		type:   type.AA,
		rarity: rarity.SR
	},
	{
		name:   'Twin 105mm AA Gun (SK C)',
		image:  'Twin_105mm_AA_Gun_SK_C.png',
		type:   type.AA,
		rarity: rarity.SR
	},
	{
		name:   'Twin 40mm Bofors "Hazemeyer" AA Gun',
		image:  'Twin_40mm_Bofors_Hazemeyer_AA_Gun.png',
		type:   type.AA,
		rarity: rarity.SR
	},
	{
		name:   'Single 90mm High-Angle Gun (M1939)',
		image:  'Single_90mm_High-Angle_Gun_M1939.png',
		type:   type.AA,
		rarity: rarity.SR
	},
	{
		name:   'Twin 113mm AA Gun',
		image:  'Twin_113mm_AA_Gun.png',
		type:   type.AA,
		rarity: rarity.SR
	},
	{
		name:   'Quadruple 40mm Bofors Gun',
		image:  'Quadruple_40mm_Bofors_Gun.png',
		type:   type.AA,
		rarity: rarity.E
	},
	{
		name:   '25mm Type 96 Triple AT/AA Gun',
		image:  '25mm_Type_96_Triple_ATAA_Gun.png',
		type:   type.AA,
		rarity: rarity.SR
	},
	{
		name:   'Octuple 40mm Pom Pom Gun',
		image:  'Octuple_40mm_Pom_Pom_Gun.png',
		type:   type.AA,
		rarity: rarity.E
	},
	{
		name:   'Twin 37mm AA Gun (Mle 1936)',
		image:  'Twin_37mm_AA_Gun_Mle_1936.png',
		type:   type.AA,
		rarity: rarity.SR
	},
	{
		name:   '127mm Type 89 High-Angle Gun',
		image:  '127mm_Type_89_High-Angle_Gun.png',
		type:   type.AA,
		rarity: rarity.SR
	},
	{
		name:   '134mm Twin High-Angle Gun',
		image:  '134mm_Twin_High-Angle_Gun.png',
		type:   type.AA,
		rarity: rarity.SR
	},
	//endregion
	//region Destroyer
	{
		name:   'Twin 130mm Main Gun (B-2LM)',
		image:  'Twin_130mm_Main_Gun_B-2LM.png',
		type:   type.DD,
		rarity: rarity.SR
	},
	{
		name:   'Twin 114mm DP (4.5" MK IV)',
		image:  'Twin_114mm_DP_45_MK_IV.png',
		type:   type.DD,
		rarity: rarity.SR
	},
	{
		name:   'Twin 120mm Dual-Purpose Gun Mount MkXI',
		image:  'Twin_120mm_Dual-Purpose_Gun_Mount_MkXI.png',
		type:   type.DD,
		rarity: rarity.SR
	},
	{
		name:   'Single 138.6mm Main Gun (Mle 1927)',
		image:  'Single_1386mm_Main_Gun_Mle_1927.png',
		type:   type.DD,
		rarity: rarity.E
	},
	{
		name:   'Twin 120mm Main Gun',
		image:  'Twin_120mm_Main_Gun.png',
		type:   type.DD,
		rarity: rarity.E
	},
	{
		name:   'Twin 120mm Main Gun (M1936)',
		image:  'Twin_120mm_Main_Gun_M1936.png',
		type:   type.DD,
		rarity: rarity.E
	},
	{
		name:   'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount',
		image:  'Twin_128mm45_SK_C41_Dual-Purpose_Gun_Mount.png',
		type:   type.DD,
		rarity: rarity.SR
	},
	{
		name:   'Single 138.6mm Main Gun (Mle 1929)',
		image:  'Single_1386mm_Main_Gun_Mle_1929.png',
		type:   type.DD,
		rarity: rarity.SR
	},
	{
		name:   'Twin 100mm (Type 98) AA Gun',
		image:  'Twin_100mm_Type_98_AA_Gun.png',
		type:   type.DD,
		rarity: rarity.SR
	},
	{
		name:   'Single 130mm Main Gun',
		image:  'Single_130mm_Main_Gun.png',
		type:   type.DD,
		rarity: rarity.E
	},
	{
		name:   'Twin 127mm Secondary Gun Mount',
		image:  'Twin_127mm_Secondary_Gun_Mount.png',
		type:   type.DD,
		rarity: rarity.E
	},
	{
		name:   'Single 138.6mm Main Gun (Mle 1929)',
		image:  'Single_1386mm_Main_Gun_Mle_1929.png',
		type:   type.DD,
		rarity: rarity.E
	},
	{
		name:   'Twin 100mm (Type 98) AA Gun',
		image:  'Twin_100mm_Type_98_AA_Gun.png',
		type:   type.DD,
		rarity: rarity.E
	},
	{
		name:   'Twin 127mm MK12 Dual Gun',
		image:  'Twin_127mm_MK12_Dual_Gun.png',
		type:   type.DD,
		rarity: rarity.SR
	},
	{
		name:   'Single 127mm Main Gun',
		image:  'Single_127mm_Main_Gun.png',
		type:   type.DD,
		rarity: rarity.E
	},
	{
		name:   'Twin 127mm MK12 Dual Gun',
		image:  'Twin_127mm_MK12_Dual_Gun.png',
		type:   type.DD,
		rarity: rarity.E
	},
	{
		name:   'Twin 128mm Dual Gun (SK C/41)',
		image:  'Twin_128mm_Dual_Gun_SK_C41.png',
		type:   type.DD,
		rarity: rarity.E
	},
	{ name: '76mm AA Gun', image: '76mm_AA_Gun.png', type: type.DD, rarity: rarity.R },
	{
		name:   'Single 120mm Main Gun',
		image:  'Single_120mm_Main_Gun.png',
		type:   type.DD,
		rarity: rarity.R
	},
	//endregion
	//region Light Cruiser
	{
		name:   'Triple 152mm Main Gun2',
		image:  'Triple_152mm_Main_Gun2.png',
		type:   type.CL,
		rarity: rarity.E
	},
	{
		name:   'Twin 152mm Main Gun',
		image:  'Twin_152mm_Main_Gun.png',
		type:   type.CL,
		rarity: rarity.E
	},
	{
		name:   'Twin 150mm Main Gun (TbtsK C/36)',
		image:  'Twin_150mm_Main_Gun_TbtsK_C36.png',
		type:   type.CL,
		rarity: rarity.E
	},
	{
		name:   'Twin 150mm SK C/28 Secondary Gun Mount',
		image:  'Twin_150mm_SK_C28_Secondary_Gun_Mount.png',
		type:   type.CL,
		rarity: rarity.E
	},
	{
		name:   'Prototype Triple 152mm Main Gun (DP MK17)',
		image:  'Prototype_Triple_152mm_Main_Gun_DP_MK17.png',
		type:   type.CL,
		rarity: rarity.SR
	},
	{
		name:   'Triple 152mm Main Gun (B-38 MK5)',
		image:  'Triple_152mm_Main_Gun_B-38_MK5.png',
		type:   type.CL,
		rarity: rarity.SR
	},
	{
		name:   'Triple 152mm Main Gun Mount Mk16',
		image:  'Triple_152mm_Main_Gun_Mount_Mk16.png',
		type:   type.CL,
		rarity: rarity.SR
	},
	{
		name:   'Triple 155mm Mounted Gun',
		image:  'Triple_155mm_Mounted_Gun.png',
		type:   type.CL,
		rarity: rarity.SR
	},
	{
		name:   'Triple 152mm Main Gun',
		image:  'Triple_152mm_Main_Gun.png',
		type:   type.CL,
		rarity: rarity.E
	},
	{
		name:   'Prototype Triple 152mm Main Gun',
		image:  'Prototype_Triple_152mm_Main_Gun.png',
		type:   type.CL,
		rarity: rarity.SR
	},
	{
		name:   'Triple 152mm Main Gun (B-38 MK5)',
		image:  'Triple_152mm_Main_Gun_B-38_MK5.png',
		type:   type.CL,
		rarity: rarity.E
	},
	{
		name:   'Triple 155mm Mounted Gun',
		image:  'Triple_155mm_Mounted_Gun.png',
		type:   type.CL,
		rarity: rarity.E
	},
	{
		name:   'Single 150mm Main Gun (SK C/28)',
		image:  'Single_150mm_Main_Gun_SK_C28.png',
		type:   type.CL,
		rarity: rarity.E
	},
	//endregion
	//region Heavy Cruiser
	{
		name:   'Prototype Triple 234mm Main Gun (9.2" MK XII)',
		image:  'Prototype_Triple_234mm_Main_Gun_92_MK_XII.png',
		type:   type.CA,
		rarity: rarity.UR
	},
	{
		name:   'Prototype Triple 203mm Main Gun (SK C)',
		image:  'Prototype_Triple_203mm_Main_Gun_SK_C.png',
		type:   type.CA,
		rarity: rarity.SR
	},
	{
		name:   'Triple 203mm Main Gun Mount Mk15',
		image:  'Triple_203mm_Main_Gun_Mount_Mk15.png',
		type:   type.CA,
		rarity: rarity.SR
	},
	{
		name:   'Twin 203mm Main Gun (M1927)',
		image:  'Twin_203mm_Main_Gun_M1927.png',
		type:   type.CA,
		rarity: rarity.SR
	},
	{
		name:   'Triple 283mm Main Gun (SK C/28)',
		image:  'Triple_283mm_Main_Gun_SK_C.png',
		type:   type.CA,
		rarity: rarity.E
	},
	{
		name:   'Submarine-mounted Twin 203mm Cannon (Mle 1924)',
		image:  'Submarine-mounted_Twin_203mm_Cannon_Mle_1924.png',
		type:   type.SS,
		rarity: rarity.R
	},
	{
		name:   'Twin 203mm Main Gun (SK C)',
		image:  'Twin_203mm_Main_Gun_SK_C.png',
		type:   type.CA,
		rarity: rarity.SR
	},
	{
		name:   'Prototype Twin 234mm Main Gun (9.2" MK XII)',
		image:  'Prototype_Twin_234mm_Main_Gun_92_MK_XII.png',
		type:   type.CA,
		rarity: rarity.SR
	},
	{
		name:   'Twin 203mm Main Gun (SK C)',
		image:  'Twin_203mm_Main_Gun_SK_C.png',
		type:   type.CA,
		rarity: rarity.E
	},
	{
		name:   'Prototype Triple 203mm Main Gun Mount Mk IX',
		image:  'Prototype_Triple_203mm_Main_Gun_Mount_Mk_IX.png',
		type:   type.CA,
		rarity: rarity.SR
	},
	{
		name:   'Prototype Triple 203mm AA Gun',
		image:  'Prototype_Triple_203mm_AA_Gun.png',
		type:   type.CA,
		rarity: rarity.SR
	},
	{
		name:   'Twin 203mm Main Gun (Mle 1924)',
		image:  'Twin_203mm_Main_Gun_Mle_1924.png',
		type:   type.CA,
		rarity: rarity.SR
	},
	{
		name:   'Prototype Triple 310mm Main Gun (Type 0)',
		image:  'Prototype_Triple_310mm_Main_Gun_Type_0.png',
		type:   type.CA,
		rarity: rarity.SR
	},
	{
		name:   'Prototype 203mm (Type 3) Mounted Gun',
		image:  'Prototype_203mm_Type_3_Mounted_Gun.png',
		type:   type.CA,
		rarity: rarity.SR
	},
	{
		name:   'Twin 203mm Main Gun (M1927)',
		image:  'Twin_203mm_Main_Gun_M1927.png',
		type:   type.CA,
		rarity: rarity.E
	},
	{
		name:   '203mm Mounted Gun',
		image:  '203mm_Mounted_Gun.png',
		type:   type.CA,
		rarity: rarity.E
	},
	{
		name:   'Twin 203mm Main Gun (Mle 1924)',
		image:  'Twin_203mm_Main_Gun_Mle_1924.png',
		type:   type.CA,
		rarity: rarity.E
	},
	//endregion
	//region Battleship
	{
		name:   '410mm Mounted Gun (Type 3 Shell)',
		image:  '410mm_Mounted_Gun.png',
		type:   type.BB,
		rarity: rarity.SR
	},
	{
		name:   'Prototype Twin 457mm Main Gun (18" MKA)',
		image:  'Prototype_Twin_457mm_Main_Gun_18_MKA.png',
		type:   type.BB,
		rarity: rarity.UR
	},
	{
		name:   'Prototype Triple 406mm/50 Main Gun',
		image:  'Prototype_Triple_406mm50_Main_Gun.png',
		type:   type.BB,
		rarity: rarity.SR
	},
	{
		name:   'Triple 406mm MK6 Main Gun',
		image:  'Triple_406mm_MK6_Main_Gun.png',
		type:   type.BB,
		rarity: rarity.E
	},
	{
		name:   'Triple 406mm Main Gun',
		image:  'Triple_406mm_Main_Gun.png',
		type:   type.BB,
		rarity: rarity.SR
	},
	{
		name:   'Prototype Triple 410mm Mounted Gun',
		image:  'Prototype_Triple_410mm_Mounted_Gun.png',
		type:   type.BB,
		rarity: rarity.SR
	},
	{
		name:   'Prototype Triple 406mm Main Gun Mount MkD',
		image:  'Prototype_Triple_406mm_Main_Gun_Mount_MkD.png',
		type:   type.BB,
		rarity: rarity.SR
	},
	{
		name:   'Prototype Triple 381mm AA Gun',
		image:  'Prototype_Triple_381mm_AA_Gun.png',
		type:   type.BB,
		rarity: rarity.SR
	},
	{
		name:   'Quadruple 380mm Main Gun (Mle 1935)',
		image:  'Quadruple_380mm_Main_Gun_Mle_1935.png',
		type:   type.BB,
		rarity: rarity.SR
	},
	{
		name:   'Triple 381mm Main Gun (M1934)',
		image:  'Triple_381mm_Main_Gun_M1934.png',
		type:   type.BB,
		rarity: rarity.SR
	},
	{
		name:   'Triple 406mm Main Gun (B-37 MK1)',
		image:  'Triple_406mm_Main_Gun_B-37_MK1.png',
		type:   type.BB,
		rarity: rarity.E
	},
	{
		name:   'Triple 406mm Main Gun',
		image:  'Triple_406mm_Main_Gun.png',
		type:   type.BB,
		rarity: rarity.E
	},
	{
		name:   'Prototype Twin 406mm Main Gun (SK C/34)',
		image:  'Prototype_Twin_406mm_Main_Gun_SK_C34.png',
		type:   type.BB,
		rarity: rarity.SR
	},
	{
		name:   'Prototype Triple 305mm Main Gun (SK C/39)',
		image:  'Prototype_Triple_305mm_Main_Gun_SK_C39.png',
		type:   type.BB,
		rarity: rarity.SR
	},
	{
		name:   '410mm Breech-Loading Naval Gun Kai',
		image:  '410mm_Breech-Loading_Naval_Gun_Kai.png',
		type:   type.BB,
		rarity: rarity.E
	},
	{
		name:   'Twin 406mm Main Gun Mount Mk8',
		image:  'Twin_406mm_Main_Gun_Mount_Mk8.png',
		type:   type.BB,
		rarity: rarity.E
	},
	{
		name:   '410mm Mounted Gun',
		image:  '410mm_Mounted_Gun.png',
		type:   type.BB,
		rarity: rarity.E
	},
	{
		name:   'Triple 283mm Main Gun (SK C/34)',
		image:  'Triple_283mm_Main_Gun_SK_C.png',
		type:   type.BB,
		rarity: rarity.E
	},
	{
		name:   'Twin 381mm Advanced Main Gun',
		image:  'Twin_381mm_Advanced_Main_Gun.png',
		type:   type.BB,
		rarity: rarity.SR
	},
	{
		name:   'Twin 380mm Main Gun (SK C)',
		image:  'Twin_380mm_Main_Gun_SK_C.png',
		type:   type.BB,
		rarity: rarity.SR
	},
	{
		name:   'Quadruple 356mm Main Gun',
		image:  'Quadruple_356mm_Main_Gun.png',
		type:   type.BB,
		rarity: rarity.SR
	},
	{
		name:   'Triple 305mm Main Gun (M1907)',
		image:  'Triple_305mm_Main_Gun_M1907.png',
		type:   type.BB,
		rarity: rarity.R
	},
	//endregion
	//region Fighter
	{ name: 'Sea Hornet', image: 'Sea_Hornet.png', type: type.F, rarity: rarity.SR },
	{ name: 'F7F Tigercat', image: 'F7F_Tigercat.png', type: type.F, rarity: rarity.SR },
	{
		name:   'F4U (VF-17 "Pirate" Squad)',
		image:  'F4U_VF-17_Pirate_Squad.png',
		type:   type.F,
		rarity: rarity.SR
	},
	{ name: 'A7M Reppuu', image: 'A7M_Reppuu.png', type: type.F, rarity: rarity.SR },
	{ name: 'Seafang', image: 'Seafang.png', type: type.F, rarity: rarity.SR },
	{ name: 'Sea Fury', image: 'Sea_Fury.png', type: type.F, rarity: rarity.SR },
	{
		name:   'Kawanishi N1K3-A Shiden Kai 2',
		image:  'Kawanishi_N1K3-A_Shiden_Kai_2.png',
		type:   type.F,
		rarity: rarity.SR
	},
	{ name: 'F6F Hellcat', image: 'F6F_Hellcat.png', type: type.F, rarity: rarity.SR },
	{ name: 'F4U Corsair', image: 'F4U_Corsair.png', type: type.F, rarity: rarity.E },
	{ name: 'A7M Reppuu', image: 'A7M_Reppuu.png', type: type.F, rarity: rarity.E },
	{ name: 'Seafang', image: 'Seafang.png', type: type.F, rarity: rarity.E },
	{ name: 'F6F Hellcat', image: 'F6F_Hellcat.png', type: type.F, rarity: rarity.E },
	{ name: 'F8F Bearcat', image: 'F8F_Bearcat.png', type: type.F, rarity: rarity.SR },
	{ name: 'A6M5 Zero', image: 'A6M5_Zero.png', type: type.F, rarity: rarity.SR },
	{ name: 'Seafire FR.47', image: 'Seafire_FR47.png', type: type.F, rarity: rarity.SR },
	{
		name:   'Brewster F2A Buffalo (Thach Squadron)',
		image:  'Brewster_F2A_Buffalo_Thach_Squadron.png',
		type:   type.F,
		rarity: rarity.SR
	},
	{
		name:   'Messerschmitt Me-155A',
		image:  'Messerschmitt_Me-155A.png',
		type:   type.F,
		rarity: rarity.SR
	},
	//endregion
	//region Dive Bomber
	{
		name:   'Ju-87C Dive Bomber',
		image:  'Ju-87C_Dive_Bomber.png',
		type:   type.DB,
		rarity: rarity.E
	},
	{ name: 'SB2C Helldiver', image: 'SB2C_Helldiver.png', type: type.DB, rarity: rarity.E },
	{
		name:   'Experimental XSB3C-1',
		image:  'Experimental_XSB3C-1.png',
		type:   type.DB,
		rarity: rarity.SR
	},
	{
		name:   'Suisei Model 12A',
		image:  'Suisei_Model_12A.png',
		type:   type.DB,
		rarity: rarity.SR
	},
	{
		name:   'Fairey Firefly',
		image:  'Fairey_Firefly.png',
		type:   type.DB,
		rarity: rarity.SR
	},
	{ name: 'Comet', image: 'Comet.png', type: type.DB, rarity: rarity.SR },
	{
		name:   'BTD-1 Destroyer',
		image:  'BTD-1_Destroyer.png',
		type:   type.DB,
		rarity: rarity.SR
	},
	{
		name:   'SBD Dauntless (McClusky Division)',
		image:  'SBD_Dauntless_McClusky_Division.png',
		type:   type.DB,
		rarity: rarity.SR
	},
	{
		name:   'Fairey Barracuda (831 Squadron)',
		image:  'Fairey_Barracuda_831_Squadron.png',
		type:   type.DB,
		rarity: rarity.SR
	},
	//endregion
	//region Torpedo Bomber
	{ name: 'Wyvern', image: 'Wyvern.png', type: type.TB, rarity: rarity.UR },
	{
		name:   'XBT2D-1 Destroyer II',
		image:  'XBT2D-1_Destroyer_II.png',
		type:   type.TB,
		rarity: rarity.SR
	},
	{
		name:   'TBM Avenger (VT-18 Squadron)',
		image:  'TBM_Avenger_VT-18_Squadron.png',
		type:   type.TB,
		rarity: rarity.SR
	},
	{ name: 'Barracuda', image: 'Barracuda.png', type: type.TB, rarity: rarity.SR },
	{ name: 'Firecrest', image: 'Firecrest.png', type: type.TB, rarity: rarity.SR },
	{
		name:   'Blackburn Firebrand',
		image:  'Blackburn_Firebrand.png',
		type:   type.TB,
		rarity: rarity.SR
	},
	{
		name:   'Swordfish (818 Squad)',
		image:  'Swordfish_818_Squad.png',
		type:   type.TB,
		rarity: rarity.SR
	},
	{ name: 'Barracuda', image: 'Barracuda.png', type: type.TB, rarity: rarity.E },
	{
		name:   'Aichi B7A Ryusei',
		image:  'Aichi_B7A_Ryusei.png',
		type:   type.TB,
		rarity: rarity.SR
	},
	{ name: 'Tenzan Kai', image: 'Tenzan_Kai.png', type: type.TB, rarity: rarity.E },
	{ name: 'Ju-87 D-4', image: 'Ju-87_D-4.png', type: type.TB, rarity: rarity.SR },
	{
		name:   'Nakajima B6N Tenzan',
		image:  'Nakajima_B6N_Tenzan.png',
		type:   type.TB,
		rarity: rarity.E
	},
	{
		name:   'Aichi B7A Ryusei',
		image:  'Aichi_B7A_Ryusei.png',
		type:   type.TB,
		rarity: rarity.E
	},
	{
		name:   'Fairey Albacore',
		image:  'Fairey_Albacore.png',
		type:   type.TB,
		rarity: rarity.E
	},
	{
		name:   'TBD Devastator (VT-8 Squadron)',
		image:  'TBD_Devastator_VT-8_Squadron.png',
		type:   type.TB,
		rarity: rarity.SR
	},
	//endregion
	//region Seaplane
	{
		name:   'Suisei Model 21',
		image:  'Suisei_Model_21.png',
		type:   type.SP,
		rarity: rarity.SR
	},
	{ name: 'N1K1 Kyoufuu', image: 'N1K1_Kyoufuu.png', type: type.SP, rarity: rarity.E },
	{ name: 'Seiran', image: 'Seiran.png', type: type.SSP, rarity: rarity.E },
	{
		name:   'Aichi E16A Zuiun',
		image:  'Aichi_E16A_Zuiun.png',
		type:   type.SSP,
		rarity: rarity.E
	},
	{
		name:   'Type 2 Seaplane Fighter',
		image:  'Type_2_Seaplane_Fighter.png',
		type:   type.SP,
		rarity: rarity.E
	},
//endregion
	//region Submarine
	{
		name:   'Type 96 Submarine Torpedo',
		image:  'Type_96_Submarine_Torpedo.png',
		type:   type.ST,
		rarity: rarity.SR
	},
	{
		name:   'G7e Acoustic Guided Torpedo',
		image:  'G7e_Acoustic_Guided_Torpedo.png',
		type:   type.ST,
		rarity: rarity.SR
	},
	{
		name:   'Mark 28 Submarine Torpedo',
		image:  'Mark_28_Submarine_Torpedo.png',
		type:   type.ST,
		rarity: rarity.SR
	},
	{
		name:   'Type 95 Submarine Torpedo',
		image:  'Type_9x_Submarine_Torpedo.png',
		type:   type.ST,
		rarity: rarity.SR
	},
	{
		name:   'Mark 12 "Ferry" Submarine Torpedo',
		image:  'Mark_12_Ferry_Submarine_Torpedo.png',
		type:   type.ST,
		rarity: rarity.SR
	},
	{
		name:   'Mark 16 Submarine Torpedo',
		image:  'Mark_16_Submarine_Torpedo.png',
		type:   type.ST,
		rarity: rarity.SR
	},
	{
		name:   'Mark 20 "Bidder" Submarine Torpedo',
		image:  'Mark_20_Bidder_Submarine_Torpedo.png',
		type:   type.ST,
		rarity: rarity.SR
	},
	{
		name:   'G7a Submarine Torpedo',
		image:  'G7a_Submarine_Torpedo.png',
		type:   type.ST,
		rarity: rarity.E
	},
	{
		name:   'G7e Acoustic Guided Torpedo',
		image:  'G7e_Acoustic_Guided_Torpedo.png',
		type:   type.ST,
		rarity: rarity.E
	},
	{
		name:   'Type 95 Submarine Torpedo',
		image:  'Type_9x_Submarine_Torpedo.png',
		type:   type.ST,
		rarity: rarity.E
	},
	{
		name:   'Mark 16 Submarine Torpedo',
		image:  'Mark_16_Submarine_Torpedo.png',
		type:   type.ST,
		rarity: rarity.E
	},
	//endregion
	//region Auxilliary
	{
		name:   'Type 93 Pure Oxygen Torpedo',
		image:  'Type_9x_Submarine_Torpedo.png',
		type:   type.A,
		rarity: rarity.UR
	},
	{ name: 'Z Flag', image: 'Z_Flag.png', type: type.A, rarity: rarity.UR },
	{
		name:   '533mm Acoustic Torpedo',
		image:  '533mm_Acoustic_Torpedo.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{ name: 'Ankimo', image: 'Ankimo.png', type: type.A, rarity: rarity.SR },
	{
		name:   'Awakening Pearl',
		image:  'Awakening_Pearl.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{
		name:   'Celestial Body',
		image:  'Celestial_Body.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{ name: 'Corn Lantern', image: 'Corn_Lantern.png', type: type.A, rarity: rarity.SR },
	{ name: 'Cosmic Kicks', image: 'Cosmic_Kicks.png', type: type.A, rarity: rarity.SR },
	{
		name:   'Eagle Union Elite Damage Control',
		image:  'Eagle_Union_Elite_Damage_Control.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{
		name:   'Frontier Medal',
		image:  'Frontier_Medal.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{ name: 'Gamers Mark', image: 'Gamers_Mark.png', type: type.A, rarity: rarity.SR },
	{
		name:   'Healing Cat\'s Paw',
		image:  'Healing_Cats_Paw.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{ name: 'Heart Key', image: 'Heart_Key.png', type: type.A, rarity: rarity.SR },
	{
		name:   'High Performance Air Radar',
		image:  'High_Performance_Air_Radar.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{
		name:   'High Standard Fire-Control Radar',
		image:  'High_Standard_Fire-Control_Radar.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{
		name:   'High Performance Hydraulic Steering Gear',
		image:  'High_Performance_Hydraulic_Steering_Gear.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{
		name:   'Improved Snorkel',
		image:  'Improved_Snorkel.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{
		name:   'Improved Storage Battery',
		image:  'Improved_Storage_Battery.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{
		name:   'Intelligence Chip',
		image:  'Intelligence_Chip.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{
		name:   'Beaver Squad Tag',
		image:  'Beaver_Squad_Tag.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{
		name:   'Nelson\'s Pennant of Victory',
		image:  'Nelsons_Pennant_of_Victory.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{ name: 'Pearl\'s Tears', image: 'Pearls_Tears.png', type: type.A, rarity: rarity.SR },
	{ name: 'Pyoko-Pyoko', image: 'Pyoko-Pyoko.png', type: type.A, rarity: rarity.SR },
	{
		name:   'Random Word Generator',
		image:  'Random_Word_Generator.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{
		name:   'Resplendent Astrum',
		image:  'Resplendent_Astrum.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{
		name:   'Sacred Lumière',
		image:  'Sacred_Lumiere.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{
		name:   'Seal of the Four Gods',
		image:  'Seal_of_the_Four_Gods.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{ name: 'SG Radar', image: 'SG_Radar.png', type: type.A, rarity: rarity.SR },
	{ name: 'SG Radar', image: 'SG_Radar.png', type: type.A, rarity: rarity.E },
	{
		name:   'Repair Toolkit',
		image:  'Repair_Toolkit.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{
		name:   'Steam Catapult',
		image:  'Steam_Catapult.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{ name: 'Steam Catapult', image: 'Steam_Catapult.png', type: type.A, rarity: rarity.E },
	{
		name:   'Super Heavy Shell',
		image:  'Super_Heavy_Shell.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{ name: 'Team Emblem', image: 'Team_Emblem.png', type: type.A, rarity: rarity.SR },
	{
		name:   'Type 1 Piercing Shell',
		image:  'Type_1_Piercing_Shell.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{
		name:   'Certificate of Sponsorship',
		image:  'Certificate_of_Sponsorship.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{
		name:   'VH Armor Plating',
		image:  'VH_Armor_Plating.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{
		name:   'Washington Naval Treaty',
		image:  'Washington_Naval_Treaty.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{
		name:   'White-Hot Verheerender',
		image:  'White-Hot_Verheerender.png',
		type:   type.A,
		rarity: rarity.SR
	},
	{
		name:   '100/150 Aviation Fuel',
		image:  '100150_Aviation_Fuel.png',
		type:   type.A,
		rarity: rarity.E
	},
	{ name: 'Air Radar', image: 'Air_Radar.png', type: type.A, rarity: rarity.E },
	{
		name:   'Anti-Torpedo Bulge',
		image:  'Anti-Torpedo_Bulge.png',
		type:   type.A,
		rarity: rarity.E
	},
	{ name: 'Autoloader', image: 'Autoloader.png', type: type.A, rarity: rarity.E },
	{
		name:   'Compressed Oxygen Cylinder',
		image:  'Compressed_Oxygen_Cylinder.png',
		type:   type.A,
		rarity: rarity.E
	},
	{
		name:   'PBY-5A Catalina',
		image:  'PBY-5A_Catalina.png',
		type:   type.A,
		rarity: rarity.E
	},
	{
		name:   'Aviation Oil Tank',
		image:  'Aviation_Oil_Tank.png',
		type:   type.A,
		rarity: rarity.E
	},
	{
		name:   'Fire Control Radar',
		image:  'Fire_Control_Radar.png',
		type:   type.A,
		rarity: rarity.E
	},
	{ name: 'Fuel Filter', image: 'Fuel_Filter.png', type: type.A, rarity: rarity.E },
	{ name: 'Gyroscope', image: 'Gyroscope.png', type: type.A, rarity: rarity.E },
	{ name: 'Homing Beacon', image: 'Homing_Beacon.png', type: type.A, rarity: rarity.E },
	{
		name:   'Advanced Boiler',
		image:  'Advanced_Boiler.png',
		type:   type.A,
		rarity: rarity.E
	},
	{
		name:   'Intel Report - Arctic Stronghold',
		image:  'Intel_Report_-_Arctic_Stronghold.png',
		type:   type.A,
		rarity: rarity.E
	},
	{
		name:   'NY City Coast Recon Report',
		image:  'NY_City_Coast_Recon_Report.png',
		type:   type.A,
		rarity: rarity.E
	},
	{
		name:   'Marinière Camouflage',
		image:  'Mariniere_Camouflage.png',
		type:   type.A,
		rarity: rarity.E
	},
	{
		name:   'Pressure-Resistant Hull Design',
		image:  'Pressure-Resistant_Hull_Design.png',
		type:   type.A,
		rarity: rarity.E
	},
	{ name: 'Repair Tools', image: 'Repair_Tools.png', type: type.A, rarity: rarity.E },
	{
		name:   'Type 91 Piercing Shell',
		image:  'Type_91_Piercing_Shell.png',
		type:   type.A,
		rarity: rarity.E
	},
	{
		name:   'Type 94 AA Device',
		image:  'Type_94_AA_Device.png',
		type:   type.A,
		rarity: rarity.E
	},
	{
		name:   'Type 98 Delayed Firing Device',
		image:  'Type_98_Delayed_Firing_Device.png',
		type:   type.A,
		rarity: rarity.E
	},
	{
		name:   'VC Armor Plating',
		image:  'VC_Armor_Plating.png',
		type:   type.A,
		rarity: rarity.E
	},
	{
		name:   'Fire Suppressor',
		image:  'Fire_Suppressor.png',
		type:   type.A,
		rarity: rarity.R
	},
	{
		name:   'Hydraulic Steering Gear',
		image:  'Hydraulic_Steering_Gear.png',
		type:   type.A,
		rarity: rarity.R
	},
	{
		name:   'Navy Camouflage',
		image:  'Navy_Camouflage.png',
		type:   type.A,
		rarity: rarity.R
	},
	//endregion
	//region Cargo
	{
		name:   '40cm Type 94 Naval Gun Parts (Cargo)',
		image:  '40cm_Type_94_Naval_Gun_Parts_Cargo.png',
		type:   type.C,
		rarity: rarity.SR
	},
	{
		name:   'Aviation Materials (Cargo)',
		image:  'Aviation_Materials_Cargo.png',
		type:   type.C,
		rarity: rarity.SR
	},
	{
		name:   'Small-Caliber Naval Gun Parts (Cargo)',
		image:  'Small-Caliber_Naval_Gun_Parts_Cargo.png',
		type:   type.C,
		rarity: rarity.SR
	},
	{
		name:   'Torpedo Materials (Cargo)',
		image:  'Torpedo_Materials_Cargo.png',
		type:   type.C,
		rarity: rarity.SR
	}
	//endregion
	// { name: '', image: '', type: type., rarity: rarity.SR },
];

const acc: { [ type: number ]: number } = {};
export const { equips, map } = equipment.reduce( ( obj, item ) => {
	acc[ item.type ] = ( acc[ item.type ] || 0 ) + 1;
	const index = item.type * 100 + acc[ item.type ];
	obj.equips[ index ] = item;
	obj.map[ item.name + '/' + rarity[ item.rarity ] ] = index;
	return obj;
}, { equips: {}, map: {} } as {
	equips: { [ index: number ]: { name: string, image: string, type: type, rarity: rarity } }
	map: { [ name: string ]: number }
} );

// 0 - ★★★★★
// 1 - ✮✮✮✮✮
// 2 - ☆☆☆☆☆
// 3 - ✦✦✦✦✦
// 4 - ✧✧✧✧✧
// ⊝⊝⊝⊝⊝
export const tier = {
	'T':         {
		[ map[ 'Quintuple 533mm Magnetic Torpedo/UR' ] ]:   0,
		[ map[ 'Quadruple 533mm Magnetic Torpedo/SR' ] ]:   0,
		[ map[ '533mm Quintuple Torpedo Mount Mk17/SR' ] ]: 0,
		[ map[ 'Quintuple 533mm Torpedo/SR' ] ]:            1,
		[ map[ '533mm Quintuple Torpedo Mount MkIX/SR' ] ]: 1,
		[ map[ 'Quadruple 610mm Torpedo/SR' ] ]:            1,
		[ map[ '533mm Quintuple Torpedo Mount Mk17/E' ] ]:  2,
		[ map[ '533mm Quadruple Torpedo Mount MkIX/E' ] ]:  2,
		[ map[ 'Quadruple 533mm Torpedo/SR' ] ]:            2,
		[ map[ 'Quintuple 533mm Torpedo/E' ] ]:             3,
		[ map[ 'Quadruple 610mm Torpedo/E' ] ]:             3
	},
	'AA/Damage': {
		[ map[ 'Sextuple Bofors 40mm AA Gun/SR' ] ]:              0,
		[ map[ '134mm Twin High-Angle Gun/SR' ] ]:                0,
		[ map[ 'Twin 113mm AA Gun/SR' ] ]:                        0,
		[ map[ 'Octuple 40mm Pom Pom Gun/SR' ] ]:                 1,
		[ map[ 'Twin 105mm SK C/33 na Anti-Air Gun Mount/SR' ] ]: 1,
		[ map[ '100mm Mounted AA Gun/SR' ] ]:                     1,
		[ map[ '127mm Type 89 High-Angle Gun/SR' ] ]:             2,
		[ map[ 'Twin 105mm AA Gun (SK C)/SR' ] ]:                 2,
		[ map[ 'Quadruple 40mm Bofors Gun/SR' ] ]:                2,
		[ map[ 'Quadruple 40mm Bofors Gun/E' ] ]:                 3,
		[ map[ 'Octuple 40mm Pom Pom Gun/E' ] ]:                  3
	},
	'AA':        {
		[ map[ 'Sextuple Bofors 40mm AA Gun/SR' ] ]:              0,
		[ map[ 'Quadruple 40mm Bofors Gun/SR' ] ]:                0,
		[ map[ 'Twin 76mm Rapid Fire Gun Mount Mk27/SR' ] ]:      0,
		[ map[ 'Octuple 40mm Pom Pom Gun/SR' ] ]:                 1,
		[ map[ 'Twin 105mm SK C/33 na Anti-Air Gun Mount/SR' ] ]: 1,
		[ map[ 'Prototype 40mm AA Gun (Type 5)/SR' ] ]:           1,
		[ map[ '100mm Mounted AA Gun/SR' ] ]:                     1,
		[ map[ 'Twin 105mm AA Gun (SK C)/SR' ] ]:                 2,
		[ map[ 'Single 90mm High-Angle Gun (M1939)/SR' ] ]:       2,
		[ map[ 'Twin 113mm AA Gun/SR' ] ]:                        2,
		[ map[ 'Quadruple 40mm Bofors Gun/E' ] ]:                 3,
		[ map[ 'Octuple 40mm Pom Pom Gun/E' ] ]:                  3
	},
	'AA/Speed':  {
		[ map[ '25mm Type 96 Triple AT/AA Gun/SR' ] ]:       0,
		[ map[ 'Twin 76mm Rapid Fire Gun Mount Mk27/SR' ] ]: 0,
		[ map[ 'Prototype 40mm AA Gun (Type 5)/SR' ] ]:      0,
		[ map[ 'Quadruple 40mm Bofors Gun/SR' ] ]:           1,
		[ map[ 'Twin 37mm AA Gun (Mle 1936)/SR' ] ]:         1,
		[ map[ '134mm Twin High-Angle Gun/SR' ] ]:           2,
		[ map[ 'Single 90mm High-Angle Gun (M1939)/SR' ] ]:  2,
		[ map[ 'Quadruple 40mm Bofors Gun/E' ] ]:            3
	},
	'AA/Main':   {
		[ map[ 'Twin 40mm Bofors STAAG/SR' ] ]:                   0,
		[ map[ 'Twin 40mm Bofors "Hazemeyer" AA Gun/SR' ] ]:      0,
		[ map[ 'Sextuple Bofors 40mm AA Gun/SR' ] ]:              1,
		[ map[ 'Quadruple 40mm Bofors Gun/SR' ] ]:                1,
		[ map[ 'Twin 76mm Rapid Fire Gun Mount Mk27/SR' ] ]:      1,
		[ map[ 'Octuple 40mm Pom Pom Gun/SR' ] ]:                 2,
		[ map[ 'Twin 105mm SK C/33 na Anti-Air Gun Mount/SR' ] ]: 2,
		[ map[ 'Prototype 40mm AA Gun (Type 5)/SR' ] ]:           2,
		[ map[ '100mm Mounted AA Gun/SR' ] ]:                     2,
		[ map[ 'Quadruple 40mm Bofors Gun/E' ] ]:                 3
	},
	
	'DD':          {
		[ map[ 'Twin 130mm Main Gun (B-2LM)/SR' ] ]:                  0,
		[ map[ 'Single 138.6mm Main Gun (Mle 1929)/SR' ] ]:           0,
		[ map[ 'Twin 114mm DP (4.5" MK IV)/SR' ] ]:                   0,
		[ map[ 'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount/SR' ] ]: 1,
		[ map[ 'Twin 120mm Dual-Purpose Gun Mount MkXI/SR' ] ]:       1,
		[ map[ 'Twin 127mm MK12 Dual Gun/SR' ] ]:                     1,
		[ map[ 'Single 138.6mm Main Gun (Mle 1927)/E' ] ]:            2,
		[ map[ 'Twin 120mm Main Gun/E' ] ]:                           2,
		[ map[ 'Single 130mm Main Gun/E' ] ]:                         3,
		[ map[ 'Single 138.6mm Main Gun (Mle 1929)/E' ] ]:            3,
		[ map[ 'Single 127mm Main Gun/E' ] ]:                         3,
		[ map[ 'Twin 127mm MK12 Dual Gun/E' ] ]:                      3
	},
	'DD/Speed':    {
		[ map[ 'Twin 114mm DP (4.5" MK IV)/SR' ] ]:         0,
		[ map[ 'Twin 130mm Main Gun (B-2LM)/SR' ] ]:        0,
		[ map[ 'Single 138.6mm Main Gun (Mle 1929)/SR' ] ]: 0,
		[ map[ 'Twin 100mm (Type 98) AA Gun/SR' ] ]:        1,
		[ map[ 'Single 127mm Main Gun/E' ] ]:               2,
		[ map[ 'Twin 100mm (Type 98) AA Gun/E' ] ]:         2,
		[ map[ 'Twin 127mm MK12 Dual Gun/E' ] ]:            3,
		[ map[ 'Single 130mm Main Gun/E' ] ]:               3
	},
	'DD/SSpeed':   {
		[ map[ 'Twin 114mm DP (4.5" MK IV)/SR' ] ]:  0,
		[ map[ 'Twin 100mm (Type 98) AA Gun/SR' ] ]: 0,
		[ map[ '76mm AA Gun/R' ] ]:                  1,
		[ map[ 'Single 120mm Main Gun/R' ] ]:        1
	},
	'DD/SSSpeed':  {
		[ map[ '76mm AA Gun/R' ] ]:                  0,
		[ map[ 'Single 120mm Main Gun/R' ] ]:        0,
		[ map[ 'Twin 114mm DP (4.5" MK IV)/SR' ] ]:  1,
		[ map[ 'Twin 100mm (Type 98) AA Gun/SR' ] ]: 1
	},
	'DD/AP':       {
		[ map[ 'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount/SR' ] ]: 0,
		[ map[ 'Twin 114mm DP (4.5" MK IV)/SR' ] ]:                   1,
		[ map[ 'Twin 130mm Main Gun (B-2LM)/SR' ] ]:                  1,
		[ map[ 'Single 138.6mm Main Gun (Mle 1929)/SR' ] ]:           1,
		[ map[ 'Twin 128mm Dual Gun (SK C/41)/E' ] ]:                 2,
		[ map[ 'Twin 100mm (Type 98) AA Gun/SR' ] ]:                  2,
		[ map[ 'Single 127mm Main Gun/E' ] ]:                         3
	},
	'CL/DD':       {
		[ map[ 'Twin 114mm DP (4.5" MK IV)/SR' ] ]:         0,
		[ map[ 'Twin 130mm Main Gun (B-2LM)/SR' ] ]:        0,
		[ map[ 'Single 138.6mm Main Gun (Mle 1929)/SR' ] ]: 0,
		[ map[ 'Twin 100mm (Type 98) AA Gun/SR' ] ]:        1,
		[ map[ 'Single 127mm Main Gun/E' ] ]:               2,
		[ map[ 'Twin 100mm (Type 98) AA Gun/E' ] ]:         2,
		[ map[ 'Twin 127mm MK12 Dual Gun/E' ] ]:            3,
		[ map[ 'Single 130mm Main Gun/E' ] ]:               3
	},
	'CL/DD/Speed': {
		[ map[ 'Twin 114mm DP (4.5" MK IV)/SR' ] ]:         0,
		[ map[ 'Twin 130mm Main Gun (B-2LM)/SR' ] ]:        0,
		[ map[ 'Single 138.6mm Main Gun (Mle 1929)/SR' ] ]: 0,
		[ map[ 'Twin 100mm (Type 98) AA Gun/SR' ] ]:        1,
		[ map[ 'Single 127mm Main Gun/E' ] ]:               2,
		[ map[ 'Twin 100mm (Type 98) AA Gun/E' ] ]:         2,
		[ map[ 'Twin 127mm MK12 Dual Gun/E' ] ]:            3,
		[ map[ 'Single 130mm Main Gun/E' ] ]:               3
	},
	'T/DD':        {
		[ map[ 'Twin 130mm Main Gun (B-2LM)/SR' ] ]:                  0,
		[ map[ 'Single 138.6mm Main Gun (Mle 1929)/SR' ] ]:           0,
		[ map[ 'Twin 114mm DP (4.5" MK IV)/SR' ] ]:                   0,
		[ map[ 'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount/SR' ] ]: 1,
		[ map[ 'Twin 120mm Dual-Purpose Gun Mount MkXI/SR' ] ]:       1,
		[ map[ 'Twin 127mm MK12 Dual Gun/SR' ] ]:                     1,
		[ map[ 'Single 138.6mm Main Gun (Mle 1927)/E' ] ]:            2,
		[ map[ 'Twin 120mm Main Gun/E' ] ]:                           2,
		[ map[ 'Single 130mm Main Gun/E' ] ]:                         3,
		[ map[ 'Single 138.6mm Main Gun (Mle 1929)/E' ] ]:            3,
		[ map[ 'Single 127mm Main Gun/E' ] ]:                         3,
		[ map[ 'Twin 127mm MK12 Dual Gun/E' ] ]:                      3
	},
	'DD/Aux':      {
		[ map[ 'Twin 100mm (Type 98) AA Gun/SR' ] ]:                  0,
		[ map[ 'Twin 114mm DP (4.5" MK IV)/SR' ] ]:                   0,
		[ map[ 'Twin 130mm Main Gun (B-2LM)/SR' ] ]:                  0,
		[ map[ 'Single 138.6mm Main Gun (Mle 1929)/SR' ] ]:           1,
		[ map[ 'Twin 100mm (Type 98) AA Gun/E' ] ]:                   1,
		[ map[ 'Twin 120mm Dual-Purpose Gun Mount MkXI/SR' ] ]:       2,
		[ map[ 'Single 138.6mm Main Gun (Mle 1929)/E' ] ]:            2,
		[ map[ 'Twin 120mm Main Gun/E' ] ]:                           2,
		[ map[ 'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount/SR' ] ]: 3,
		[ map[ 'Twin 127mm MK12 Dual Gun/E' ] ]:                      3
	},
	'DD/Main':     {
		[ map[ 'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount/SR' ] ]: 0,
		[ map[ 'Twin 130mm Main Gun (B-2LM)/SR' ] ]:                  0,
		[ map[ 'Twin 127mm Secondary Gun Mount/E' ] ]:                1,
		[ map[ 'Twin 128mm Dual Gun (SK C/41)/E' ] ]:                 2,
		[ map[ 'Twin 120mm Main Gun/E' ] ]:                           2
	},
	'DD/Sub':      {
		[ map[ 'Twin 100mm (Type 98) AA Gun/SR' ] ]: 0,
		[ map[ 'Twin 127mm MK12 Dual Gun/SR' ] ]:    0,
		[ map[ 'Twin 120mm Main Gun/E' ] ]:          1,
		[ map[ 'Twin 100mm (Type 98) AA Gun/E' ] ]:  1
	},
	
	'CL':         {
		[ map[ 'Prototype Triple 152mm Main Gun (DP MK17)/SR' ] ]: 0,
		[ map[ 'Triple 152mm Main Gun (B-38 MK5)/SR' ] ]:          0,
		[ map[ 'Prototype Triple 152mm Main Gun/SR' ] ]:           1,
		[ map[ 'Triple 152mm Main Gun Mount Mk16/SR' ] ]:          1,
		[ map[ 'Triple 152mm Main Gun (B-38 MK5)/E' ] ]:           1,
		[ map[ 'Triple 155mm Mounted Gun/SR' ] ]:                  2,
		[ map[ 'Twin 150mm Main Gun (TbtsK C/36)/E' ] ]:           2,
		[ map[ 'Triple 155mm Mounted Gun/E' ] ]:                   3,
		[ map[ 'Single 150mm Main Gun (SK C/28)/E' ] ]:            3
	},
	'CL/AP':      {
		[ map[ 'Prototype Triple 152mm Main Gun/SR' ] ]: 0,
		[ map[ 'Single 150mm Main Gun (SK C/28)/E' ] ]:  1,
		[ map[ 'Twin 150mm Main Gun (TbtsK C/36)/E' ] ]: 2
	},
	'CL/DD/Main': {
		[ map[ 'Prototype Triple 152mm Main Gun/SR' ] ]:  0,
		[ map[ 'Twin 152mm Main Gun/E' ] ]:               0,
		[ map[ 'Twin 150mm Main Gun (TbtsK C/36)/E' ] ]:  0,
		[ map[ 'Triple 152mm Main Gun Mount Mk16/SR' ] ]: 1,
		[ map[ 'Triple 152mm Main Gun2/E' ] ]:            1,
		[ map[ 'Triple 155mm Mounted Gun/SR' ] ]:         2,
		[ map[ 'Triple 152mm Main Gun/E' ] ]:             2
	},
	'CL/AA':      {
		[ map[ 'Prototype Triple 152mm Main Gun (DP MK17)/SR' ] ]: 0,
		[ map[ 'Triple 152mm Main Gun (B-38 MK5)/SR' ] ]:          0,
		[ map[ 'Prototype Triple 152mm Main Gun/SR' ] ]:           1,
		[ map[ 'Triple 152mm Main Gun (B-38 MK5)/E' ] ]:           1,
		[ map[ 'Twin 150mm Main Gun (TbtsK C/36)/E' ] ]:           2,
		[ map[ '25mm Type 96 Triple AT/AA Gun/SR' ] ]:             3,
		[ map[ 'Twin 76mm Rapid Fire Gun Mount Mk27/SR' ] ]:       3,
		[ map[ 'Quadruple 40mm Bofors Gun/SR/SR' ] ]:              3,
		[ map[ 'Quadruple 40mm Bofors Gun/E' ] ]:                  4
	},
	
	'CA':          {
		[ map[ 'Prototype Triple 234mm Main Gun (9.2" MK XII)/UR' ] ]: 0,
		[ map[ 'Prototype Twin 234mm Main Gun (9.2" MK XII)/SR' ] ]:   0,
		[ map[ 'Triple 203mm Main Gun Mount Mk15/SR' ] ]:              0,
		[ map[ 'Prototype Triple 203mm Main Gun (SK C)/SR' ] ]:        0,
		[ map[ 'Twin 203mm Main Gun (SK C)/SR' ] ]:                    1,
		[ map[ 'Twin 203mm Main Gun (Mle 1924)/SR' ] ]:                2,
		[ map[ 'Prototype Triple 203mm Main Gun Mount Mk IX/SR' ] ]:   2,
		[ map[ 'Prototype 203mm (Type 3) Mounted Gun/SR' ] ]:          2,
		[ map[ 'Prototype Triple 203mm AA Gun/SR' ] ]:                 2,
		[ map[ 'Twin 203mm Main Gun (SK C)/E' ] ]:                     3,
		[ map[ '203mm Mounted Gun/E' ] ]:                              3
	},
	'CA/HE':       {
		[ map[ 'Twin 203mm Main Gun (Mle 1924)/SR' ] ]:              0,
		[ map[ 'Prototype Triple 203mm Main Gun Mount Mk IX/SR' ] ]: 1,
		[ map[ 'Prototype 203mm (Type 3) Mounted Gun/SR' ] ]:        2,
		[ map[ 'Prototype Triple 203mm AA Gun/SR' ] ]:               2,
		[ map[ '203mm Mounted Gun/E' ] ]:                            3
	},
	'CA/Modified': {
		[ map[ 'Prototype Triple 234mm Main Gun (9.2" MK XII)/UR' ] ]: 0,
		[ map[ 'Prototype Triple 203mm Main Gun (SK C)/SR' ] ]:        0,
		[ map[ 'Twin 203mm Main Gun (SK C)/SR' ] ]:                    1,
		[ map[ 'Twin 203mm Main Gun (SK C)/E' ] ]:                     2
	},
	'CA/BB':       {
		[ map[ 'Prototype Triple 234mm Main Gun (9.2" MK XII)/UR' ] ]: 0,
		[ map[ 'Prototype Twin 234mm Main Gun (9.2" MK XII)/SR' ] ]:   0,
		[ map[ 'Triple 203mm Main Gun Mount Mk15/SR' ] ]:              0,
		[ map[ 'Triple 283mm Main Gun (SK C/28)/E' ] ]:                1,
		[ map[ 'Twin 203mm Main Gun (Mle 1924)/SR' ] ]:                2,
		[ map[ 'Prototype Triple 203mm Main Gun Mount Mk IX/SR' ] ]:   2,
		[ map[ 'Prototype 203mm (Type 3) Mounted Gun/SR' ] ]:          3,
		[ map[ 'Prototype Triple 203mm AA Gun/SR' ] ]:                 3,
		[ map[ 'Twin 203mm Main Gun (SK C)/E' ] ]:                     3,
		[ map[ '203mm Mounted Gun/E' ] ]:                              3
	},
	'CA/CL':       {
		[ map[ 'Prototype Triple 234mm Main Gun (9.2" MK XII)/UR' ] ]: 0,
		[ map[ 'Prototype Twin 234mm Main Gun (9.2" MK XII)/SR' ] ]:   0,
		[ map[ 'Triple 203mm Main Gun Mount Mk15/SR' ] ]:              0,
		[ map[ 'Prototype Triple 203mm Main Gun (SK C)/SR' ] ]:        0,
		[ map[ 'Twin 203mm Main Gun (SK C)/SR' ] ]:                    1,
		[ map[ 'Twin 203mm Main Gun (Mle 1924)/SR' ] ]:                2,
		[ map[ 'Prototype Triple 203mm Main Gun Mount Mk IX/SR' ] ]:   2,
		[ map[ 'Prototype 203mm (Type 3) Mounted Gun/SR' ] ]:          2,
		[ map[ 'Prototype Triple 203mm AA Gun/SR' ] ]:                 2,
		[ map[ 'Twin 203mm Main Gun (SK C)/E' ] ]:                     3,
		[ map[ '203mm Mounted Gun/E' ] ]:                              3
	},
	'CA/CB':       {
		[ map[ 'Prototype Triple 310mm Main Gun (Type 0)/SR' ] ]: 0,
		[ map[ 'Triple 283mm Main Gun (SK C/28)/E' ] ]:           1
	},
	
	'BB/Damage':   {
		[ map[ 'Prototype Triple 381mm AA Gun/SR' ] ]:           0,
		[ map[ 'Prototype Twin 457mm Main Gun (18" MKA)/UR' ] ]: 0,
		[ map[ 'Triple 406mm MK6 Main Gun/E' ] ]:                1,
		[ map[ 'Prototype Triple 406mm/50 Main Gun/SR' ] ]:      2,
		[ map[ 'Prototype Triple 410mm Mounted Gun/SR' ] ]:      2
	},
	'BB':          {
		[ map[ 'Prototype Triple 381mm AA Gun/SR' ] ]:             0,
		[ map[ 'Triple 406mm MK6 Main Gun/E' ] ]:                  1,
		[ map[ 'Prototype Twin 406mm Main Gun (SK C/34)/SR' ] ]:   2,
		[ map[ 'Prototype Triple 305mm Main Gun (SK C/39)/SR' ] ]: 2,
		[ map[ 'Prototype Twin 457mm Main Gun (18" MKA)/UR' ] ]:   3,
		[ map[ 'Prototype Triple 406mm/50 Main Gun/SR' ] ]:        3
	},
	'BB/Speed':    {
		[ map[ 'Prototype Twin 406mm Main Gun (SK C/34)/SR' ] ]:   0,
		[ map[ 'Prototype Triple 305mm Main Gun (SK C/39)/SR' ] ]: 0,
		[ map[ 'Prototype Twin 457mm Main Gun (18" MKA)/UR' ] ]:   0,
		[ map[ 'Twin 381mm Advanced Main Gun/SR' ] ]:              1,
		[ map[ '410mm Mounted Gun/E' ] ]:                          2,
		[ map[ 'Twin 380mm Main Gun (SK C)/SR' ] ]:                3,
		[ map[ 'Twin 406mm Main Gun Mount Mk8/E' ] ]:              3
	},
	'BB/Modified': {
		[ map[ 'Prototype Twin 457mm Main Gun (18" MKA)/UR' ] ]:  0,
		[ map[ 'Prototype Triple 406mm/50 Main Gun/SR' ] ]:       1,
		[ map[ 'Triple 406mm Main Gun/SR' ] ]:                    1,
		[ map[ 'Prototype Triple 410mm Mounted Gun/SR' ] ]:       2,
		[ map[ 'rototype Triple 406mm Main Gun Mount MkD/SR' ] ]: 2,
		[ map[ 'Triple 406mm MK6 Main Gun/E' ] ]:                 3
	},
	
	'F': {
		[ map[ 'F7F Tigercat/SR' ] ]:                          0,
		[ map[ 'Sea Hornet/SR' ] ]:                            0,
		[ map[ 'F4U (VF-17 "Pirate" Squad)/SR' ] ]:            1,
		[ map[ 'F6F Hellcat/SR' ] ]:                           1,
		[ map[ 'Kawanishi N1K3-A Shiden Kai 2/SR' ] ]:         2,
		[ map[ 'A7M Reppuu/SR' ] ]:                            2,
		[ map[ 'Sea Fury/SR' ] ]:                              2,
		[ map[ 'Seafang/SR' ] ]:                               2,
		[ map[ 'F4U Corsair/E' ] ]:                            3,
		[ map[ 'A7M Reppuu/E' ] ]:                             3,
		[ map[ 'F6F Hellcat/E' ] ]:                            3,
		[ map[ 'Seafang/E' ] ]:                                3,
		[ map[ 'F8F Bearcat/SR' ] ]:                           4,
		[ map[ 'A6M5 Zero/SR' ] ]:                             4,
		[ map[ 'Seafire FR.47/SR' ] ]:                         4,
		[ map[ 'Brewster F2A Buffalo (Thach Squadron)/SR' ] ]: 4,
		[ map[ 'Messerschmitt Me-155A/SR' ] ]:                 4
	},
	
	'DB': {
		[ map[ 'Experimental XSB3C-1/SR' ] ]:              0,
		[ map[ 'SB2C Helldiver/E' ] ]:                     1,
		[ map[ 'Suisei Model 12A/SR' ] ]:                  1,
		[ map[ 'Ju-87C Dive Bomber/E' ] ]:                 2,
		[ map[ 'Fairey Firefly/SR' ] ]:                    2,
		[ map[ 'Comet/SR' ] ]:                             2,
		[ map[ 'SBD Dauntless (McClusky Division)/SR' ] ]: 3,
		[ map[ 'BTD-1 Destroyer/SR' ] ]:                   3,
		[ map[ 'Fairey Barracuda (831 Squadron)/SR' ] ]:   3
	},
	
	'TB': {
		[ map[ 'Wyvern/UR' ] ]:                       0,
		[ map[ 'XBT2D-1 Destroyer II/SR' ] ]:         0,
		[ map[ 'Aichi B7A Ryusei/SR' ] ]:             0,
		[ map[ 'Ju-87 D-4/SR' ] ]:                    0,
		[ map[ 'Tenzan Kai/E' ] ]:                    1,
		[ map[ 'TBM Avenger (VT-18 Squadron)/SR' ] ]: 1,
		[ map[ 'Barracuda/SR' ] ]:                    1,
		[ map[ 'Aichi B7A Ryusei/E' ] ]:              2,
		[ map[ 'Nakajima B6N Tenzan/E' ] ]:           2,
		[ map[ 'Barracuda/SR' ] ]:                    2,
		[ map[ 'Swordfish (818 Squad)/SR' ] ]:        3,
		[ map[ 'Fairey Albacore/E' ] ]:               3
	},
	
	'DB/TB': {
		[ map[ 'Experimental XSB3C-1/SR' ] ]:         0,
		[ map[ 'SB2C Helldiver/E' ] ]:                0,
		[ map[ 'Suisei Model 12A/SR' ] ]:             0,
		[ map[ 'Ju-87C Dive Bomber/E' ] ]:            1,
		[ map[ 'Fairey Firefly/SR' ] ]:               1,
		[ map[ 'Comet/SR' ] ]:                        1,
		[ map[ 'Wyvern/UR' ] ]:                       2,
		[ map[ 'XBT2D-1 Destroyer II/SR' ] ]:         2,
		[ map[ 'Aichi B7A Ryusei/SR' ] ]:             2,
		[ map[ 'Ju-87 D-4/SR' ] ]:                    2,
		[ map[ 'Tenzan Kai/E' ] ]:                    3,
		[ map[ 'TBM Avenger (VT-18 Squadron)/SR' ] ]: 3,
		[ map[ 'Barracuda/SR' ] ]:                    3
	},
	
	'CL/DB': {
		[ map[ 'Prototype Triple 152mm Main Gun/SR' ] ]:  0,
		[ map[ 'Twin 152mm Main Gun/E' ] ]:               0,
		[ map[ 'Twin 150mm Main Gun (TbtsK C/36)/E' ] ]:  0,
		[ map[ 'Triple 152mm Main Gun Mount Mk16/SR' ] ]: 1,
		[ map[ 'Triple 152mm Main Gun2/E' ] ]:            1,
		[ map[ 'Experimental XSB3C-1/SR' ] ]:             2,
		[ map[ 'SB2C Helldiver/E' ] ]:                    2,
		[ map[ 'Suisei Model 12A/SR' ] ]:                 2,
		[ map[ 'Ju-87C Dive Bomber/E' ] ]:                3,
		[ map[ 'Fairey Firefly/SR' ] ]:                   3,
		[ map[ 'Comet/SR' ] ]:                            3
	},
	
	'P': {
		[ map[ 'Wyvern/UR' ] ]:                     0,
		[ map[ 'F7F Tigercat/SR' ] ]:               0,
		[ map[ 'Sea Hornet/SR' ] ]:                 0,
		[ map[ 'F4U (VF-17 "Pirate" Squad)/SR' ] ]: 1,
		[ map[ 'F6F Hellcat/SR' ] ]:                1,
		[ map[ 'Experimental XSB3C-1/SR' ] ]:       2,
		[ map[ 'SB2C Helldiver/E' ] ]:              2,
		[ map[ 'Aichi B7A Ryusei/SR' ] ]:           3
	},
	
	'SP': {
		[ map[ 'Suisei Model 21/SR' ] ]:        0,
		[ map[ 'Seiran/E' ] ]:                  1,
		[ map[ 'Aichi E16A Zuiun/E' ] ]:        2,
		[ map[ 'N1K1 Kyoufuu/E' ] ]:            3,
		[ map[ 'Type 2 Seaplane Fighter/E' ] ]: 3
	},
	
	'SSP': {
		[ map[ 'Seiran/E' ] ]:           0,
		[ map[ 'Aichi E16A Zuiun/E' ] ]: 1
	},
	
	'ST': {
		[ map[ 'Mark 20 "Bidder" Submarine Torpedo/SR' ] ]: 0,
		[ map[ 'G7e Acoustic Guided Torpedo/SR' ] ]:        0,
		[ map[ 'Mark 16 Submarine Torpedo/SR' ] ]:          0,
		[ map[ 'Type 96 Submarine Torpedo/SR' ] ]:          1,
		[ map[ 'Mark 28 Submarine Torpedo/SR' ] ]:          1,
		[ map[ 'Type 95 Submarine Torpedo/SR' ] ]:          1,
		[ map[ 'Mark 12 "Ferry" Submarine Torpedo/SR' ] ]:  1,
		[ map[ 'G7e Acoustic Guided Torpedo/E' ] ]:         2,
		[ map[ 'G7a Submarine Torpedo/E' ] ]:               2,
		[ map[ 'Mark 16 Submarine Torpedo/E' ] ]:           2,
		[ map[ 'Type 95 Submarine Torpedo/E' ] ]:           2
	},
	
	'SS': {
		[ map[ 'Submarine-mounted Twin 203mm Cannon (Mle 1924)/R' ] ]: 0
	},
	
	'A/DD1':   {
		[ map[ 'Repair Tools/E' ] ]: 0
	},
	'A/DD2':   {
		[ map[ 'Intel Report - Arctic Stronghold/E' ] ]:          0,
		[ map[ 'High Performance Hydraulic Steering Gear/SR' ] ]: 1,
		[ map[ 'Repair Tools/E' ] ]:                              1,
		[ map[ 'Fire Suppressor/R' ] ]:                           2,
		[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]:              2
	},
	'A/DD1/T': {
		[ map[ 'Repair Tools/E' ] ]:                 0,
		[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]: 1
	},
	'A/DD2/T': {
		[ map[ 'Repair Tools/E' ] ]:                 0,
		[ map[ 'Fire Suppressor/R' ] ]:              1,
		[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]: 1
	},
	'A/CL1':   {
		[ map[ 'Beaver Squad Tag/SR' ] ]: 0,
		[ map[ 'Repair Tools/E' ] ]:      0
	},
	'A/CL2':   {
		[ map[ 'High Performance Hydraulic Steering Gear/SR' ] ]: 0,
		[ map[ 'Hydraulic Steering Gear/R' ] ]:                   1,
		[ map[ 'Navy Camouflage/R' ] ]:                           1
	},
	'A/CL1/T': {
		[ map[ 'Beaver Squad Tag/SR' ] ]:            0,
		[ map[ 'Repair Tools/E' ] ]:                 0,
		[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]: 1
	},
	'A/CL2/T': {
		[ map[ 'High Performance Hydraulic Steering Gear/SR' ] ]: 0,
		[ map[ 'Hydraulic Steering Gear/R' ] ]:                   1,
		[ map[ 'Navy Camouflage/R' ] ]:                           1,
		[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]:              2
	},
	'A/CA1':   {
		[ map[ 'Beaver Squad Tag/SR' ] ]: 0,
		[ map[ 'Repair Tools/E' ] ]:      0,
		[ map[ 'Cosmic Kicks/SR' ] ]:     1
	},
	'A/CA2':   {
		[ map[ 'High Performance Hydraulic Steering Gear/SR' ] ]: 0,
		[ map[ 'Hydraulic Steering Gear/R' ] ]:                   1,
		[ map[ 'Navy Camouflage/R' ] ]:                           1
	},
	'A/CA1/T': {
		[ map[ 'Beaver Squad Tag/SR' ] ]:            0,
		[ map[ 'Repair Tools/E' ] ]:                 0,
		[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]: 1
	},
	'A/CA2/T': {
		[ map[ 'High Performance Hydraulic Steering Gear/SR' ] ]: 0,
		[ map[ 'Hydraulic Steering Gear/R' ] ]:                   1,
		[ map[ 'Navy Camouflage/R' ] ]:                           1,
		[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]:              2
	},
	'A/CB1':   {
		[ map[ 'VH Armor Plating/SR' ] ]: 0,
		[ map[ 'Beaver Squad Tag/SR' ] ]: 0,
		[ map[ 'Repair Tools/E' ] ]:      0,
		[ map[ 'Cosmic Kicks/SR' ] ]:     1
	},
	'A/CB2':   {
		[ map[ 'High Performance Hydraulic Steering Gear/SR' ] ]: 0,
		[ map[ 'Hydraulic Steering Gear/R' ] ]:                   1,
		[ map[ 'Navy Camouflage/R' ] ]:                           1
	},
	'A/BB1':   {
		[ map[ 'Type 1 Piercing Shell/SR' ] ]: 0,
		[ map[ 'SG Radar/SR' ] ]:              1,
		[ map[ 'Type 91 Piercing Shell/E' ] ]: 2
	},
	'A/BB2':   {
		[ map[ 'Super Heavy Shell/SR' ] ]:                0,
		[ map[ 'High Standard Fire-Control Radar/SR' ] ]: 0,
		[ map[ 'Nelson\'s Pennant of Victory/SR' ] ]:     1,
		[ map[ 'Fire Control Radar/E' ] ]:                2,
		[ map[ 'Fire Suppressor/R' ] ]:                   3
	},
	'A/BBV1':  {
		[ map[ 'Type 1 Piercing Shell/SR' ] ]: 0,
		[ map[ 'SG Radar/SR' ] ]:              1,
		[ map[ 'Type 91 Piercing Shell/E' ] ]: 2
	},
	'A/BBV2':  {
		[ map[ 'Super Heavy Shell/SR' ] ]:                0,
		[ map[ 'High Standard Fire-Control Radar/SR' ] ]: 0,
		[ map[ 'Nelson\'s Pennant of Victory/SR' ] ]:     1,
		[ map[ 'Fire Control Radar/E' ] ]:                2,
		[ map[ 'Fire Suppressor/R' ] ]:                   3
	},
	'A/CV1':   {
		[ map[ 'Steam Catapult/SR' ] ]:   0,
		[ map[ 'Aviation Oil Tank/E' ] ]: 1
	},
	'A/CV2':   {
		[ map[ 'Steam Catapult/SR' ] ]:   0,
		[ map[ 'Frontier Medal/SR' ] ]:   0,
		[ map[ 'Homing Beacon/E' ] ]:     1,
		[ map[ 'Aviation Oil Tank/E' ] ]: 2
	},
	'A/SS1':   {
		[ map[ 'Improved Snorkel/SR' ] ]:            0,
		[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]: 0
	},
	'A/SS2':   {
		[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]:   0,
		[ map[ 'Pressure-Resistant Hull Design/E' ] ]: 0
	},
	'A/AR':    {
		[ map[ 'High Performance Air Radar/SR' ] ]: 0,
		[ map[ 'Repair Toolkit/SR' ] ]:             0
	},
	'A/AR1':   {
		[ map[ 'High Performance Air Radar/SR' ] ]: 0
	},
	'A/AR2':   {
		[ map[ 'High Performance Air Radar/SR' ] ]: 0
	},
	'A/BM1':   {
		[ map[ 'Repair Tools/E' ] ]:                      0,
		[ map[ 'High Standard Fire-Control Radar/SR' ] ]: 1,
		[ map[ 'Fire Control Radar/E' ] ]:                2
	},
	'A/BM2':   {
		[ map[ 'High Standard Fire-Control Radar/SR' ] ]: 0,
		[ map[ 'SG Radar/SR' ] ]:                         0,
		[ map[ 'Fire Control Radar/E' ] ]:                1,
		[ map[ 'Repair Tools/E' ] ]:                      1,
		[ map[ 'Fire Suppressor/R' ] ]:                   2
	},
	'A/AE1':   {
		[ map[ 'Beaver Squad Tag/SR' ] ]: 0
	},
	'A/AE2':   {
		[ map[ 'High Performance Hydraulic Steering Gear/SR' ] ]: 0
	},
	
	'C': {
		[ map[ '40cm Type 94 Naval Gun Parts (Cargo)/SR' ] ]: 0,
		[ map[ 'Aviation Materials (Cargo)/E' ] ]:            1,
		[ map[ 'Small-Caliber Naval Gun Parts (Cargo)/E' ] ]: 1,
		[ map[ 'Torpedo Materials (Cargo)/E' ] ]:             1
	}
	
	// [ map[ '/SR' ] ]:   0,
};
