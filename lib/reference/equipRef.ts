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

export const typeNames = {
	[ type.T ]:   'Torpedo',
	[ type.AA ]:  'Anti-Air Gun',
	[ type.DD ]:  'Destroyer Gun',
	[ type.CL ]:  'Light Cruiser Gun',
	[ type.CA ]:  'Heavy/Large Cruiser Gun',
	[ type.SS ]:  'Heavy/Large Cruiser Gun',
	[ type.BB ]:  'Battleship Gun',
	[ type.F ]:   'Fighter',
	[ type.DB ]:  'Dive Bomber',
	[ type.TB ]:  'Torpedo Bomber',
	[ type.ST ]:  'Submarine Torpedo',
	[ type.SP ]:  'Sea Plane',
	[ type.SSP ]: 'Sea Plane',
	[ type.A ]:   'Auxiliary',
	[ type.C ]:   'Cargo'
};

enum rarity {
	UR = 'UR',
	SR = 'SR',
	E  = 'E',
	R  = 'R',
	N  = 'N'
}

// list of equips sorted by type
export const equips      = [
	       {
		       id:     0,
		       name:   '',
		       image:  'empty.png',
		       type:   '' as any as type,
		       rarity: '' as any as rarity
	       },
	       //region Torpedo
	       {
		       id:     25040,
		       name:   '533mm Quintuple Torpedo Mount MkIX',
		       image:  '533mm_Quintuple_Torpedo_Mount_MkIX.png',
		       type:   type.T,
		       rarity: rarity.SR
	       },
	       {
		       id:     15240,
		       name:   '533mm Quintuple Torpedo Mount Mk17',
		       image:  '533mm_Quintuple_Torpedo_Mount_Mk17.png',
		       type:   type.T,
		       rarity: rarity.SR
	       },
	       {
		       id:     35260,
		       name:   '610mm Quadruple Torpedo Mount Kai',
		       image:  '610mm_Quadruple_Torpedo_Mount_Kai.png',
		       type:   type.T,
		       rarity: rarity.SR
	       },
	       {
		       id:     5203,
		       name:   'Quintuple 533mm Torpedo',
		       image:  'Quintuple_533mm_Torpedo.png',
		       type:   type.T,
		       rarity: rarity.SR
	       },
	       {
		       id:     35203,
		       name:   'Quadruple 610mm Torpedo',
		       image:  'Quadruple_610mm_Torpedo.png',
		       type:   type.T,
		       rarity: rarity.SR
	       },
	       {
		       id:     15220,
		       name:   '533mm Quadruple Torpedo Mount Mk17',
		       image:  '533mm_Quadruple_Torpedo_Mount_Mk17.png',
		       type:   type.T,
		       rarity: rarity.E
	       },
	       {
		       id:     25020,
		       name:   '533mm Quadruple Torpedo Mount MkIX',
		       image:  '533mm_Quadruple_Torpedo_Mount_MkIX.png',
		       type:   type.T,
		       rarity: rarity.E
	       },
	       {
		       id:     5103,
		       name:   'Quadruple 533mm Torpedo',
		       image:  'Quadruple_533mm_Torpedo.png',
		       type:   type.T,
		       rarity: rarity.E
	       },
	       {
		       id:     5202,
		       name:   'Quintuple 533mm Torpedo',
		       image:  'Quintuple_533mm_Torpedo.png',
		       type:   type.T,
		       rarity: rarity.E
	       },
	       {
		       id:     45203,
		       name:   'Quintuple 533mm Magnetic Torpedo',
		       image:  'Quintuple_533mm_Magnetic_Torpedo.png',
		       type:   type.T,
		       rarity: rarity.UR
	       },
	       {
		       id:     35202,
		       name:   'Quadruple 610mm Torpedo',
		       image:  'Quadruple_610mm_Torpedo.png',
		       type:   type.T,
		       rarity: rarity.E
	       },
	       {
		       id:     45103,
		       name:   'Quadruple 533mm Magnetic Torpedo',
		       image:  'Quadruple_533mm_Magnetic_Torpedo.png',
		       type:   type.T,
		       rarity: rarity.SR
	       },
	       {
		       id:     45202,
		       name:   'Quintuple 533mm Magnetic Torpedo',
		       image:  'Quintuple_533mm_Magnetic_Torpedo.png',
		       type:   type.T,
		       rarity: rarity.SR
	       },
	       {
		       id:     45102,
		       name:   'Quadruple 533mm Magnetic Torpedo',
		       image:  'Quadruple_533mm_Magnetic_Torpedo.png',
		       type:   type.T,
		       rarity: rarity.E
	       },
	       {
		       id:     45201,
		       name:   'Quintuple 533mm Magnetic Torpedo',
		       image:  'Quintuple_533mm_Magnetic_Torpedo.png',
		       type:   type.T,
		       rarity: rarity.E
	       },
	       {
		       id:     45003,
		       name:   'Triple 533mm Magnetic Torpedo',
		       image:  'Triple_533mm_Magnetic_Torpedo.png',
		       type:   type.T,
		       rarity: rarity.E
	       },
	       //endregion
	       //region Anti-Air
	       {
		       id:     26660,
		       name:   'Sextuple Bofors 40mm AA Gun',
		       image:  'Sextuple_Bofors_40mm_AA_Gun.png',
		       type:   type.AA,
		       rarity: rarity.SR
	       },
	       {
		       id:     16403,
		       name:   'Quadruple 40mm Bofors Gun',
		       image:  'Quadruple_40mm_Bofors_Gun.png',
		       type:   type.AA,
		       rarity: rarity.SR
	       },
	       {
		       id:     16080,
		       name:   'Twin 76mm Rapid Fire Gun Mount Mk27',
		       image:  'Twin_76mm_Rapid_Fire_Gun_Mount_Mk27.png',
		       type:   type.AA,
		       rarity: rarity.SR
	       },
	       {
		       id:     26203,
		       name:   'Octuple 40mm Pom Pom Gun',
		       image:  'Octuple_40mm_Pom_Pom_Gun.png',
		       type:   type.AA,
		       rarity: rarity.SR
	       },
	       {
		       id:     46360,
		       name:   'Twin 105mm SK C/33 na Anti-Air Gun Mount',
		       image:  'Twin_105mm_SK_C33_na_Anti-Air_Gun_Mount.png',
		       type:   type.AA,
		       rarity: rarity.SR
	       },
	       {
		       id:     26600,
		       name:   'Twin 40mm Bofors STAAG',
		       image:  'Twin_40mm_Bofors_STAAG.png',
		       type:   type.AA,
		       rarity: rarity.SR
	       },
	       {
		       id:     36700,
		       name:   'Prototype 40mm AA Gun (Type 5)',
		       image:  'Prototype_40mm_AA_Gun_Type 5.png',
		       type:   type.AA,
		       rarity: rarity.SR
	       },
	       {
		       id:     36560,
		       name:   '100mm Mounted AA Gun',
		       image:  '100mm_Mounted_AA_Gun.png',
		       type:   type.AA,
		       rarity: rarity.SR
	       },
	       {
		       id:     46303,
		       name:   'Twin 105mm AA Gun (SK C)',
		       image:  'Twin_105mm_AA_Gun_SK_C.png',
		       type:   type.AA,
		       rarity: rarity.SR
	       },
	       {
		       id:     26620,
		       name:   'Twin 40mm Bofors "Hazemeyer" AA Gun',
		       image:  'Twin_40mm_Bofors_Hazemeyer_AA_Gun.png',
		       type:   type.AA,
		       rarity: rarity.SR
	       },
	       {
		       id:     55103,
		       name:   'Single 90mm High-Angle Gun (M1939)',
		       image:  'Single_90mm_High-Angle_Gun_M1939.png',
		       type:   type.AA,
		       rarity: rarity.SR
	       },
	       {
		       id:     26503,
		       name:   'Twin 113mm AA Gun',
		       image:  'Twin_113mm_AA_Gun.png',
		       type:   type.AA,
		       rarity: rarity.SR
	       },
	       {
		       id:     16402,
		       name:   'Quadruple 40mm Bofors Gun',
		       image:  'Quadruple_40mm_Bofors_Gun.png',
		       type:   type.AA,
		       rarity: rarity.E
	       },
	       {
		       id:     36360,
		       name:   '25mm Type 96 Triple AT/AA Gun',
		       image:  '25mm_Type_96_Triple_ATAA_Gun.png',
		       type:   type.AA,
		       rarity: rarity.SR
	       },
	       {
		       id:     26202,
		       name:   'Octuple 40mm Pom Pom Gun',
		       image:  'Octuple_40mm_Pom_Pom_Gun.png',
		       type:   type.AA,
		       rarity: rarity.E
	       },
	       {
		       id:     50600,
		       name:   'Twin 37mm AA Gun (Mle 1936)',
		       image:  'Twin_37mm_AA_Gun_Mle_1936.png',
		       type:   type.AA,
		       rarity: rarity.SR
	       },
	       {
		       id:     36660,
		       name:   '127mm Type 89 High-Angle Gun',
		       image:  '127mm_Type_89_High-Angle_Gun.png',
		       type:   type.AA,
		       rarity: rarity.SR
	       },
	       {
		       id:     21500,
		       name:   '134mm Twin High-Angle Gun',
		       image:  '134mm_Twin_High-Angle_Gun.png',
		       type:   type.AA,
		       rarity: rarity.SR
	       },
	       //endregion
	       //region Destroyer
	       {
		       id:     85003,
		       name:   'Twin 130mm Main Gun (B-2LM)',
		       image:  'Twin_130mm_Main_Gun_B-2LM.png',
		       type:   type.DD,
		       rarity: rarity.SR
	       },
	       {
		       id:     21600,
		       name:   'Twin 114mm DP (4.5" MK IV)',
		       image:  'Twin_114mm_DP_45_MK_IV.png',
		       type:   type.DD,
		       rarity: rarity.SR
	       },
	       {
		       id:     21460,
		       name:   'Twin 120mm Dual-Purpose Gun Mount MkXI',
		       image:  'Twin_120mm_Dual-Purpose_Gun_Mount_MkXI.png',
		       type:   type.DD,
		       rarity: rarity.SR
	       },
	       {
		       id:     50703,
		       name:   'Single 138.6mm Main Gun (Mle 1927)',
		       image:  'Single_1386mm_Main_Gun_Mle_1927.png',
		       type:   type.DD,
		       rarity: rarity.E
	       },
	       {
		       id:     21403,
		       name:   'Twin 120mm Main Gun',
		       image:  'Twin_120mm_Main_Gun.png',
		       type:   type.DD,
		       rarity: rarity.E
	       },
	       {
		       id:     55403,
		       name:   'Twin 120mm Main Gun (M1936)',
		       image:  'Twin_120mm_Main_Gun_M1936.png',
		       type:   type.DD,
		       rarity: rarity.E
	       },
	       {
		       id:     41160,
		       name:   'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount',
		       image:  'Twin_128mm45_SK_C41_Dual-Purpose_Gun_Mount.png',
		       type:   type.DD,
		       rarity: rarity.SR
	       },
	       {
		       id:     50103,
		       name:   'Single 138.6mm Main Gun (Mle 1929)',
		       image:  'Single_1386mm_Main_Gun_Mle_1929.png',
		       type:   type.DD,
		       rarity: rarity.SR
	       },
	       {
		       id:     31003,
		       name:   'Twin 100mm (Type 98) AA Gun',
		       image:  'Twin_100mm_Type_98_AA_Gun.png',
		       type:   type.DD,
		       rarity: rarity.SR
	       },
	       {
		       id:     7203,
		       name:   'Single 130mm Main Gun',
		       image:  'Single_130mm_Main_Gun.png',
		       type:   type.DD,
		       rarity: rarity.E
	       },
	       {
		       id:     11160,
		       name:   'Twin 127mm Secondary Gun Mount',
		       image:  'Twin_127mm_Secondary_Gun_Mount.png',
		       type:   type.DD,
		       rarity: rarity.E
	       },
	       {
		       id:     50102,
		       name:   'Single 138.6mm Main Gun (Mle 1929)',
		       image:  'Single_1386mm_Main_Gun_Mle_1929.png',
		       type:   type.DD,
		       rarity: rarity.E
	       },
	       {
		       id:     31002,
		       name:   'Twin 100mm (Type 98) AA Gun',
		       image:  'Twin_100mm_Type_98_AA_Gun.png',
		       type:   type.DD,
		       rarity: rarity.E
	       },
	       {
		       id:     11203,
		       name:   'Twin 127mm MK12 Dual Gun',
		       image:  'Twin_127mm_MK12_Dual_Gun.png',
		       type:   type.DD,
		       rarity: rarity.SR
	       },
	       {
		       id:     11103,
		       name:   'Single 127mm Main Gun',
		       image:  'Single_127mm_Main_Gun.png',
		       type:   type.DD,
		       rarity: rarity.E
	       },
	       {
		       id:     11202,
		       name:   'Twin 127mm MK12 Dual Gun',
		       image:  'Twin_127mm_MK12_Dual_Gun.png',
		       type:   type.DD,
		       rarity: rarity.E
	       },
	       {
		       id:     41103,
		       name:   'Twin 128mm Dual Gun (SK C/41)',
		       image:  'Twin_128mm_Dual_Gun_SK_C41.png',
		       type:   type.DD,
		       rarity: rarity.E
	       },
	       { id: 11003, name: '76mm AA Gun', image: '76mm_AA_Gun.png', type: type.DD, rarity: rarity.R },
	       {
		       id:     21302,
		       name:   'Single 120mm Main Gun',
		       image:  'Single_120mm_Main_Gun.png',
		       type:   type.DD,
		       rarity: rarity.R
	       },
	       //endregion
	       //region Light Cruiser
	       {
		       id:     22203,
		       name:   'Triple 152mm Main Gun2',
		       image:  'Triple_152mm_Main_Gun2.png',
		       type:   type.CL,
		       rarity: rarity.E
	       },
	       {
		       id:     22103,
		       name:   'Twin 152mm Main Gun',
		       image:  'Twin_152mm_Main_Gun.png',
		       type:   type.CL,
		       rarity: rarity.E
	       },
	       {
		       id:     42203,
		       name:   'Twin 150mm Main Gun (TbtsK C/36)',
		       image:  'Twin_150mm_Main_Gun_TbtsK_C36.png',
		       type:   type.CL,
		       rarity: rarity.E
	       },
	       {
		       id:     42060,
		       name:   'Twin 150mm SK C/28 Secondary Gun Mount',
		       image:  'Twin_150mm_SK_C28_Secondary_Gun_Mount.png',
		       type:   type.CL,
		       rarity: rarity.E
	       },
	       {
		       id:     12200,
		       name:   'Prototype Triple 152mm Main Gun (DP MK17)',
		       image:  'Prototype_Triple_152mm_Main_Gun_DP_MK17.png',
		       type:   type.CL,
		       rarity: rarity.SR
	       },
	       {
		       id:     85123,
		       name:   'Triple 152mm Main Gun (B-38 MK5)',
		       image:  'Triple_152mm_Main_Gun_B-38_MK5.png',
		       type:   type.CL,
		       rarity: rarity.SR
	       },
	       {
		       id:     12160,
		       name:   'Triple 152mm Main Gun Mount Mk16',
		       image:  'Triple_152mm_Main_Gun_Mount_Mk16.png',
		       type:   type.CL,
		       rarity: rarity.SR
	       },
	       {
		       id:     32203,
		       name:   'Triple 155mm Mounted Gun',
		       image:  'Triple_155mm_Mounted_Gun.png',
		       type:   type.CL,
		       rarity: rarity.SR
	       },
	       {
		       id:     12103,
		       name:   'Triple 152mm Main Gun',
		       image:  'Triple_152mm_Main_Gun.png',
		       type:   type.CL,
		       rarity: rarity.E
	       },
	       {
		       id:     22260,
		       name:   'Prototype Triple 152mm Main Gun',
		       image:  'Prototype_Triple_152mm_Main_Gun.png',
		       type:   type.CL,
		       rarity: rarity.SR
	       },
	       {
		       id:     85122,
		       name:   'Triple 152mm Main Gun (B-38 MK5)',
		       image:  'Triple_152mm_Main_Gun_B-38_MK5.png',
		       type:   type.CL,
		       rarity: rarity.E
	       },
	       {
		       id:     32202,
		       name:   'Triple 155mm Mounted Gun',
		       image:  'Triple_155mm_Mounted_Gun.png',
		       type:   type.CL,
		       rarity: rarity.E
	       },
	       {
		       id:     42003,
		       name:   'Single 150mm Main Gun (SK C/28)',
		       image:  'Single_150mm_Main_Gun_SK_C28.png',
		       type:   type.CL,
		       rarity: rarity.E
	       },
	       //endregion
	       //region Heavy Cruiser
	       {
		       id:     23120,
		       name:   'Prototype Triple 234mm Main Gun (9.2" MK XII)',
		       image:  'Prototype_Triple_234mm_Main_Gun_92_MK_XII.png',
		       type:   type.CA,
		       rarity: rarity.UR
	       },
	       {
		       id:     43060,
		       name:   'Prototype Triple 203mm Main Gun (SK C)',
		       image:  'Prototype_Triple_203mm_Main_Gun_SK_C.png',
		       type:   type.CA,
		       rarity: rarity.SR
	       },
	       {
		       id:     13160,
		       name:   'Triple 203mm Main Gun Mount Mk15',
		       image:  'Triple_203mm_Main_Gun_Mount_Mk15.png',
		       type:   type.CA,
		       rarity: rarity.SR
	       },
	       {
		       id:     55203,
		       name:   'Twin 203mm Main Gun (M1927)',
		       image:  'Twin_203mm_Main_Gun_M1927.png',
		       type:   type.CA,
		       rarity: rarity.SR
	       },
	       {
		       id:     43103,
		       name:   'Triple 283mm Main Gun (SK C/28)',
		       image:  'Triple_283mm_Main_Gun_SK_C.png',
		       type:   type.CA,
		       rarity: rarity.E
	       },
	       {
		       id:     7340,
		       name:   'Submarine-mounted Twin 203mm Cannon (Mle 1924)',
		       image:  'Submarine-mounted_Twin_203mm_Cannon_Mle_1924.png',
		       type:   type.SS,
		       rarity: rarity.R
	       },
	       {
		       id:     43003,
		       name:   'Twin 203mm Main Gun (SK C)',
		       image:  'Twin_203mm_Main_Gun_SK_C.png',
		       type:   type.CA,
		       rarity: rarity.SR
	       },
	       {
		       id:     23100,
		       name:   'Prototype Twin 234mm Main Gun (9.2" MK XII)',
		       image:  'Prototype_Twin_234mm_Main_Gun_92_MK_XII.png',
		       type:   type.CA,
		       rarity: rarity.SR
	       },
	       {
		       id:     43002,
		       name:   'Twin 203mm Main Gun (SK C)',
		       image:  'Twin_203mm_Main_Gun_SK_C.png',
		       type:   type.CA,
		       rarity: rarity.E
	       },
	       {
		       id:     23200,
		       name:   'Prototype Triple 203mm Main Gun Mount Mk IX',
		       image:  'Prototype_Triple_203mm_Main_Gun_Mount_Mk_IX.png',
		       type:   type.CA,
		       rarity: rarity.SR
	       },
	       {
		       id:     7300,
		       name:   'Prototype Triple 203mm AA Gun',
		       image:  'Prototype_Triple_203mm_AA_Gun.png',
		       type:   type.CA,
		       rarity: rarity.SR
	       },
	       {
		       id:     50863,
		       name:   'Twin 203mm Main Gun (Mle 1924)',
		       image:  'Twin_203mm_Main_Gun_Mle_1924.png',
		       type:   type.CA,
		       rarity: rarity.SR
	       },
	       {
		       id:     33100,
		       name:   'Prototype Triple 310mm Main Gun (Type 0)',
		       image:  'Prototype_Triple_310mm_Main_Gun_Type_0.png',
		       type:   type.CA,
		       rarity: rarity.SR
	       },
	       {
		       id:     33060,
		       name:   'Prototype 203mm (Type 3) Mounted Gun',
		       image:  'Prototype_203mm_Type_3_Mounted_Gun.png',
		       type:   type.CA,
		       rarity: rarity.SR
	       },
	       {
		       id:     55202,
		       name:   'Twin 203mm Main Gun (M1927)',
		       image:  'Twin_203mm_Main_Gun_M1927.png',
		       type:   type.CA,
		       rarity: rarity.E
	       },
	       {
		       id:     33003,
		       name:   '203mm Mounted Gun',
		       image:  '203mm_Mounted_Gun.png',
		       type:   type.CA,
		       rarity: rarity.E
	       },
	       {
		       id:     50862,
		       name:   'Twin 203mm Main Gun (Mle 1924)',
		       image:  'Twin_203mm_Main_Gun_Mle_1924.png',
		       type:   type.CA,
		       rarity: rarity.E
	       },
	       //endregion
	       //region Battleship
	       {
		       id:     34100,
		       name:   '410mm Mounted Gun (Type 3 Shell)',
		       image:  '410mm_Mounted_Gun.png',
		       type:   type.BB,
		       rarity: rarity.SR
	       },
	       {
		       id:     14500,
		       name:   'Prototype Twin 457mm Main Gun (18" MKA)',
		       image:  'Prototype_Twin_457mm_Main_Gun_18_MKA.png',
		       type:   type.BB,
		       rarity: rarity.UR
	       },
	       {
		       id:     51000,
		       name:   'Prototype Triple 406mm/50 Main Gun',
		       image:  'Prototype_Triple_406mm50_Main_Gun.png',
		       type:   type.BB,
		       rarity: rarity.SR
	       },
	       {
		       id:     14303,
		       name:   'Triple 406mm MK6 Main Gun',
		       image:  'Triple_406mm_MK6_Main_Gun.png',
		       type:   type.BB,
		       rarity: rarity.E
	       },
	       {
		       id:     24203,
		       name:   'Triple 406mm Main Gun',
		       image:  'Triple_406mm_Main_Gun.png',
		       type:   type.BB,
		       rarity: rarity.SR
	       },
	       {
		       id:     34180,
		       name:   'Prototype Triple 410mm Mounted Gun',
		       image:  'Prototype_Triple_410mm_Mounted_Gun.png',
		       type:   type.BB,
		       rarity: rarity.SR
	       },
	       {
		       id:     14360,
		       name:   'Prototype Triple 406mm Main Gun Mount MkD',
		       image:  'Prototype_Triple_406mm_Main_Gun_Mount_MkD.png',
		       type:   type.BB,
		       rarity: rarity.SR
	       },
	       {
		       id:     24160,
		       name:   'Prototype Triple 381mm AA Gun',
		       image:  'Prototype_Triple_381mm_AA_Gun.png',
		       type:   type.BB,
		       rarity: rarity.SR
	       },
	       {
		       id:     50403,
		       name:   'Quadruple 380mm Main Gun (Mle 1935)',
		       image:  'Quadruple_380mm_Main_Gun_Mle_1935.png',
		       type:   type.BB,
		       rarity: rarity.SR
	       },
	       {
		       id:     55003,
		       name:   'Triple 381mm Main Gun (M1934)',
		       image:  'Triple_381mm_Main_Gun_M1934.png',
		       type:   type.BB,
		       rarity: rarity.SR
	       },
	       {
		       id:     85302,
		       name:   'Triple 406mm Main Gun (B-37 MK1)',
		       image:  'Triple_406mm_Main_Gun_B-37_MK1.png',
		       type:   type.BB,
		       rarity: rarity.E
	       },
	       {
		       id:     24202,
		       name:   'Triple 406mm Main Gun',
		       image:  'Triple_406mm_Main_Gun.png',
		       type:   type.BB,
		       rarity: rarity.E
	       },
	       {
		       id:     44200,
		       name:   'Prototype Twin 406mm Main Gun (SK C/34)',
		       image:  'Prototype_Twin_406mm_Main_Gun_SK_C34.png',
		       type:   type.BB,
		       rarity: rarity.SR
	       },
	       {
		       id:     44300,
		       name:   'Prototype Triple 305mm Main Gun (SK C/39)',
		       image:  'Prototype_Triple_305mm_Main_Gun_SK_C39.png',
		       type:   type.BB,
		       rarity: rarity.SR
	       },
	       {
		       id:     34300,
		       name:   '410mm Breech-Loading Naval Gun Kai',
		       image:  '410mm_Breech-Loading_Naval_Gun_Kai.png',
		       type:   type.BB,
		       rarity: rarity.E
	       },
	       {
		       id:     14380,
		       name:   'Triple 406mm Main Gun Mount Mk2',
		       image:  'Triple_406mm_Main_Gun_Mount_Mk2.png',
		       type:   type.BB,
		       rarity: rarity.E
	       },
	       {
		       id:     14260,
		       name:   'Twin 406mm Main Gun Mount Mk8',
		       image:  'Twin_406mm_Main_Gun_Mount_Mk8.png',
		       type:   type.BB,
		       rarity: rarity.E
	       },
	       {
		       id:     34103,
		       name:   '410mm Mounted Gun',
		       image:  '410mm_Mounted_Gun.png',
		       type:   type.BB,
		       rarity: rarity.E
	       },
	       {
		       id:     43108,
		       name:   'Triple 283mm Main Gun (SK C/34)',
		       image:  'Triple_283mm_Main_Gun_SK_C.png',
		       type:   type.BB,
		       rarity: rarity.E
	       },
	       {
		       id:     24300,
		       name:   'Twin 381mm Advanced Main Gun',
		       image:  'Twin_381mm_Advanced_Main_Gun.png',
		       type:   type.BB,
		       rarity: rarity.SR
	       },
	       {
		       id:     44103,
		       name:   'Twin 380mm Main Gun (SK C)',
		       image:  'Twin_380mm_Main_Gun_SK_C.png',
		       type:   type.BB,
		       rarity: rarity.SR
	       },
	       {
		       id:     24003,
		       name:   'Quadruple 356mm Main Gun',
		       image:  'Quadruple_356mm_Main_Gun.png',
		       type:   type.BB,
		       rarity: rarity.SR
	       },
	       {
		       id:     85423,
		       name:   'Triple 305mm Main Gun (M1907)',
		       image:  'Triple_305mm_Main_Gun_M1907.png',
		       type:   type.BB,
		       rarity: rarity.R
	       },
	       //endregion
	       //region Fighter
	       { id: 27320, name: 'Sea Hornet', image: 'Sea_Hornet.png', type: type.F, rarity: rarity.SR },
	       { id: 17360, name: 'F7F Tigercat', image: 'F7F_Tigercat.png', type: type.F, rarity: rarity.SR },
	       {
		       id:     17260,
		       name:   'F4U (VF-17 "Pirate" Squad)',
		       image:  'F4U_VF-17_Pirate_Squad.png',
		       type:   type.F,
		       rarity: rarity.SR
	       },
	       { id: 37303, name: 'A7M Reppuu', image: 'A7M_Reppuu.png', type: type.F, rarity: rarity.SR },
	       { id: 27103, name: 'Seafang', image: 'Seafang.png', type: type.F, rarity: rarity.SR },
	       { id: 27300, name: 'Sea Fury', image: 'Sea_Fury.png', type: type.F, rarity: rarity.SR },
	       {
		       id:     37400,
		       name:   'Kawanishi N1K3-A Shiden Kai 2',
		       image:  'Kawanishi_N1K3-A_Shiden_Kai_2.png',
		       type:   type.F,
		       rarity: rarity.SR
	       },
	       { id: 17303, name: 'F6F Hellcat', image: 'F6F_Hellcat.png', type: type.F, rarity: rarity.SR },
	       { id: 17203, name: 'F4U Corsair', image: 'F4U_Corsair.png', type: type.F, rarity: rarity.E },
	       { id: 37302, name: 'A7M Reppuu', image: 'A7M_Reppuu.png', type: type.F, rarity: rarity.E },
	       { id: 27102, name: 'Seafang', image: 'Seafang.png', type: type.F, rarity: rarity.E },
	       { id: 17302, name: 'F6F Hellcat', image: 'F6F_Hellcat.png', type: type.F, rarity: rarity.E },
	       { id: 17380, name: 'F8F Bearcat', image: 'F8F_Bearcat.png', type: type.F, rarity: rarity.SR },
	       { id: 37203, name: 'A6M5 Zero', image: 'A6M5_Zero.png', type: type.F, rarity: rarity.SR },
	       { id: 27060, name: 'Seafire FR.47', image: 'Seafire_FR47.png', type: type.F, rarity: rarity.SR },
	       {
		       id:     17060,
		       name:   'Brewster F2A Buffalo (Thach Squadron)',
		       image:  'Brewster_F2A_Buffalo_Thach_Squadron.png',
		       type:   type.F,
		       rarity: rarity.SR
	       },
	       {
		       id:     47103,
		       name:   'Messerschmitt Me-155A',
		       image:  'Messerschmitt_Me-155A.png',
		       type:   type.F,
		       rarity: rarity.SR
	       },
	       //endregion
	       //region Dive Bomber
	       {
		       id:     49003,
		       name:   'Ju-87C Dive Bomber',
		       image:  'Ju-87C_Dive_Bomber.png',
		       type:   type.DB,
		       rarity: rarity.E
	       },
	       {
		       id:     19103,
		       name:   'SB2C Helldiver',
		       image:  'SB2C_Helldiver.png',
		       type:   type.DB,
		       rarity: rarity.E
	       },
	       {
		       id:     19160,
		       name:   'Experimental XSB3C-1',
		       image:  'Experimental_XSB3C-1.png',
		       type:   type.DB,
		       rarity: rarity.SR
	       },
	       {
		       id:     39160,
		       name:   'Suisei Model 12A',
		       image:  'Suisei_Model_12A.png',
		       type:   type.DB,
		       rarity: rarity.SR
	       },
	       {
		       id:     29200,
		       name:   'Fairey Firefly',
		       image:  'Fairey_Firefly.png',
		       type:   type.DB,
		       rarity: rarity.SR
	       },
	       { id: 39103, name: 'Comet', image: 'Comet.png', type: type.DB, rarity: rarity.SR },
	       {
		       id:     19203,
		       name:   'BTD-1 Destroyer',
		       image:  'BTD-1_Destroyer.png',
		       type:   type.DB,
		       rarity: rarity.SR
	       },
	       {
		       id:     19060,
		       name:   'SBD Dauntless (McClusky Division)',
		       image:  'SBD_Dauntless_McClusky_Division.png',
		       type:   type.DB,
		       rarity: rarity.SR
	       },
	       {
		       id:     29300,
		       name:   'Fairey Barracuda (831 Squadron)',
		       image:  'Fairey_Barracuda_831_Squadron.png',
		       type:   type.DB,
		       rarity: rarity.SR
	       },
	       //endregion
	       //region Torpedo Bomber
	       { id: 28400, name: 'Wyvern', image: 'Wyvern.png', type: type.TB, rarity: rarity.UR },
	       {
		       id:     18220,
		       name:   'XBT2D-1 Destroyer II',
		       image:  'XBT2D-1_Destroyer_II.png',
		       type:   type.TB,
		       rarity: rarity.SR
	       },
	       {
		       id:     18180,
		       name:   'TBM Avenger (VT-18 Squadron)',
		       image:  'TBM_Avenger_VT-18_Squadron.png',
		       type:   type.TB,
		       rarity: rarity.SR
	       },
	       { id: 28103, name: 'Barracuda', image: 'Barracuda.png', type: type.TB, rarity: rarity.SR },
	       { id: 28220, name: 'Firecrest', image: 'Firecrest.png', type: type.TB, rarity: rarity.SR },
	       {
		       id:     28200,
		       name:   'Blackburn Firebrand',
		       image:  'Blackburn_Firebrand.png',
		       type:   type.TB,
		       rarity: rarity.SR
	       },
	       {
		       id:     28060,
		       name:   'Swordfish (818 Squad)',
		       image:  'Swordfish_818_Squad.png',
		       type:   type.TB,
		       rarity: rarity.SR
	       },
	       { id: 28102, name: 'Barracuda', image: 'Barracuda.png', type: type.TB, rarity: rarity.E },
	       {
		       id:     38203,
		       name:   'Aichi B7A Ryusei',
		       image:  'Aichi_B7A_Ryusei.png',
		       type:   type.TB,
		       rarity: rarity.SR
	       },
	       { id: 38160, name: 'Tenzan Kai', image: 'Tenzan_Kai.png', type: type.TB, rarity: rarity.E },
	       { id: 48040, name: 'Ju-87 D-4', image: 'Ju-87_D-4.png', type: type.TB, rarity: rarity.SR },
	       {
		       id:     38103,
		       name:   'Nakajima B6N Tenzan',
		       image:  'Nakajima_B6N_Tenzan.png',
		       type:   type.TB,
		       rarity: rarity.E
	       },
	       {
		       id:     38202,
		       name:   'Aichi B7A Ryusei',
		       image:  'Aichi_B7A_Ryusei.png',
		       type:   type.TB,
		       rarity: rarity.E
	       },
	       {
		       id:     28303,
		       name:   'Fairey Albacore',
		       image:  'Fairey_Albacore.png',
		       type:   type.TB,
		       rarity: rarity.E
	       },
	       {
		       id:     18060,
		       name:   'TBD Devastator (VT-8 Squadron)',
		       image:  'TBD_Devastator_VT-8_Squadron.png',
		       type:   type.TB,
		       rarity: rarity.SR
	       },
	       //endregion
	       //region Seaplane
	       {
		       id:     39320,
		       name:   'Suisei Model 21',
		       image:  'Suisei_Model_21.png',
		       type:   type.SP,
		       rarity: rarity.SR
	       },
	       { id: 37440, name: 'N1K1 Kyoufuu', image: 'N1K1_Kyoufuu.png', type: type.SP, rarity: rarity.E },
	       { id: 39300, name: 'Seiran', image: 'Seiran.png', type: type.SSP, rarity: rarity.E },
	       {
		       id:     39203,
		       name:   'Aichi E16A Zuiun',
		       image:  'Aichi_E16A_Zuiun.png',
		       type:   type.SSP,
		       rarity: rarity.E
	       },
	       {
		       id:     37420,
		       name:   'Type 2 Seaplane Fighter',
		       image:  'Type_2_Seaplane_Fighter.png',
		       type:   type.SP,
		       rarity: rarity.E
	       },
	       //endregion
	       //region Submarine Torpedo
	       {
		       id:     35563,
		       name:   'Type 96 Submarine Torpedo',
		       image:  'Type_96_Submarine_Torpedo.png',
		       type:   type.ST,
		       rarity: rarity.SR
	       },
	       {
		       id:     45403,
		       name:   'G7e Acoustic Guided Torpedo',
		       image:  'G7e_Acoustic_Guided_Torpedo.png',
		       type:   type.ST,
		       rarity: rarity.SR
	       },
	       {
		       id:     15160,
		       name:   'Mark 28 Submarine Torpedo',
		       image:  'Mark_28_Submarine_Torpedo.png',
		       type:   type.ST,
		       rarity: rarity.SR
	       },
	       {
		       id:     35503,
		       name:   'Type 95 Submarine Torpedo',
		       image:  'Type_9x_Submarine_Torpedo.png',
		       type:   type.ST,
		       rarity: rarity.SR
	       },
	       {
		       id:     25200,
		       name:   'Mark 12 "Ferry" Submarine Torpedo',
		       image:  'Mark_12_Ferry_Submarine_Torpedo.png',
		       type:   type.ST,
		       rarity: rarity.SR
	       },
	       {
		       id:     15103,
		       name:   'Mark 16 Submarine Torpedo',
		       image:  'Mark_16_Submarine_Torpedo.png',
		       type:   type.ST,
		       rarity: rarity.SR
	       },
	       {
		       id:     25300,
		       name:   'Mark 20 "Bidder" Submarine Torpedo',
		       image:  'Mark_20_Bidder_Submarine_Torpedo.png',
		       type:   type.ST,
		       rarity: rarity.SR
	       },
	       {
		       id:     45303,
		       name:   'G7a Submarine Torpedo',
		       image:  'G7a_Submarine_Torpedo.png',
		       type:   type.ST,
		       rarity: rarity.E
	       },
	       {
		       id:     45402,
		       name:   'G7e Acoustic Guided Torpedo',
		       image:  'G7e_Acoustic_Guided_Torpedo.png',
		       type:   type.ST,
		       rarity: rarity.E
	       },
	       {
		       id:     35502,
		       name:   'Type 95 Submarine Torpedo',
		       image:  'Type_9x_Submarine_Torpedo.png',
		       type:   type.ST,
		       rarity: rarity.E
	       },
	       {
		       id:     15102,
		       name:   'Mark 16 Submarine Torpedo',
		       image:  'Mark_16_Submarine_Torpedo.png',
		       type:   type.ST,
		       rarity: rarity.E
	       },
	       //endregion
	       //region Auxilliary
	       {
		       id:     2600,
		       name:   'Type 93 Pure Oxygen Torpedo',
		       image:  'Type_9x_Submarine_Torpedo.png',
		       type:   type.A,
		       rarity: rarity.UR
	       },
	       { id: 640, name: 'Z Flag', image: 'Z_Flag.png', type: type.A, rarity: rarity.UR },
	       {
		       id:     2700,
		       name:   '533mm Acoustic Torpedo',
		       image:  '533mm_Acoustic_Torpedo.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       { id: 89120, name: 'Ankimo', image: 'Ankimo.png', type: type.A, rarity: rarity.SR },
	       {
		       id:     89240,
		       name:   'Awakening Pearl',
		       image:  'Awakening_Pearl.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       {
		       id:     89220,
		       name:   'Celestial Body',
		       image:  'Celestial_Body.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       { id: 89100, name: 'Corn Lantern', image: 'Corn_Lantern.png', type: type.A, rarity: rarity.SR },
	       { id: 89200, name: 'Cosmic Kicks', image: 'Cosmic_Kicks.png', type: type.A, rarity: rarity.SR },
	       {
		       id:     840,
		       name:   'Eagle Union Elite Damage Control',
		       image:  'Eagle_Union_Elite_Damage_Control.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       {
		       id:     820,
		       name:   'Frontier Medal',
		       image:  'Frontier_Medal.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       { id: 89080, name: 'Gamers Mark', image: 'Gamers_Mark.png', type: type.A, rarity: rarity.SR },
	       {
		       id:     540,
		       name:   'Healing Cat\'s Paw',
		       image:  'Healing_Cats_Paw.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       { id: 89260, name: 'Heart Key', image: 'Heart_Key.png', type: type.A, rarity: rarity.SR },
	       {
		       id:     1160,
		       name:   'High Performance Air Radar',
		       image:  'High_Performance_Air_Radar.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       {
		       id:     1260,
		       name:   'High Standard Fire-Control Radar',
		       image:  'High_Standard_Fire-Control_Radar.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       {
		       id:     1760,
		       name:   'High Performance Hydraulic Steering Gear',
		       image:  'High_Performance_Hydraulic_Steering_Gear.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       {
		       id:     3120,
		       name:   'Improved Snorkel',
		       image:  'Improved_Snorkel.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       {
		       id:     3140,
		       name:   'Improved Storage Battery',
		       image:  'Improved_Storage_Battery.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       {
		       id:     89040,
		       name:   'Intelligence Chip',
		       image:  'Intelligence_Chip.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       {
		       id:     500,
		       name:   'Beaver Squad Tag',
		       image:  'Beaver_Squad_Tag.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       {
		       id:     880,
		       name:   'Nelson\'s Pennant of Victory',
		       image:  'Nelsons_Pennant_of_Victory.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       { id: 520, name: 'Pearl\'s Tears', image: 'Pearls_Tears.png', type: type.A, rarity: rarity.SR },
	       { id: 89020, name: 'Pyoko-Pyoko', image: 'Pyoko-Pyoko.png', type: type.A, rarity: rarity.SR },
	       {
		       id:     89000,
		       name:   'Random Word Generator',
		       image:  'Random_Word_Generator.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       {
		       id:     89180,
		       name:   'Resplendent Astrum',
		       image:  'Resplendent_Astrum.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       {
		       id:     89160,
		       name:   'Sacred Lumière',
		       image:  'Sacred_Lumiere.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       {
		       id:     3300,
		       name:   'Seal of the Four Gods',
		       image:  'Seal_of_the_Four_Gods.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       { id: 1503, name: 'SG Radar', image: 'SG_Radar.png', type: type.A, rarity: rarity.SR },
	       {
		       id:     1003,
		       name:   'Repair Toolkit',
		       image:  'Repair_Toolkit.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       {
		       id:     1403,
		       name:   'Steam Catapult',
		       image:  'Steam_Catapult.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       {
		       id:     620,
		       name:   'Super Heavy Shell',
		       image:  'Super_Heavy_Shell.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       { id: 89060, name: 'Team Emblem', image: 'Team_Emblem.png', type: type.A, rarity: rarity.SR },
	       {
		       id:     600,
		       name:   'Type 1 Piercing Shell',
		       image:  'Type_1_Piercing_Shell.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       {
		       id:     720,
		       name:   'Certificate of Sponsorship',
		       image:  'Certificate_of_Sponsorship.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       {
		       id:     3200,
		       name:   'VH Armor Plating',
		       image:  'VH_Armor_Plating.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       {
		       id:     860,
		       name:   'Washington Naval Treaty',
		       image:  'Washington_Naval_Treaty.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       {
		       id:     89140,
		       name:   'White-Hot Verheerender',
		       image:  'White-Hot_Verheerender.png',
		       type:   type.A,
		       rarity: rarity.SR
	       },
	       {
		       id:     660,
		       name:   '100/150 Aviation Fuel',
		       image:  '100150_Aviation_Fuel.png',
		       type:   type.A,
		       rarity: rarity.E
	       },
	       { id: 1102, name: 'Air Radar', image: 'Air_Radar.png', type: type.A, rarity: rarity.E },
	       {
		       id:     1302,
		       name:   'Anti-Torpedo Bulge',
		       image:  'Anti-Torpedo_Bulge.png',
		       type:   type.A,
		       rarity: rarity.E
	       },
	       { id: 2202, name: 'Autoloader', image: 'Autoloader.png', type: type.A, rarity: rarity.E },
	       {
		       id:     3100,
		       name:   'Compressed Oxygen Cylinder',
		       image:  'Compressed_Oxygen_Cylinder.png',
		       type:   type.A,
		       rarity: rarity.E
	       },
	       {
		       id:     15500,
		       name:   'PBY-5A Catalina',
		       image:  'PBY-5A_Catalina.png',
		       type:   type.A,
		       rarity: rarity.E
	       },
	       {
		       id:     2102,
		       name:   'Aviation Oil Tank',
		       image:  'Aviation_Oil_Tank.png',
		       type:   type.A,
		       rarity: rarity.E
	       },
	       {
		       id:     1202,
		       name:   'Fire Control Radar',
		       image:  'Fire_Control_Radar.png',
		       type:   type.A,
		       rarity: rarity.E
	       },
	       { id: 2002, name: 'Fuel Filter', image: 'Fuel_Filter.png', type: type.A, rarity: rarity.E },
	       { id: 2302, name: 'Gyroscope', image: 'Gyroscope.png', type: type.A, rarity: rarity.E },
	       { id: 680, name: 'Homing Beacon', image: 'Homing_Beacon.png', type: type.A, rarity: rarity.E },
	       {
		       id:     1802,
		       name:   'Advanced Boiler',
		       image:  'Advanced_Boiler.png',
		       type:   type.A,
		       rarity: rarity.E
	       },
	       {
		       id:     780,
		       name:   'Intel Report - Arctic Stronghold',
		       image:  'Intel_Report_-_Arctic_Stronghold.png',
		       type:   type.A,
		       rarity: rarity.E
	       },
	       {
		       id:     760,
		       name:   'NY City Coast Recon Report',
		       image:  'NY_City_Coast_Recon_Report.png',
		       type:   type.A,
		       rarity: rarity.E
	       },
	       {
		       id:     1960,
		       name:   'Marinière Camouflage',
		       image:  'Mariniere_Camouflage.png',
		       type:   type.A,
		       rarity: rarity.E
	       },
	       {
		       id:     800,
		       name:   'Pressure-Resistant Hull Design',
		       image:  'Pressure-Resistant_Hull_Design.png',
		       type:   type.A,
		       rarity: rarity.E
	       },
	       { id: 2402, name: 'Repair Tools', image: 'Repair_Tools.png', type: type.A, rarity: rarity.E },
	       { id: 1502, name: 'SG Radar', image: 'SG_Radar.png', type: type.A, rarity: rarity.E },
	       {
		       id:     1402,
		       name:   'Steam Catapult',
		       image:  'Steam_Catapult.png',
		       type:   type.A,
		       rarity: rarity.E
	       },
	       {
		       id:     580,
		       name:   'Type 91 Piercing Shell',
		       image:  'Type_91_Piercing_Shell.png',
		       type:   type.A,
		       rarity: rarity.E
	       },
	       {
		       id:     2800,
		       name:   'Type 94 AA Device',
		       image:  'Type_94_AA_Device.png',
		       type:   type.A,
		       rarity: rarity.E
	       },
	       {
		       id:     700,
		       name:   'Type 98 Delayed Firing Device',
		       image:  'Type_98_Delayed_Firing_Device.png',
		       type:   type.A,
		       rarity: rarity.E
	       },
	       {
		       id:     3220,
		       name:   'VC Armor Plating',
		       image:  'VC_Armor_Plating.png',
		       type:   type.A,
		       rarity: rarity.E
	       },
	       {
		       id:     2501,
		       name:   'Fire Suppressor',
		       image:  'Fire_Suppressor.png',
		       type:   type.A,
		       rarity: rarity.R
	       },
	       {
		       id:     1701,
		       name:   'Hydraulic Steering Gear',
		       image:  'Hydraulic_Steering_Gear.png',
		       type:   type.A,
		       rarity: rarity.R
	       },
	       {
		       id:     1901,
		       name:   'Navy Camouflage',
		       image:  'Navy_Camouflage.png',
		       type:   type.A,
		       rarity: rarity.R
	       },
	       //endregion
	       //region Cargo
	       {
		       id:     3400,
		       name:   '40cm Type 94 Naval Gun Parts (Cargo)',
		       image:  '40cm_Type_94_Naval_Gun_Parts_Cargo.png',
		       type:   type.C,
		       rarity: rarity.SR
	       },
	       {
		       id:     3500,
		       name:   'Aviation Materials (Cargo)',
		       image:  'Aviation_Materials_Cargo.png',
		       type:   type.C,
		       rarity: rarity.E
	       },
	       {
		       id:     3520,
		       name:   'Small-Caliber Naval Gun Parts (Cargo)',
		       image:  'Small-Caliber_Naval_Gun_Parts_Cargo.png',
		       type:   type.C,
		       rarity: rarity.E
	       },
	       {
		       id:     3540,
		       name:   'Torpedo Materials (Cargo)',
		       image:  'Torpedo_Materials_Cargo.png',
		       type:   type.C,
		       rarity: rarity.E
	       }
	       //endregion
	       // { name: '', image: '', type: type., rarity: rarity.SR },
       ],
             // dictionary of equips to reference by id
             equipsIndex = equips.reduce( ( obj, item ) => {
	             obj[ item.id ] = item;
	             return obj;
             }, {} as Record<number, { id, name, image, type, rarity }> );

const map = equips.reduce( ( obj, item ) => {
	obj[ `${ item.name }/${ rarity[ item.rarity ] }` ] = item.id;
	return obj;
}, {} as Record<string, number | string> );

//✷★☆✦✧⊝–
let a;
// tiers of equipment by slot
export const equipTier: Record<string, Record<number, number[]>> = {
	'T':         {
		[ map[ 'Quintuple 533mm Magnetic Torpedo/UR' ] ]:   [ 0, a = 0 ],
		[ map[ 'Quadruple 533mm Magnetic Torpedo/SR' ] ]:   [ 1, ++a ],
		[ map[ '533mm Quintuple Torpedo Mount Mk17/SR' ] ]: [ 1, ++a ],
		[ map[ 'Quintuple 533mm Torpedo/SR' ] ]:            [ 1, ++a ],
		[ map[ 'Quintuple 533mm Magnetic Torpedo/SR' ] ]:   [ 2, ++a ],
		[ map[ '533mm Quintuple Torpedo Mount MkIX/SR' ] ]: [ 2, ++a ],
		[ map[ '610mm Quadruple Torpedo Mount Kai/SR' ] ]:  [ 2, ++a ],
		[ map[ 'Quadruple 610mm Torpedo/SR' ] ]:            [ 2, ++a ],
		[ map[ '533mm Quadruple Torpedo Mount Mk17/E' ] ]:  [ 3, ++a ],
		[ map[ 'Quadruple 533mm Torpedo/E' ] ]:             [ 3, ++a ],
		[ map[ 'Quadruple 533mm Magnetic Torpedo/E' ] ]:    [ 3, ++a ],
		[ map[ 'Quintuple 533mm Magnetic Torpedo/E' ] ]:    [ 3, ++a ],
		[ map[ '533mm Quadruple Torpedo Mount MkIX/E' ] ]:  [ 4, ++a ],
		[ map[ 'Quintuple 533mm Torpedo/E' ] ]:             [ 4, ++a ],
		[ map[ 'Quadruple 610mm Torpedo/E' ] ]:             [ 4, ++a ]
	},
	'AA/Damage': {
		[ map[ 'Sextuple Bofors 40mm AA Gun/SR' ] ]:              [ 0, a = 0 ],
		[ map[ '134mm Twin High-Angle Gun/SR' ] ]:                [ 0, ++a ],
		[ map[ 'Twin 113mm AA Gun/SR' ] ]:                        [ 1, ++a ],
		[ map[ 'Octuple 40mm Pom Pom Gun/SR' ] ]:                 [ 1, ++a ],
		[ map[ 'Twin 105mm SK C/33 na Anti-Air Gun Mount/SR' ] ]: [ 1, ++a ],
		[ map[ '100mm Mounted AA Gun/SR' ] ]:                     [ 2, ++a ],
		[ map[ '127mm Type 89 High-Angle Gun/SR' ] ]:             [ 2, ++a ],
		[ map[ 'Twin 105mm AA Gun (SK C)/SR' ] ]:                 [ 3, ++a ],
		[ map[ 'Quadruple 40mm Bofors Gun/SR' ] ]:                [ 3, ++a ],
		[ map[ 'Quadruple 40mm Bofors Gun/E' ] ]:                 [ 4, ++a ],
		[ map[ 'Octuple 40mm Pom Pom Gun/E' ] ]:                  [ 4, ++a ]
	},
	'AA':        {
		[ map[ 'Sextuple Bofors 40mm AA Gun/SR' ] ]:              [ 0, a = 0 ],
		[ map[ 'Quadruple 40mm Bofors Gun/SR' ] ]:                [ 0, ++a ],
		[ map[ 'Twin 76mm Rapid Fire Gun Mount Mk27/SR' ] ]:      [ 0, ++a ],
		[ map[ 'Octuple 40mm Pom Pom Gun/SR' ] ]:                 [ 1, ++a ],
		[ map[ 'Twin 105mm SK C/33 na Anti-Air Gun Mount/SR' ] ]: [ 1, ++a ],
		[ map[ 'Prototype 40mm AA Gun (Type 5)/SR' ] ]:           [ 1, ++a ],
		[ map[ '100mm Mounted AA Gun/SR' ] ]:                     [ 2, ++a ],
		[ map[ 'Twin 105mm AA Gun (SK C)/SR' ] ]:                 [ 2, ++a ],
		[ map[ 'Single 90mm High-Angle Gun (M1939)/SR' ] ]:       [ 3, ++a ],
		[ map[ 'Twin 113mm AA Gun/SR' ] ]:                        [ 3, ++a ],
		[ map[ 'Quadruple 40mm Bofors Gun/E' ] ]:                 [ 4, ++a ],
		[ map[ 'Octuple 40mm Pom Pom Gun/E' ] ]:                  [ 4, ++a ]
	},
	'AA/Speed':  {
		[ map[ '25mm Type 96 Triple AT/AA Gun/SR' ] ]:       [ 0, a = 0 ],
		[ map[ 'Twin 76mm Rapid Fire Gun Mount Mk27/SR' ] ]: [ 0, ++a ],
		[ map[ 'Prototype 40mm AA Gun (Type 5)/SR' ] ]:      [ 1, ++a ],
		[ map[ 'Quadruple 40mm Bofors Gun/SR' ] ]:           [ 1, ++a ],
		[ map[ 'Twin 37mm AA Gun (Mle 1936)/SR' ] ]:         [ 2, ++a ],
		[ map[ '134mm Twin High-Angle Gun/SR' ] ]:           [ 3, ++a ],
		[ map[ 'Single 90mm High-Angle Gun (M1939)/SR' ] ]:  [ 3, ++a ],
		[ map[ 'Quadruple 40mm Bofors Gun/E' ] ]:            [ 4, ++a ]
	},
	'AA/Main':   {
		[ map[ 'Twin 40mm Bofors STAAG/SR' ] ]:              [ 0, a = 0 ],
		[ map[ 'Twin 40mm Bofors "Hazemeyer" AA Gun/SR' ] ]: [ 0, ++a ],
		[ map[ 'Twin 76mm Rapid Fire Gun Mount Mk27/SR' ] ]: [ 1, ++a ],
		[ map[ 'Prototype 40mm AA Gun (Type 5)/SR' ] ]:      [ 1, ++a ],
		[ map[ 'Quadruple 40mm Bofors Gun/SR' ] ]:           [ 2, ++a ],
		[ map[ 'Twin 37mm AA Gun (Mle 1936)/SR' ] ]:         [ 3, ++a ],
		[ map[ '134mm Twin High-Angle Gun/SR' ] ]:           [ 3, ++a ],
		[ map[ 'Quadruple 40mm Bofors Gun/E' ] ]:            [ 4, ++a ]
	},
	
	'DD':          {
		[ map[ 'Twin 130mm Main Gun (B-2LM)/SR' ] ]:                  [ 0, a = 0 ],
		[ map[ 'Single 138.6mm Main Gun (Mle 1929)/SR' ] ]:           [ 0, ++a ],
		[ map[ 'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount/SR' ] ]: [ 1, ++a ],
		[ map[ 'Twin 114mm DP (4.5" MK IV)/SR' ] ]:                   [ 1, ++a ],
		[ map[ 'Twin 120mm Dual-Purpose Gun Mount MkXI/SR' ] ]:       [ 1, ++a ],
		[ map[ 'Twin 127mm MK12 Dual Gun/SR' ] ]:                     [ 1, ++a ],
		[ map[ 'Single 138.6mm Main Gun (Mle 1927)/E' ] ]:            [ 2, ++a ],
		[ map[ 'Twin 120mm Main Gun/E' ] ]:                           [ 2, ++a ],
		[ map[ 'Twin 120mm Main Gun (M1936)/E' ] ]:                   [ 2, ++a ],
		[ map[ 'Single 130mm Main Gun/E' ] ]:                         [ 3, ++a ],
		[ map[ 'Single 138.6mm Main Gun (Mle 1929)/E' ] ]:            [ 3, ++a ],
		[ map[ 'Single 127mm Main Gun/E' ] ]:                         [ 3, ++a ],
		[ map[ 'Twin 127mm MK12 Dual Gun/E' ] ]:                      [ 4, ++a ]
	},
	'DD/Speed':    {
		[ map[ 'Twin 114mm DP (4.5" MK IV)/SR' ] ]:                   [ 0, a = 0 ],
		[ map[ 'Twin 120mm Dual-Purpose Gun Mount MkXI/SR' ] ]:       [ 1, ++a ],
		[ map[ 'Twin 100mm (Type 98) AA Gun/SR' ] ]:                  [ 1, ++a ],
		[ map[ 'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount/SR' ] ]: [ 2, ++a ],
		[ map[ 'Single 138.6mm Main Gun (Mle 1929)/SR' ] ]:           [ 2, ++a ],
		[ map[ 'Single 127mm Main Gun/E' ] ]:                         [ 3, ++a ],
		[ map[ 'Twin 100mm (Type 98) AA Gun/E' ] ]:                   [ 3, ++a ],
		[ map[ 'Single 130mm Main Gun/E' ] ]:                         [ 4, ++a ]
	},
	'DD/SSpeed':   {
		[ map[ 'Twin 114mm DP (4.5" MK IV)/SR' ] ]:  [ 0, a = 0 ],
		[ map[ 'Twin 100mm (Type 98) AA Gun/SR' ] ]: [ 1, ++a ],
		[ map[ '76mm AA Gun/R' ] ]:                  [ 2, ++a ],
		[ map[ 'Single 120mm Main Gun/R' ] ]:        [ 2, ++a ],
		[ map[ 'Single 127mm Main Gun/E' ] ]:        [ 3, ++a ]
	},
	'DD/SSSpeed':  {
		[ map[ '76mm AA Gun/R' ] ]:                  [ 0, a = 0 ],
		[ map[ 'Single 120mm Main Gun/R' ] ]:        [ 0, ++a ],
		[ map[ 'Twin 114mm DP (4.5" MK IV)/SR' ] ]:  [ 1, ++a ],
		[ map[ 'Twin 100mm (Type 98) AA Gun/SR' ] ]: [ 2, ++a ]
	},
	'DD/AP':       {
		[ map[ 'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Single 138.6mm Main Gun (Mle 1929)/SR' ] ]:           [ 1, ++a ],
		[ map[ 'Twin 114mm DP (4.5" MK IV)/SR' ] ]:                   [ 2, ++a ],
		[ map[ 'Twin 120mm Dual-Purpose Gun Mount MkXI/SR' ] ]:       [ 2, ++a ],
		[ map[ 'Twin 127mm MK12 Dual Gun/SR' ] ]:                     [ 2, ++a ],
		[ map[ 'Twin 128mm Dual Gun (SK C/41)/E' ] ]:                 [ 3, ++a ],
		[ map[ 'Single 138.6mm Main Gun (Mle 1927)/E' ] ]:            [ 3, ++a ],
		[ map[ 'Twin 120mm Main Gun/E' ] ]:                           [ 3, ++a ],
		[ map[ 'Twin 120mm Main Gun (M1936)/E' ] ]:                   [ 3, ++a ],
		[ map[ 'Single 130mm Main Gun/E' ] ]:                         [ 4, ++a ],
		[ map[ 'Single 138.6mm Main Gun (Mle 1929)/E' ] ]:            [ 4, ++a ],
		[ map[ 'Single 127mm Main Gun/E' ] ]:                         [ 4, ++a ]
	},
	'DD/AP/Speed': {
		[ map[ 'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Twin 114mm DP (4.5" MK IV)/SR' ] ]:                   [ 1, ++a ],
		[ map[ 'Twin 120mm Dual-Purpose Gun Mount MkXI/SR' ] ]:       [ 2, ++a ],
		[ map[ 'Twin 100mm (Type 98) AA Gun/SR' ] ]:                  [ 2, ++a ],
		[ map[ 'Twin 128mm Dual Gun (SK C/41)/E' ] ]:                 [ 3, ++a ],
		[ map[ 'Single 138.6mm Main Gun (Mle 1929)/SR' ] ]:           [ 3, ++a ],
		[ map[ 'Single 127mm Main Gun/E' ] ]:                         [ 4, ++a ],
		[ map[ 'Twin 100mm (Type 98) AA Gun/E' ] ]:                   [ 4, ++a ]
	},
	get 'CL/DD'() {
		return this[ 'DD' ];
	},
	get 'CL/DD/Speed'() {
		return this[ 'DD/Speed' ];
	},
	get 'T/DD'() {
		return this[ 'DD' ];
	},
	'DD/Aux':  {
		[ map[ 'Twin 114mm DP (4.5" MK IV)/SR' ] ]:                   [ 0, a = 0 ],
		[ map[ 'Twin 100mm (Type 98) AA Gun/SR' ] ]:                  [ 0, ++a ],
		[ map[ 'Twin 130mm Main Gun (B-2LM)/SR' ] ]:                  [ 0, ++a ],
		[ map[ 'Single 138.6mm Main Gun (Mle 1929)/SR' ] ]:           [ 1, ++a ],
		[ map[ 'Twin 100mm (Type 98) AA Gun/E' ] ]:                   [ 1, ++a ],
		[ map[ 'Twin 120mm Dual-Purpose Gun Mount MkXI/SR' ] ]:       [ 2, ++a ],
		[ map[ 'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount/SR' ] ]: [ 2, ++a ],
		[ map[ 'Twin 127mm MK12 Dual Gun/SR' ] ]:                     [ 2, ++a ],
		[ map[ 'Single 138.6mm Main Gun (Mle 1929)/E' ] ]:            [ 3, ++a ],
		[ map[ 'Twin 127mm MK12 Dual Gun/E' ] ]:                      [ 3, ++a ],
		[ map[ 'Twin 120mm Main Gun/E' ] ]:                           [ 4, ++a ],
		[ map[ 'Single 127mm Main Gun/E' ] ]:                         [ 4, ++a ]
	},
	'DD/Main': {
		[ map[ 'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Twin 130mm Main Gun (B-2LM)/SR' ] ]:                  [ 0, ++a ],
		[ map[ 'Twin 127mm Secondary Gun Mount/E' ] ]:                [ 1, ++a ],
		[ map[ 'Twin 128mm Dual Gun (SK C/41)/E' ] ]:                 [ 2, ++a ],
		[ map[ 'Twin 120mm Main Gun/E' ] ]:                           [ 3, ++a ]
	},
	'DD/Sub':  {
		[ map[ 'Twin 100mm (Type 98) AA Gun/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Twin 127mm MK12 Dual Gun/SR' ] ]:    [ 0, ++a ],
		[ map[ 'Twin 120mm Main Gun/E' ] ]:          [ 1, ++a ],
		[ map[ 'Twin 100mm (Type 98) AA Gun/E' ] ]:  [ 2, ++a ]
	},
	
	'CL':         {
		[ map[ 'Prototype Triple 152mm Main Gun (DP MK17)/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Triple 152mm Main Gun (B-38 MK5)/SR' ] ]:          [ 0, ++a ],
		[ map[ 'Prototype Triple 152mm Main Gun/SR' ] ]:           [ 1, ++a ],
		[ map[ 'Triple 152mm Main Gun Mount Mk16/SR' ] ]:          [ 1, ++a ],
		[ map[ 'Triple 152mm Main Gun (B-38 MK5)/E' ] ]:           [ 2, ++a ],
		[ map[ 'Twin 150mm Main Gun (TbtsK C/36)/E' ] ]:           [ 2, ++a ],
		[ map[ 'Triple 155mm Mounted Gun/SR' ] ]:                  [ 3, ++a ],
		[ map[ 'Triple 155mm Mounted Gun/E' ] ]:                   [ 4, ++a ],
		[ map[ 'Single 150mm Main Gun (SK C/28)/E' ] ]:            [ 4, ++a ]
	},
	'CL/AP':      {
		[ map[ 'Prototype Triple 152mm Main Gun/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Twin 150mm Main Gun (TbtsK C/36)/E' ] ]: [ 1, ++a ],
		[ map[ 'Single 150mm Main Gun (SK C/28)/E' ] ]:  [ 2, ++a ]
	},
	'CL/DD/Main': {
		[ map[ 'Prototype Triple 152mm Main Gun/SR' ] ]:  [ 0, a = 0 ],
		[ map[ 'Twin 152mm Main Gun/E' ] ]:               [ 0, ++a ],
		[ map[ 'Twin 150mm Main Gun (TbtsK C/36)/E' ] ]:  [ 1, ++a ],
		[ map[ 'Triple 152mm Main Gun Mount Mk16/SR' ] ]: [ 1, ++a ],
		[ map[ 'Triple 152mm Main Gun2/E' ] ]:            [ 2, ++a ],
		[ map[ 'Triple 155mm Mounted Gun/SR' ] ]:         [ 2, ++a ],
		[ map[ 'Triple 152mm Main Gun/E' ] ]:             [ 3, ++a ]
	},
	get 'CL/AA'() {
		return this[ 'CL' ];
	},
	get 'CL/DB'() {
		return this[ 'CL/DD/Main' ];
	},
	
	'CA':          {
		[ map[ 'Prototype Triple 234mm Main Gun (9.2" MK XII)/UR' ] ]: [ 0, a = 0 ],
		[ map[ 'Prototype Twin 234mm Main Gun (9.2" MK XII)/SR' ] ]:   [ 0, ++a ],
		[ map[ 'Triple 203mm Main Gun Mount Mk15/SR' ] ]:              [ 1, ++a ],
		[ map[ 'Prototype Triple 203mm Main Gun (SK C)/SR' ] ]:        [ 1, ++a ],
		[ map[ 'Twin 203mm Main Gun (SK C)/SR' ] ]:                    [ 1, ++a ],
		[ map[ 'Twin 203mm Main Gun (Mle 1924)/SR' ] ]:                [ 2, ++a ],
		[ map[ 'Prototype Triple 203mm Main Gun Mount Mk IX/SR' ] ]:   [ 2, ++a ],
		[ map[ 'Prototype 203mm (Type 3) Mounted Gun/SR' ] ]:          [ 3, ++a ],
		[ map[ 'Prototype Triple 203mm AA Gun/SR' ] ]:                 [ 3, ++a ],
		[ map[ 'Twin 203mm Main Gun (SK C)/E' ] ]:                     [ 4, ++a ],
		[ map[ '203mm Mounted Gun/E' ] ]:                              [ 4, ++a ]
	},
	'CA/HE':       {
		[ map[ 'Twin 203mm Main Gun (Mle 1924)/SR' ] ]:              [ 0, a = 0 ],
		[ map[ 'Prototype Triple 203mm Main Gun Mount Mk IX/SR' ] ]: [ 1, ++a ],
		[ map[ 'Prototype 203mm (Type 3) Mounted Gun/SR' ] ]:        [ 2, ++a ],
		[ map[ 'Prototype Triple 203mm AA Gun/SR' ] ]:               [ 2, ++a ],
		[ map[ '203mm Mounted Gun/E' ] ]:                            [ 3, ++a ]
	},
	'CA/Modified': {
		[ map[ 'Prototype Triple 234mm Main Gun (9.2" MK XII)/UR' ] ]: [ 0, a = 0 ],
		[ map[ 'Prototype Triple 203mm Main Gun (SK C)/SR' ] ]:        [ 0, ++a ],
		[ map[ 'Twin 203mm Main Gun (SK C)/SR' ] ]:                    [ 1, ++a ],
		[ map[ 'Triple 203mm Main Gun Mount Mk15/SR' ] ]:              [ 2, ++a ],
		[ map[ 'Twin 203mm Main Gun (SK C)/E' ] ]:                     [ 3, ++a ]
	},
	'CA/BB':       {
		[ map[ 'Prototype Triple 234mm Main Gun (9.2" MK XII)/UR' ] ]: [ 0, a = 0 ],
		[ map[ 'Triple 283mm Main Gun (SK C/28)/E' ] ]:                [ 0, ++a ],
		[ map[ 'Prototype Twin 234mm Main Gun (9.2" MK XII)/SR' ] ]:   [ 0, ++a ],
		[ map[ 'Triple 203mm Main Gun Mount Mk15/SR' ] ]:              [ 1, ++a ],
		[ map[ 'Prototype Triple 203mm Main Gun (SK C)/SR' ] ]:        [ 1, ++a ],
		[ map[ 'Twin 203mm Main Gun (SK C)/SR' ] ]:                    [ 1, ++a ],
		[ map[ 'Twin 203mm Main Gun (Mle 1924)/SR' ] ]:                [ 2, ++a ],
		[ map[ 'Prototype Triple 203mm Main Gun Mount Mk IX/SR' ] ]:   [ 2, ++a ],
		[ map[ 'Prototype 203mm (Type 3) Mounted Gun/SR' ] ]:          [ 3, ++a ],
		[ map[ 'Prototype Triple 203mm AA Gun/SR' ] ]:                 [ 3, ++a ],
		[ map[ 'Twin 203mm Main Gun (SK C)/E' ] ]:                     [ 4, ++a ],
		[ map[ '203mm Mounted Gun/E' ] ]:                              [ 4, ++a ]
	},
	get 'CA/CL'() {
		return this[ 'CA' ];
	},
	'CA/CB': {
		[ map[ 'Prototype Triple 310mm Main Gun (Type 0)/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Triple 283mm Main Gun (SK C/28)/E' ] ]:           [ 1, ++a ]
	},
	
	'BB/Damage':   {
		[ map[ 'Prototype Triple 381mm AA Gun/SR' ] ]:             [ 0, a = 0 ],
		[ map[ 'Prototype Twin 457mm Main Gun (18" MKA)/UR' ] ]:   [ 0, ++a ],
		[ map[ 'Triple 406mm MK6 Main Gun/E' ] ]:                  [ 1, ++a ],
		[ map[ 'Prototype Triple 406mm/50 Main Gun/SR' ] ]:        [ 2, ++a ],
		[ map[ 'Prototype Triple 410mm Mounted Gun/SR' ] ]:        [ 3, ++a ],
		[ map[ 'Prototype Triple 406mm Main Gun Mount MkD/SR' ] ]: [ 3, ++a ]
	},
	'BB/Speed':    {
		[ map[ 'Prototype Twin 406mm Main Gun (SK C/34)/SR' ] ]:   [ 0, a = 0 ],
		[ map[ 'Prototype Triple 305mm Main Gun (SK C/39)/SR' ] ]: [ 0, ++a ],
		[ map[ 'Prototype Twin 457mm Main Gun (18" MKA)/UR' ] ]:   [ 0, ++a ],
		[ map[ 'Twin 381mm Advanced Main Gun/SR' ] ]:              [ 1, ++a ],
		[ map[ '410mm Mounted Gun/E' ] ]:                          [ 2, ++a ],
		[ map[ 'Twin 380mm Main Gun (SK C)/SR' ] ]:                [ 3, ++a ],
		[ map[ 'Twin 406mm Main Gun Mount Mk8/E' ] ]:              [ 3, ++a ]
	},
	'BB/Modified': {
		[ map[ 'Prototype Twin 457mm Main Gun (18" MKA)/UR' ] ]:   [ 0, a = 0 ],
		[ map[ 'Prototype Triple 406mm/50 Main Gun/SR' ] ]:        [ 0, ++a ],
		[ map[ 'Triple 406mm Main Gun/SR' ] ]:                     [ 1, ++a ],
		[ map[ 'Prototype Triple 410mm Mounted Gun/SR' ] ]:        [ 2, ++a ],
		[ map[ 'Prototype Triple 406mm Main Gun Mount MkD/SR' ] ]: [ 2, ++a ],
		[ map[ 'Triple 406mm MK6 Main Gun/E' ] ]:                  [ 3, ++a ]
	},
	
	'F':  {
		[ map[ 'F7F Tigercat/SR' ] ]:                          [ 0, a = 0 ],
		[ map[ 'Sea Hornet/SR' ] ]:                            [ 0, ++a ],
		[ map[ 'F4U (VF-17 "Pirate" Squad)/SR' ] ]:            [ 1, ++a ],
		[ map[ 'F6F Hellcat/SR' ] ]:                           [ 1, ++a ],
		[ map[ 'Kawanishi N1K3-A Shiden Kai 2/SR' ] ]:         [ 2, ++a ],
		[ map[ 'A7M Reppuu/SR' ] ]:                            [ 2, ++a ],
		[ map[ 'Sea Fury/SR' ] ]:                              [ 2, ++a ],
		[ map[ 'Seafang/SR' ] ]:                               [ 2, ++a ],
		[ map[ 'F4U Corsair/E' ] ]:                            [ 3, ++a ],
		[ map[ 'A7M Reppuu/E' ] ]:                             [ 3, ++a ],
		[ map[ 'F6F Hellcat/E' ] ]:                            [ 3, ++a ],
		[ map[ 'Seafang/E' ] ]:                                [ 3, ++a ],
		[ map[ 'F8F Bearcat/SR' ] ]:                           [ 4, ++a ],
		[ map[ 'A6M5 Zero/SR' ] ]:                             [ 4, ++a ],
		[ map[ 'Seafire FR.47/SR' ] ]:                         [ 4, ++a ],
		[ map[ 'Brewster F2A Buffalo (Thach Squadron)/SR' ] ]: [ 4, ++a ],
		[ map[ 'Messerschmitt Me-155A/SR' ] ]:                 [ 4, ++a ]
	},
	'DB': {
		[ map[ 'Experimental XSB3C-1/SR' ] ]:              [ 0, a = 0 ],
		[ map[ 'SB2C Helldiver/E' ] ]:                     [ 1, ++a ],
		[ map[ 'Suisei Model 12A/SR' ] ]:                  [ 1, ++a ],
		[ map[ 'Ju-87C Dive Bomber/E' ] ]:                 [ 2, ++a ],
		[ map[ 'Fairey Firefly/SR' ] ]:                    [ 2, ++a ],
		[ map[ 'Comet/SR' ] ]:                             [ 2, ++a ],
		[ map[ 'SBD Dauntless (McClusky Division)/SR' ] ]: [ 3, ++a ],
		[ map[ 'BTD-1 Destroyer/SR' ] ]:                   [ 3, ++a ],
		[ map[ 'Fairey Barracuda (831 Squadron)/SR' ] ]:   [ 3, ++a ]
	},
	'TB': {
		[ map[ 'Wyvern/UR' ] ]:                         [ 0, a = 0 ],
		[ map[ 'XBT2D-1 Destroyer II/SR' ] ]:           [ 0, ++a ],
		[ map[ 'Aichi B7A Ryusei/SR' ] ]:               [ 0, ++a ],
		[ map[ 'Ju-87 D-4/SR' ] ]:                      [ 0, ++a ],
		[ map[ 'Barracuda/SR' ] ]:                      [ 1, ++a ],
		[ map[ 'Firecrest/SR' ] ]:                      [ 1, ++a ],
		[ map[ 'Blackburn Firebrand/SR' ] ]:            [ 1, ++a ],
		[ map[ 'Tenzan Kai/E' ] ]:                      [ 1, ++a ],
		[ map[ 'TBM Avenger (VT-18 Squadron)/SR' ] ]:   [ 2, ++a ],
		[ map[ 'TBD Devastator (VT-8 Squadron)/SR' ] ]: [ 2, ++a ],
		[ map[ 'Barracuda/E' ] ]:                       [ 3, ++a ],
		[ map[ 'Aichi B7A Ryusei/E' ] ]:                [ 3, ++a ],
		[ map[ 'Nakajima B6N Tenzan/E' ] ]:             [ 3, ++a ],
		[ map[ 'Swordfish (818 Squad)/SR' ] ]:          [ 4, ++a ],
		[ map[ 'Fairey Albacore/E' ] ]:                 [ 4, ++a ]
	},
	get 'F/DB'() {
		return this[ 'F' ];
	},
	get 'DB/TB'() {
		return this[ 'DB' ];
	},
	get 'P'() {
		return this[ 'F' ];
	},
	
	'SP':  {
		[ map[ 'Suisei Model 21/SR' ] ]:        [ 0, a = 0 ],
		[ map[ 'Seiran/E' ] ]:                  [ 1, ++a ],
		[ map[ 'Aichi E16A Zuiun/E' ] ]:        [ 2, ++a ],
		[ map[ 'N1K1 Kyoufuu/E' ] ]:            [ 3, ++a ],
		[ map[ 'Type 2 Seaplane Fighter/E' ] ]: [ 3, ++a ]
	},
	'SSP': {
		[ map[ 'Seiran/E' ] ]:           [ 0, a = 0 ],
		[ map[ 'Aichi E16A Zuiun/E' ] ]: [ 1, ++a ]
	},
	'ST':  {
		[ map[ 'Mark 20 "Bidder" Submarine Torpedo/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'G7e Acoustic Guided Torpedo/SR' ] ]:        [ 0, ++a ],
		[ map[ 'Mark 16 Submarine Torpedo/SR' ] ]:          [ 0, ++a ],
		[ map[ 'Type 96 Submarine Torpedo/SR' ] ]:          [ 1, ++a ],
		[ map[ 'Mark 28 Submarine Torpedo/SR' ] ]:          [ 1, ++a ],
		[ map[ 'Type 95 Submarine Torpedo/SR' ] ]:          [ 1, ++a ],
		[ map[ 'Mark 12 "Ferry" Submarine Torpedo/SR' ] ]:  [ 1, ++a ],
		[ map[ 'G7e Acoustic Guided Torpedo/E' ] ]:         [ 2, ++a ],
		[ map[ 'G7a Submarine Torpedo/E' ] ]:               [ 2, ++a ],
		[ map[ 'Mark 16 Submarine Torpedo/E' ] ]:           [ 2, ++a ],
		[ map[ 'Type 95 Submarine Torpedo/E' ] ]:           [ 2, ++a ]
	},
	'SS':  {
		[ map[ 'Submarine-mounted Twin 203mm Cannon (Mle 1924)/R' ] ]: [ 0, a = 0 ]
	},
	
	'A/DD1':   {
		[ map[ 'Repair Tools/E' ] ]:    [ 0, a = 0 ],
		[ map[ 'Pyoko-Pyoko/SR' ] ]:    [ 0, ++a ],
		[ map[ 'Advanced Boiler/E' ] ]: [ 1, ++a ]
	},
	'A/DD2':   {
		[ map[ 'Intel Report - Arctic Stronghold/E' ] ]:          [ 0, a = 0 ],
		[ map[ 'High Performance Hydraulic Steering Gear/SR' ] ]: [ 1, ++a ],
		[ map[ 'Autoloader/E' ] ]:                                [ 1, ++a ],
		[ map[ 'Repair Tools/E' ] ]:                              [ 2, ++a ],
		[ map[ 'Fire Suppressor/R' ] ]:                           [ 3, ++a ],
		[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]:              [ 3, ++a ]
	},
	'A/DD1/T': {
		[ map[ 'Repair Tools/E' ] ]:                 [ 0, a = 0 ],
		[ map[ 'Pyoko-Pyoko/SR' ] ]:                 [ 0, ++a ],
		[ map[ 'Advanced Boiler/E' ] ]:              [ 1, ++a ],
		[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]: [ 2, ++a ]
	},
	'A/DD2/T': {
		[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]: [ 0, a = 0 ],
		[ map[ 'Repair Tools/E' ] ]:                 [ 1, ++a ],
		[ map[ 'Autoloader/E' ] ]:                   [ 2, ++a ],
		[ map[ 'Fire Suppressor/R' ] ]:              [ 3, ++a ]
	},
	'A/CL1':   {
		[ map[ 'Repair Tools/E' ] ]:       [ 0, ++a ],
		[ map[ 'Fuel Filter/E' ] ]:        [ 1, ++a ],
		[ map[ 'Anti-Torpedo Bulge/E' ] ]: [ 2, ++a ]
	},
	'A/CL2':   {
		[ map[ 'High Performance Hydraulic Steering Gear/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Beaver Squad Tag/SR' ] ]:                         [ 0, ++a ],
		[ map[ 'High Performance Air Radar/SR' ] ]:               [ 0, ++a ],
		[ map[ 'Hydraulic Steering Gear/R' ] ]:                   [ 1, ++a ],
		[ map[ 'Navy Camouflage/R' ] ]:                           [ 1, ++a ],
		[ map[ 'Air Radar/E' ] ]:                                 [ 2, ++a ]
	},
	'A/CL1/T': {
		[ map[ 'Repair Tools/E' ] ]:                 [ 0, a = 0 ],
		[ map[ 'Fuel Filter/E' ] ]:                  [ 1, ++a ],
		[ map[ 'Anti-Torpedo Bulge/E' ] ]:           [ 2, ++a ],
		[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]: [ 3, ++a ]
	},
	'A/CL2/T': {
		[ map[ 'High Performance Hydraulic Steering Gear/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Beaver Squad Tag/SR' ] ]:                         [ 0, ++a ],
		[ map[ 'High Performance Air Radar/SR' ] ]:               [ 0, ++a ],
		[ map[ 'Hydraulic Steering Gear/R' ] ]:                   [ 1, ++a ],
		[ map[ 'Navy Camouflage/R' ] ]:                           [ 1, ++a ],
		[ map[ 'Air Radar/E' ] ]:                                 [ 2, ++a ],
		[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]:              [ 3, ++a ]
	},
	'A/CA1':   {
		[ map[ 'Repair Tools/E' ] ]:       [ 0, a = 0 ],
		[ map[ 'Fuel Filter/E' ] ]:        [ 1, ++a ],
		[ map[ 'Anti-Torpedo Bulge/E' ] ]: [ 2, ++a ]
	},
	'A/CA2':   {
		[ map[ 'High Performance Hydraulic Steering Gear/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Beaver Squad Tag/SR' ] ]:                         [ 0, ++a ],
		[ map[ 'Cosmic Kicks/SR' ] ]:                             [ 0, ++a ],
		[ map[ 'Hydraulic Steering Gear/R' ] ]:                   [ 1, ++a ],
		[ map[ 'Navy Camouflage/R' ] ]:                           [ 1, ++a ],
		[ map[ 'SG Radar/SR' ] ]:                                 [ 2, ++a ],
		[ map[ 'SG Radar/E' ] ]:                                  [ 2, ++a ],
		[ map[ 'Fire Control Radar/E' ] ]:                        [ 2, ++a ],
		[ map[ 'Gyroscope/E' ] ]:                                 [ 3, ++a ]
	},
	'A/CA1/T': {
		[ map[ 'Repair Tools/E' ] ]:                 [ 0, a = 0 ],
		[ map[ 'Fuel Filter/E' ] ]:                  [ 1, ++a ],
		[ map[ 'Anti-Torpedo Bulge/E' ] ]:           [ 2, ++a ],
		[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]: [ 3, ++a ]
	},
	'A/CA2/T': {
		[ map[ 'High Performance Hydraulic Steering Gear/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Beaver Squad Tag/SR' ] ]:                         [ 0, ++a ],
		[ map[ 'Cosmic Kicks/SR' ] ]:                             [ 0, ++a ],
		[ map[ 'Hydraulic Steering Gear/R' ] ]:                   [ 1, ++a ],
		[ map[ 'Navy Camouflage/R' ] ]:                           [ 1, ++a ],
		[ map[ 'SG Radar/SR' ] ]:                                 [ 2, ++a ],
		[ map[ 'SG Radar/E' ] ]:                                  [ 2, ++a ],
		[ map[ 'Gyroscope/E' ] ]:                                 [ 3, ++a ],
		[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]:              [ 3, ++a ]
	},
	'A/CB1':   {
		[ map[ 'VH Armor Plating/SR' ] ]:  [ 0, a = 0 ],
		[ map[ 'Repair Tools/E' ] ]:       [ 1, ++a ],
		[ map[ 'Fuel Filter/E' ] ]:        [ 2, ++a ],
		[ map[ 'Anti-Torpedo Bulge/E' ] ]: [ 3, ++a ]
	},
	get 'A/CB2'() {
		return this[ 'A/CA2' ];
	},
	'A/BB1': {
		[ map[ 'Type 1 Piercing Shell/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Type 91 Piercing Shell/E' ] ]: [ 1, ++a ]
	},
	'A/BB2': {
		[ map[ 'Super Heavy Shell/SR' ] ]:                [ 0, a = 0 ],
		[ map[ 'High Standard Fire-Control Radar/SR' ] ]: [ 1, ++a ],
		[ map[ 'Nelson\'s Pennant of Victory/SR' ] ]:     [ 2, ++a ],
		[ map[ 'SG Radar/SR' ] ]:                         [ 2, ++a ],
		[ map[ 'Fire Control Radar/E' ] ]:                [ 3, ++a ],
		[ map[ 'SG Radar/E' ] ]:                          [ 3, ++a ],
		[ map[ 'Fire Suppressor/R' ] ]:                   [ 4, ++a ]
	},
	get 'A/BBV1'() {
		return this[ 'A/BB1' ];
	},
	get 'A/BBV2'() {
		return this[ 'A/BB2' ];
	},
	'A/CV1': {
		[ map[ 'Steam Catapult/SR' ] ]:   [ 0, a = 0 ],
		[ map[ 'Aviation Oil Tank/E' ] ]: [ 1, ++a ],
		[ map[ 'Steam Catapult/E' ] ]:    [ 1, ++a ]
		
	},
	'A/CV2': {
		[ map[ 'Steam Catapult/SR' ] ]:       [ 0, a = 0 ],
		[ map[ 'Frontier Medal/SR' ] ]:       [ 0, ++a ],
		[ map[ 'Homing Beacon/E' ] ]:         [ 1, ++a ],
		[ map[ 'Aviation Oil Tank/E' ] ]:     [ 2, ++a ],
		[ map[ '100/150 Aviation Fuel/E' ] ]: [ 2, ++a ],
		[ map[ 'Steam Catapult/E' ] ]:        [ 2, ++a ]
	},
	'A/SS1': {
		[ map[ 'Improved Snorkel/SR' ] ]:            [ 0, a = 0 ],
		[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]: [ 0, ++a ],
		[ map[ 'Fuel Filter/E' ] ]:                  [ 1, ++a ]
	},
	'A/SS2': {
		[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]:   [ 0, a = 0 ],
		[ map[ 'Pressure-Resistant Hull Design/E' ] ]: [ 0, ++a ],
		[ map[ 'Autoloader/E' ] ]:                     [ 1, ++a ]
	},
	'A/AR':  {
		[ map[ 'High Performance Air Radar/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Repair Toolkit/SR' ] ]:             [ 0, ++a ],
		[ map[ 'Fuel Filter/E' ] ]:                 [ 1, ++a ]
	},
	'A/AR1': {
		[ map[ 'High Performance Air Radar/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Air Radar/E' ] ]:                   [ 1, ++a ]
	},
	'A/AR2': {
		[ map[ 'High Performance Air Radar/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Air Radar/E' ] ]:                   [ 1, ++a ]
	},
	'A/BM1': {
		[ map[ 'Repair Tools/E' ] ]:                      [ 0, a = 0 ],
		[ map[ 'High Standard Fire-Control Radar/SR' ] ]: [ 1, ++a ],
		[ map[ 'Fire Control Radar/E' ] ]:                [ 2, ++a ]
	},
	'A/BM2': {
		[ map[ 'High Standard Fire-Control Radar/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'SG Radar/SR' ] ]:                         [ 0, ++a ],
		[ map[ 'Fire Control Radar/E' ] ]:                [ 1, ++a ],
		[ map[ 'Repair Tools/E' ] ]:                      [ 1, ++a ],
		[ map[ 'SG Radar/E' ] ]:                          [ 2, ++a ],
		[ map[ 'Fire Suppressor/R' ] ]:                   [ 3, ++a ]
	},
	'A/AE1': {
		[ map[ 'Beaver Squad Tag/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Fuel Filter/E' ] ]:       [ 1, ++a ]
	},
	'A/AE2': {
		[ map[ 'High Performance Hydraulic Steering Gear/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Hydraulic Steering Gear/R' ] ]:                   [ 1, ++a ],
		[ map[ 'Navy Camouflage/R' ] ]:                           [ 1, ++a ]
	},
	
	'C': {
		[ map[ '40cm Type 94 Naval Gun Parts (Cargo)/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Aviation Materials (Cargo)/E' ] ]:            [ 1, ++a ],
		[ map[ 'Small-Caliber Naval Gun Parts (Cargo)/E' ] ]: [ 1, ++a ],
		[ map[ 'Torpedo Materials (Cargo)/E' ] ]:             [ 1, ++a ]
	}
	
	// [ map[ '/SR' ] ]: [0, ++a],
};

// type of weapon that can be equipped at each slot
export const equippable = {
	'T':         [ type.T ],
	'AA/Damage': [ type.AA ],
	'AA':        [ type.AA ],
	'AA/Speed':  [ type.AA ],
	'AA/Main':   [ type.AA ],
	
	'DD':          [ type.DD ],
	'DD/Speed':    [ type.DD ],
	'DD/SSpeed':   [ type.DD ],
	'DD/SSSpeed':  [ type.DD ],
	'DD/AP':       [ type.DD ],
	'DD/AP/Speed': [ type.DD ],
	'CL/DD':       [ type.CL, type.DD ],
	'CL/DD/Speed': [ type.CL, type.DD ],
	'T/DD':        [ type.T, type.DD ],
	'DD/Aux':      [ type.DD ],
	'DD/Main':     [ type.DD ],
	'DD/Sub':      [ type.DD ],
	
	'CL':         [ type.CL ],
	'CL/AP':      [ type.CL ],
	'CL/DD/Main': [ type.CL ],
	'CL/AA':      [ type.CL, type.AA ],
	'CL/DB':      [ type.CL, type.DB ],
	
	'CA':          [ type.CA ],
	'CA/HE':       [ type.CA ],
	'CA/Modified': [ type.CA ],
	'CA/BB':       [ type.CA ],
	'CA/CL':       [ type.CA, type.CL ],
	'CA/CB':       [ type.CA ],
	
	'BB/Damage':   [ type.BB ],
	'BB/Speed':    [ type.BB ],
	'BB/Modified': [ type.BB ],
	
	'F':     [ type.F ],
	'DB':    [ type.DB ],
	'TB':    [ type.TB ],
	'F/DB':  [ type.F, type.DB ],
	'DB/TB': [ type.DB, type.TB ],
	'P':     [ type.F, type.DB, type.TB ],
	
	'SP':  [ type.SP, type.SSP ],
	'SSP': [ type.SSP ],
	'ST':  [ type.ST ],
	'SS':  [ type.SS ],
	
	'A/DD1':   [ type.A ],
	'A/DD2':   [ type.A ],
	'A/DD1/T': [ type.A ],
	'A/DD2/T': [ type.A ],
	'A/CL1':   [ type.A ],
	'A/CL2':   [ type.A ],
	'A/CL1/T': [ type.A ],
	'A/CL2/T': [ type.A ],
	'A/CA1':   [ type.A ],
	'A/CA2':   [ type.A ],
	'A/CA1/T': [ type.A ],
	'A/CA2/T': [ type.A ],
	'A/CB1':   [ type.A ],
	'A/CB2':   [ type.A ],
	'A/BB1':   [ type.A ],
	'A/BB2':   [ type.A ],
	'A/BBV1':  [ type.A ],
	'A/BBV2':  [ type.A ],
	'A/CV1':   [ type.A ],
	'A/CV2':   [ type.A ],
	'A/SS1':   [ type.A ],
	'A/SS2':   [ type.A ],
	'A/AR':    [ type.A ],
	'A/AR1':   [ type.A ],
	'A/AR2':   [ type.A ],
	'A/BM1':   [ type.A ],
	'A/BM2':   [ type.A ],
	'A/AE1':   [ type.A ],
	'A/AE2':   [ type.A ],
	
	'C': [ type.C, type.A ]
};
