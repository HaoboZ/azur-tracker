// noinspection SpellCheckingInspection

enum type {
	T,
	AA,
	DD,
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
	[ type.T ]  : 'Torpedo',
	[ type.AA ] : 'Anti-Air Gun',
	[ type.DD ] : 'Destroyer Gun',
	[ type.CL ] : 'Light Cruiser Gun',
	[ type.CA ] : 'Heavy/Large Cruiser Gun',
	[ type.CB ] : 'Heavy/Large Cruiser Gun',
	[ type.SS ] : 'Heavy/Large Cruiser Gun',
	[ type.BB ] : 'Battleship Gun',
	[ type.F ]  : 'Fighter',
	[ type.DB ] : 'Dive Bomber',
	[ type.TB ] : 'Torpedo Bomber',
	[ type.ST ] : 'Submarine Torpedo',
	[ type.SP ] : 'Sea Plane',
	[ type.SSP ]: 'Sea Plane',
	[ type.A ]  : 'Auxiliary',
	[ type.C ]  : 'Cargo'
};

enum rarity {
	UR = 'UR',
	SR = 'SR',
	E = 'E',
	R = 'R',
	N = 'N'
}

interface Equip {
	id: number,
	name: string,
	image: string,
	type: type,
	rarity: rarity
}

// list of equips sorted by type
const equipData: Equip[] = [
	{ id: 0, name: '', image: 'Azur_Lane_Wiki', type: undefined as type, rarity: undefined as rarity },
	//region Torpedo
	{
		id    : 5140,
		name  : '533mm Quadruple Torpedo Mount',
		image : '533mm_Quadruple_Torpedo_Mount',
		type  : type.T,
		rarity: rarity.E
	},
	{
		id    : 5220,
		name  : '533mm Quintuple Torpedo Mount',
		image : '533mm_Quintuple_Torpedo_Mount',
		type  : type.T,
		rarity: rarity.E
	},
	{
		id    : 5240,
		name  : '533mm Quintuple Torpedo Mount',
		image : '533mm_Quintuple_Torpedo_Mount',
		type  : type.T,
		rarity: rarity.SR
	},
	{
		id    : 15220,
		name  : '533mm Quadruple Torpedo Mount Mk 17',
		image : '533mm_Quadruple_Torpedo_Mount_Mk_17',
		type  : type.T,
		rarity: rarity.E
	},
	{
		id    : 15240,
		name  : '533mm Quintuple Torpedo Mount Mk 17',
		image : '533mm_Quintuple_Torpedo_Mount_Mk_17',
		type  : type.T,
		rarity: rarity.SR
	},
	{
		id    : 25020,
		name  : '533mm Quadruple Torpedo Mount Mk IX',
		image : '533mm_Quadruple_Torpedo_Mount_Mk_IX',
		type  : type.T,
		rarity: rarity.E
	},
	{
		id    : 25040,
		name  : '533mm Quintuple Torpedo Mount Mk IX',
		image : '533mm_Quintuple_Torpedo_Mount_Mk_IX',
		type  : type.T,
		rarity: rarity.SR
	},
	{
		id    : 35220,
		name  : '610mm Quadruple Torpedo Mount',
		image : '610mm_Quadruple_Torpedo_Mount',
		type  : type.T,
		rarity: rarity.E
	},
	{
		id    : 35240,
		name  : '610mm Quadruple Torpedo Mount',
		image : '610mm_Quadruple_Torpedo_Mount',
		type  : type.T,
		rarity: rarity.SR
	},
	{
		id    : 35260,
		name  : '610mm Quadruple Torpedo Mount Kai',
		image : '610mm_Quadruple_Torpedo_Mount_Kai',
		type  : type.T,
		rarity: rarity.SR
	},
	{
		id    : 35300,
		name  : '610mm Quintuple Torpedo Mount',
		image : '610mm_Quintuple_Torpedo_Mount',
		type  : type.T,
		rarity: rarity.UR
	},
	
	{
		id    : 45040,
		name  : '533mm Triple Magnetic Torpedo Mount',
		image : '533mm_Triple_Homing_Torpedo_Mount',
		type  : type.T,
		rarity: rarity.E
	},
	{
		id    : 45120,
		name  : '533mm Quadruple Magnetic Torpedo Mount',
		image : '533mm_Quadruple_Homing_Torpedo_Mount',
		type  : type.T,
		rarity: rarity.E
	},
	{
		id    : 45140,
		name  : '533mm Quadruple Magnetic Torpedo Mount',
		image : '533mm_Quadruple_Homing_Torpedo_Mount',
		type  : type.T,
		rarity: rarity.SR
	},
	{
		id    : 45200,
		name  : '533mm Quintuple Magnetic Torpedo Mount',
		image : '533mm_Quintuple_Homing_Torpedo_Mount',
		type  : type.T,
		rarity: rarity.E
	},
	{
		id    : 45220,
		name  : '533mm Quintuple Magnetic Torpedo Mount',
		image : '533mm_Quintuple_Homing_Torpedo_Mount',
		type  : type.T,
		rarity: rarity.SR
	},
	{
		id    : 45240,
		name  : '533mm Quintuple Magnetic Torpedo Mount',
		image : '533mm_Quintuple_Homing_Torpedo_Mount',
		type  : type.T,
		rarity: rarity.UR
	},
	//endregion
	//region Anti-Air
	{
		id    : 16080,
		name  : 'Twin 76mm Mk 27 RF AA Gun Mount',
		image : 'Twin_76mm_AA_(Mk_27_Mount)',
		type  : type.AA,
		rarity: rarity.SR
	},
	{
		id    : 16420,
		name  : 'Quadruple 40mm Bofors AA Gun Mount',
		image : 'Quadruple_40mm_Bofors_(Mk_2_Mount)',
		type  : type.AA,
		rarity: rarity.E
	},
	{
		id    : 16440,
		name  : 'Quadruple 40mm Bofors AA Gun Mount',
		image : 'Quadruple_40mm_Bofors_(Mk_2_Mount)',
		type  : type.AA,
		rarity: rarity.SR
	},
	{
		id    : 26220,
		name  : 'Octuple 40mm Pom-Pom Gun Mount',
		image : 'Octuple_40mm_Pom-Pom',
		type  : type.AA,
		rarity: rarity.E
	},
	{
		id    : 26240,
		name  : 'Octuple 40mm Pom-Pom Gun Mount',
		image : 'Octuple_40mm_Pom-Pom',
		type  : type.AA,
		rarity: rarity.SR
	},
	{ id: 26540, name: 'Twin 113mm AA Gun Mount', image: 'Twin_113mm_AA_(QF_Mark_I)', type: type.AA, rarity: rarity.SR },
	{ id: 26600, name: 'Twin 40mm Bofors STAAG', image: 'Twin_40mm_Bofors_STAAG', type: type.AA, rarity: rarity.SR },
	{
		id    : 26620,
		name  : 'Twin 40mm Bofors "Hazemeyer" AA Gun Mount',
		image : 'Twin_40mm_Bofors_Hazemeyer',
		type  : type.AA,
		rarity: rarity.SR
	},
	{ id: 26640, name: 'Twin 134mm AA Gun Mount', image: 'Twin_134mm_AA_(QF_Mark_I)', type: type.AA, rarity: rarity.SR },
	{
		id    : 26660,
		name  : 'Sextuple 40mm Bofors AA Gun Mount',
		image : 'Sextuple_40mm_Bofors',
		type  : type.AA,
		rarity: rarity.SR
	},
	{
		id    : 36360,
		name  : 'Triple 25mm Type 96 AT/AA Gun Mount',
		image : 'Triple_25mm_AA_(Type_96_Blast_Shield)',
		type  : type.AA,
		rarity: rarity.SR
	},
	{
		id    : 36560,
		name  : 'Twin 100mm Type 98 AA Gun Mount',
		image : 'Twin_100mm_AA_(Type_98)',
		type  : type.AA,
		rarity: rarity.SR
	},
	{
		id    : 36660,
		name  : 'Twin 127mm Type 89 AA Gun Mount',
		image : 'Twin_127mm_AA_(Type_89_A1_Mod_2)',
		type  : type.AA,
		rarity: rarity.SR
	},
	{
		id    : 36700,
		name  : 'Twin 40mm Bofors Type 5 AA Gun Mount',
		image : 'Twin_40mm_Bofors_(Type_5)',
		type  : type.AA,
		rarity: rarity.SR
	},
	{
		id    : 46340,
		name  : 'Twin 105mm SK C/33 AA Gun Mount',
		image : 'Twin_105mm_AA_(SK_C$2F33)',
		type  : type.AA,
		rarity: rarity.SR
	},
	{
		id    : 46360,
		name  : 'Twin 105mm SK C/33 na AA Gun Mount',
		image : 'Twin_105mm_AA_(SK_C$2F33_na)',
		type  : type.AA,
		rarity: rarity.SR
	},
	{
		id    : 90600,
		name  : 'Twin 37mm Mle 1936 AA Gun Mount',
		image : 'Twin_37mm_ACAD_(Mle_1936)',
		type  : type.AA,
		rarity: rarity.SR
	},
	{
		id    : 95140,
		name  : 'Single 90mm Model 1939 AA Gun',
		image : 'Single_90mm_AA_(Model_1939)',
		type  : type.AA,
		rarity: rarity.SR
	},
	{
		id    : 95160,
		name  : 'Prototype Twin 90mm Model 1939 High Angle Gun',
		image : 'Twin_90mm_AA_(Model_1939_Prototype)',
		type  : type.AA,
		rarity: rarity.SR
	},
	//endregion
	//region Destroyer
	{
		id    : 7240,
		name  : 'Single 130mm Naval Gun',
		image : 'Single_130mm_(B13_Pattern_1936)',
		type  : type.DD,
		rarity: rarity.E
	},
	{ id: 11040, name: '76mm AA Gun', image: 'Single_76mm_(3$22$2F50_caliber_gun)', type: type.DD, rarity: rarity.R },
	{
		id    : 11140,
		name  : 'Single 127mm Main Gun',
		image : 'Single_127mm_(5$22$2F38_Mk_30)',
		type  : type.DD,
		rarity: rarity.E
	},
	{
		id    : 11160,
		name  : 'Twin 127mm Secondary Gun Mount',
		image : 'Twin_127mm_(5$22$2F38_Mk_32)',
		type  : type.DD,
		rarity: rarity.E
	},
	{
		id    : 11220,
		name  : 'Twin 127mm Mk 12 Dual-Purpose Gun Mount',
		image : 'Twin_127mm_(5$22$2F38_Mk_38)',
		type  : type.DD,
		rarity: rarity.E
	},
	{
		id    : 11240,
		name  : 'Twin 127mm Mk 12 Dual-Purpose Gun Mount',
		image : 'Twin_127mm_(5$22$2F38_Mk_38)',
		type  : type.DD,
		rarity: rarity.SR
	},
	{
		id    : 21340,
		name  : 'Single 120mm QF Mark IX Naval Gun',
		image : 'Single_120mm_(QF_Mark_IX)',
		type  : type.DD,
		rarity: rarity.R
	},
	{ id: 21440, name: 'Twin 120mm Main Gun Mount', image: 'Twin_120mm_(QF_Mark_XII)', type: type.DD, rarity: rarity.E },
	{
		id    : 21460,
		name  : 'Twin 120mm Mk XI Dual-Purpose Gun Mount',
		image : 'Twin_120mm_(QF_Mark_XI)',
		type  : type.DD,
		rarity: rarity.SR
	},
	{
		id    : 21600,
		name  : 'Twin 114mm Mk IV Dual-Purpose Gun Mount',
		image : 'Twin_114mm_(QF_Mk_IV_Prototype)',
		type  : type.DD,
		rarity: rarity.SR
	},
	{
		id    : 31020,
		name  : 'Twin 100mm Type 98 High-Angle Gun',
		image : 'Twin_100mm_(Type_98)',
		type  : type.DD,
		rarity: rarity.E
	},
	{
		id    : 31040,
		name  : 'Twin 100mm Type 98 High-Angle Gun',
		image : 'Twin_100mm_(Type_98)',
		type  : type.DD,
		rarity: rarity.SR
	},
	{
		id    : 41140,
		name  : 'Twin 128mm SK C/41 Dual-Purpose Gun Mount',
		image : 'Twin_128mm_(SK_C$2F41)',
		type  : type.DD,
		rarity: rarity.E
	},
	{
		id    : 41160,
		name  : 'Twin 128mm/45 SK C/41 Dual-Purpose Gun Mount',
		image : 'Twin_128mm$2F45_SK_C$2F41',
		type  : type.DD,
		rarity: rarity.SR
	},
	{
		id    : 85040,
		name  : 'Twin 130mm B-2LM Main Gun Mount',
		image : 'Twin_130mm_(B-2LM)',
		type  : type.DD,
		rarity: rarity.SR
	},
	{
		id    : 90120,
		name  : 'Single 138.6mm Mle 1929 Naval Gun',
		image : 'Single_138.6mm_(Mle_1929)',
		type  : type.DD,
		rarity: rarity.E
	},
	{
		id    : 90140,
		name  : 'Single 138.6mm Mle 1929 Naval Gun',
		image : 'Single_138.6mm_(Mle_1929)',
		type  : type.DD,
		rarity: rarity.SR
	},
	{
		id    : 90740,
		name  : 'Single 138.6mm Mle 1927 Naval Gun',
		image : 'Single_138.6mm_(Mle_1927)',
		type  : type.DD,
		rarity: rarity.E
	},
	{
		id    : 95440,
		name  : 'Twin 120mm M1936 Main Gun Mount',
		image : 'Twin_120mm_(Model_1936)',
		type  : type.DD,
		rarity: rarity.E
	},
	//endregion
	//region Light Cruiser
	{
		id    : 12140,
		name  : 'Triple 152mm Main Gun',
		image : 'Triple_152mm_(6$22$2F47_Mk_16)',
		type  : type.CL,
		rarity: rarity.E
	},
	{
		id    : 12160,
		name  : 'Triple 152mm Mk 16 Main Gun Mount',
		image : 'Triple_152mm_(6$22$2F47_Mk_16)_Mod_1',
		type  : type.CL,
		rarity: rarity.SR
	},
	{
		id    : 12200,
		name  : 'Prototype Triple 152mm DP Mk 17 Main Gun Mount',
		image : 'Triple_152mm_(6$22$2F47_Mk_17_DP_Prototype)',
		type  : type.CL,
		rarity: rarity.SR
	},
	{ id: 22140, name: 'Twin 152mm Main Gun', image: 'Twin_152mm_(BL_6$22_Mk_XXIII)', type: type.CL, rarity: rarity.E },
	{
		id    : 22240,
		name  : 'Triple 152mm Main Gun2',
		image : 'Triple_152mm_(BL_6$22_Mk_XXIII)',
		type  : type.CL,
		rarity: rarity.E
	},
	{
		id    : 22260,
		name  : 'Prototype Triple 152mm Mk XXV Main Gun Mount',
		image : 'Triple_152mm_(BL_6$22_Mk_XXV_Prototype)',
		type  : type.CL,
		rarity: rarity.SR
	},
	{
		id    : 32220,
		name  : 'Triple 155mm Main Gun Mount',
		image : 'Triple_155mm_(3rd_Year_Type)',
		type  : type.CL,
		rarity: rarity.E
	},
	{
		id    : 32240,
		name  : 'Triple 155mm Main Gun Mount',
		image : 'Triple_155mm_(3rd_Year_Type)',
		type  : type.CL,
		rarity: rarity.SR
	},
	{
		id    : 42040,
		name  : 'Single 150mm SK C/28 Main Gun Mount',
		image : 'Single_150mm_(SK_C$2F28)',
		type  : type.CL,
		rarity: rarity.E
	},
	{
		id    : 42060,
		name  : 'Twin 150mm SK C/28 Secondary Gun Mount',
		image : 'Twin_150mm_(SK_C$2F28)',
		type  : type.CL,
		rarity: rarity.E
	},
	{
		id    : 42240,
		name  : 'Twin 150mm TbtsK C/36 Main Gun Mount',
		image : 'Twin_150mm_(TbtsK_C$2F36)',
		type  : type.CL,
		rarity: rarity.E
	},
	{
		id    : 85140,
		name  : 'Triple 152mm B-38 MK 5 Main Gun Mount',
		image : 'Triple_152mm_(MK-5)',
		type  : type.CL,
		rarity: rarity.E
	},
	{
		id    : 85160,
		name  : 'Triple 152mm B-38 MK 5 Main Gun Mount',
		image : 'Triple_152mm_(MK-5)',
		type  : type.CL,
		rarity: rarity.SR
	},
	{
		id    : 95640,
		name  : 'Triple 152mm Model 1934 Main Gun Mount',
		image : 'Triple_152mm_(Model_1934)',
		type  : type.CL,
		rarity: rarity.SR
	},
	//endregion
	//region Heavy Cruiser
	{
		id    : 7300,
		name  : 'Prototype Triple 203mm AA Gun',
		image : 'Triple_203mm_(Mle_1934_Prototype)',
		type  : type.CA,
		rarity: rarity.SR
	},
	{
		id    : 7340,
		name  : 'Twin 203mm Mle 1924 Submarine Gun Mount',
		image : 'Twin_203mm_(Mle_1924_Submarine-mount)',
		type  : type.SS,
		rarity: rarity.R
	},
	{
		id    : 13160,
		name  : 'Triple 203mm Mk 15 Main Gun Mount',
		image : 'Triple_203mm_(8$22$2F55_Mk_15)_T0',
		type  : type.CA,
		rarity: rarity.SR
	},
	{
		id    : 23100,
		name  : 'Prototype Twin 234mm Main Gun Mount',
		image : 'Twin_234mm_(BL_9.2$22_Mk_XII_Prototype)',
		type  : type.CA,
		rarity: rarity.SR
	},
	{
		id    : 23120,
		name  : 'Prototype Triple 234mm Main Gun Mount',
		image : 'Triple_234mm_(BL_9.2$22_Mk_XII_Prototype)',
		type  : type.CA,
		rarity: rarity.UR
	},
	{
		id    : 23200,
		name  : 'Prototype Triple 203mm Mk IX Main Gun Mount',
		image : 'Triple_203mm_(BL_Mk_IX_Prototype)',
		type  : type.CA,
		rarity: rarity.SR
	},
	{
		id    : 33040,
		name  : 'Twin 203mm Naval Gun Mount',
		image : 'Twin_203mm_(3rd_Year_Type)',
		type  : type.CA,
		rarity: rarity.E
	},
	{
		id    : 33060,
		name  : 'Prototype 203mm No. 3 Naval Gun Mount',
		image : 'Twin_203mm_(3rd_Year_Type_No._3_Prototype)',
		type  : type.CA,
		rarity: rarity.SR
	},
	{
		id    : 33100,
		name  : 'Prototype Triple 310mm Type 0 Main Gun Mount',
		image : 'Triple_310mm_(Type_0_Prototype)',
		type  : type.CB,
		rarity: rarity.SR
	},
	{ id: 43020, name: 'Twin 203mm (SK C/34)', image: 'Twin_203mm_(SK_C$2F34)', type: type.CA, rarity: rarity.E },
	{ id: 43040, name: 'Twin 203mm (SK C/34)', image: 'Twin_203mm_(SK_C$2F34)', type: type.CA, rarity: rarity.SR },
	{
		id    : 43060,
		name  : 'Prototype Triple 203mm SK C/34 Main Gun Mount',
		image : 'Triple_203mm_(SK_C$2F34_Prototype)',
		type  : type.CA,
		rarity: rarity.SR
	},
	{
		id    : 43140,
		name  : 'Triple 283mm SK C/28 Main Gun Mount',
		image : 'Triple_283mm_(SK_C$2F28)',
		type  : type.CA,
		rarity: rarity.E
	},
	{
		id    : 44400,
		name  : 'Prototype Triple 305mm SK C/39 Main Gun Mount (CB)',
		image : 'Triple_305mm_(SK_C$2F39_Prototype)$23CB_Variant',
		type  : type.CB,
		rarity: rarity.SR
	},
	{
		id    : 90220,
		name  : 'Twin 203mm Model 1927 Main Gun Mount',
		image : 'Twin_203mm_(Model_1927)',
		type  : type.CA,
		rarity: rarity.E
	},
	{
		id    : 90880,
		name  : 'Twin 203mm Mle 1931 Main Gun Mount',
		image : 'Twin_203mm_(Mle_1931)',
		type  : type.CA,
		rarity: rarity.E
	},
	{
		id    : 90900,
		name  : 'Twin 203mm Mle 1931 Main Gun Mount',
		image : 'Twin_203mm_(Mle_1931)',
		type  : type.CA,
		rarity: rarity.SR
	},
	{
		id    : 95200,
		name  : 'Twin 203mm Model 1927 Main Gun Mount',
		image : 'Twin_203mm_(Model_1927)',
		type  : type.CA,
		rarity: rarity.SR
	},
	//endregion
	//region Battleship
	{
		id    : 14260,
		name  : 'Twin 406mm Mk 8 Main Gun Mount',
		image : 'Twin_406mm_(16$22$2F45_Mk_8)',
		type  : type.BB,
		rarity: rarity.E
	},
	{
		id    : 14340,
		name  : 'Triple 406mm Mk 6 Main Gun Mount',
		image : 'Triple_406mm_(16$22$2F45_Mk_6)',
		type  : type.BB,
		rarity: rarity.E
	},
	{
		id    : 14360,
		name  : 'Prototype 406mm Mk D Main Gun Mount',
		image : 'Triple_406mm_(16$22$2F50_Mark_D_Mod_0_Prototype)',
		type  : type.BB,
		rarity: rarity.SR
	},
	{
		id    : 14380,
		name  : 'Triple 406mm Mk 2 Main Gun Mount',
		image : 'Triple_406mm_(16$22$2F50_Mk_2)',
		type  : type.BB,
		rarity: rarity.E
	},
	{
		id    : 14400,
		name  : 'Triple 406mm MK7 Main Gun',
		image : 'Triple_406mm_(16$22$2F50_Mk_7)',
		type  : type.BB,
		rarity: rarity.UR
	},
	{
		id    : 14500,
		name  : 'Prototype Twin 457mm Mk A Main Gun Mount',
		image : 'Twin_457mm_(Mark_A_Prototype)',
		type  : type.BB,
		rarity: rarity.UR
	},
	{
		id    : 24040,
		name  : 'Quadruple 356mm Main Gun Mount',
		image : 'Quadruple_356mm_(BL_14$22_Mk_VII)',
		type  : type.BB,
		rarity: rarity.SR
	},
	{
		id    : 24160,
		name  : 'Prototype Triple 381mm AA Gun',
		image : 'Triple_381mm_(BL_15$22_Mk_III_Prototype)',
		type  : type.BB,
		rarity: rarity.SR
	},
	{ id: 24220, name: 'Triple 406mm Main Gun', image: 'Triple_406mm_(BL_16$22_Mk_I)', type: type.BB, rarity: rarity.E },
	{
		id    : 24240,
		name  : 'Triple 406mm Main Gun',
		image : 'Triple_406mm_(BL_16$22_Mk_I)',
		type  : type.BB,
		rarity: rarity.SR
	},
	{
		id    : 24340,
		name  : 'Twin 381mm Advanced Main Gun Mount',
		image : 'Twin_381mm_(BL_15$22_Mk_II)',
		type  : type.BB,
		rarity: rarity.SR
	},
	{
		id    : 34140,
		name  : 'Twin 410mm Naval Gun Mount',
		image : 'Twin_410mm_(3rd_Year_Type)',
		type  : type.BB,
		rarity: rarity.E
	},
	{
		id    : 34160,
		name  : 'Twin 410mm (Type 3 Shell) Naval Gun Mount',
		image : 'Twin_410mm_(3rd_Year_Type)',
		type  : type.BB,
		rarity: rarity.SR
	},
	{
		id    : 34180,
		name  : 'Prototype Triple 410mm Main Gun Mount',
		image : 'Triple_410mm_(10th_Year_Type_Prototype)',
		type  : type.BB,
		rarity: rarity.SR
	},
	{
		id    : 34300,
		name  : 'Twin 410mm Kai Naval Gun Mount',
		image : 'Twin_410mm_(3rd_Year_Type)_Kai',
		type  : type.BB,
		rarity: rarity.E
	},
	{
		id    : 44040,
		name  : 'Triple 283mm SK C/34 Main Gun Mount',
		image : 'Triple_283mm_(SK_C$2F34)',
		type  : type.BB,
		rarity: rarity.E
	},
	{
		id    : 44140,
		name  : 'Twin 380mm SK C/34 Main Gun Mount',
		image : 'Twin_380mm_(SK_C$2F34)',
		type  : type.BB,
		rarity: rarity.SR
	},
	{
		id    : 44200,
		name  : 'Prototype 406mm SK C/34 Main Gun Mount',
		image : 'Twin_406mm_(SK_C$2F34_Prototype)',
		type  : type.BB,
		rarity: rarity.SR
	},
	{
		id    : 44300,
		name  : 'Prototype Triple 305mm SK C/39 Main Gun Mount (BB)',
		image : 'Triple_305mm_(SK_C$2F39_Prototype)$23BB_Variant',
		type  : type.BB,
		rarity: rarity.SR
	},
	{
		id    : 85320,
		name  : 'Triple 406mm MK-1 Main Gun Mount',
		image : 'Triple_406mm_(MK-1)',
		type  : type.BB,
		rarity: rarity.E
	},
	{
		id    : 85420,
		name  : 'Triple 305mm M1907 Main Gun Mount',
		image : 'Triple_305mm_(Pattern_1907)',
		type  : type.BB,
		rarity: rarity.R
	},
	{
		id    : 90440,
		name  : 'Quadruple 380mm Mle 1935 Main Gun Mount',
		image : 'Quadruple_380mm_(Mle_1935)',
		type  : type.BB,
		rarity: rarity.SR
	},
	{
		id    : 91000,
		name  : 'Prototype Triple 406mm /50 Main Gun Mount',
		image : 'Triple_406mm_(Mle_1938_Prototype)',
		type  : type.BB,
		rarity: rarity.SR
	},
	{
		id    : 95040,
		name  : 'Triple 381mm M1934 Main Gun Mount',
		image : 'Triple_381mm_(Model_1934)',
		type  : type.BB,
		rarity: rarity.SR
	},
	{
		id    : 95900,
		name  : 'Prototype Triple 406mm Model 1940 Main Gun',
		image : 'Triple_406mm_(Model_1940_Prototype)',
		type  : type.BB,
		rarity: rarity.SR
	},
	//endregion
	//region Fighter
	{
		id    : 17060,
		name  : 'F2A Buffalo (Thach Squadron)',
		image : 'Brewster_F2A_Buffalo_(Thach_Squadron)',
		type  : type.F,
		rarity: rarity.SR
	},
	{ id: 17240, name: 'F4U Corsair', image: 'Vought_F4U_Corsair', type: type.F, rarity: rarity.E },
	{
		id    : 17260,
		name  : 'F4U (VF-17 "Pirate" Squad)',
		image : 'Vought_F4U_Corsair_(VF-17_Squadron)',
		type  : type.F,
		rarity: rarity.SR
	},
	{ id: 17320, name: 'F6F Hellcat', image: 'Grumman_F6F_Hellcat', type: type.F, rarity: rarity.E },
	{ id: 17340, name: 'F6F Hellcat', image: 'Grumman_F6F_Hellcat', type: type.F, rarity: rarity.SR },
	{ id: 17360, name: 'F7F Tigercat', image: 'Grumman_F7F_Tigercat', type: type.F, rarity: rarity.SR },
	{ id: 17380, name: 'F8F Bearcat', image: 'Grumman_F8F_Bearcat', type: type.F, rarity: rarity.SR },
	{ id: 27060, name: 'Seafire FR.47', image: 'Supermarine_Seafire_FR_Mk_47', type: type.F, rarity: rarity.SR },
	{ id: 27120, name: 'Seafang', image: 'Supermarine_Seafang', type: type.F, rarity: rarity.E },
	{ id: 27140, name: 'Seafang', image: 'Supermarine_Seafang', type: type.F, rarity: rarity.SR },
	{ id: 27300, name: 'Sea Fury', image: 'Hawker_Sea_Fury', type: type.F, rarity: rarity.SR },
	{ id: 27320, name: 'Sea Hornet', image: 'De_Havilland_Sea_Hornet', type: type.F, rarity: rarity.SR },
	{ id: 37340, name: 'A7M Reppuu', image: 'Mitsubishi_A7M_Reppuu', type: type.F, rarity: rarity.SR },
	{ id: 37240, name: 'Type 0 Fighter Model 52', image: 'Mitsubishi_A6M5_Zero', type: type.F, rarity: rarity.SR },
	{ id: 37320, name: 'A7M Reppuu', image: 'Mitsubishi_A7M_Reppuu', type: type.F, rarity: rarity.E },
	{
		id    : 37400,
		name  : 'Kawanishi N1K3-A Shiden Kai 2',
		image : 'Kawanishi_N1K3-A_Shiden_Kai_2',
		type  : type.F,
		rarity: rarity.SR
	},
	{ id: 47140, name: 'Messerschmitt Me-155A', image: 'Messerschmitt_Me-155A', type: type.F, rarity: rarity.SR },
	{
		id    : 47160,
		name  : 'Prototype BF-109G',
		image : 'Messerschmitt_Bf_109G_(Carrier-based_Prototype)',
		type  : type.F,
		rarity: rarity.SR
	},
	//endregion
	//region Dive Bomber
	{
		id    : 19060,
		name  : 'SBD Dauntless (McClusky Division)',
		image : 'Douglas_SBD_Dauntless_(McClusky)',
		type  : type.DB,
		rarity: rarity.SR
	},
	{ id: 19140, name: 'SB2C Helldiver', image: 'Curtiss_SB2C_Helldiver', type: type.DB, rarity: rarity.E },
	{ id: 19160, name: 'Experimental XSB3C-1', image: 'Curtiss_XSB3C_(Experimental)', type: type.DB, rarity: rarity.SR },
	{ id: 19240, name: 'BTD-1 Destroyer', image: 'Douglas_BTD-1_Destroyer', type: type.DB, rarity: rarity.SR },
	{ id: 29200, name: 'Firefly', image: 'Fairey_Firefly', type: type.DB, rarity: rarity.SR },
	{
		id    : 29300,
		name  : 'Barracuda (831 Squadron)',
		image : 'Fairey_Barracuda_(831_Squadron)',
		type  : type.DB,
		rarity: rarity.SR
	},
	{ id: 39140, name: 'Suisei', image: 'Yokosuka_D4Y_Suisei', type: type.DB, rarity: rarity.SR },
	{ id: 39160, name: 'Suisei Model 12A', image: 'Yokosuka_Suisei_Model_12A', type: type.DB, rarity: rarity.SR },
	{
		id    : 39340,
		name  : 'Prototype Tenrai',
		image : 'Nakajima_J5N_Tenrai_(Dive_Bomber_Prototype)',
		type  : type.DB,
		rarity: rarity.UR
	},
	{ id: 49040, name: 'Ju-87C Dive Bomber', image: 'Junkers_Ju-87C', type: type.DB, rarity: rarity.E },
	//endregion
	//region Torpedo Bomber
	{
		id    : 18060,
		name  : 'TBD Devastator (VT-8 Squadron)',
		image : 'Torpedo_Squadron_8_(VT-8)',
		type  : type.TB,
		rarity: rarity.SR
	},
	{
		id    : 18180,
		name  : 'TBM Avenger (VT-18 Squadron)',
		image : 'TBM_Avenger_(VT-18_Squadron)',
		type  : type.TB,
		rarity: rarity.SR
	},
	{ id: 18220, name: 'XTB2D-1 Skypirate', image: 'Douglas_XTB2D-1_Skypirate', type: type.TB, rarity: rarity.SR },
	{
		id    : 28060,
		name  : 'Swordfish (818 Squad)',
		image : 'Fairey_Swordfish_(818_Squadron)',
		type  : type.TB,
		rarity: rarity.SR
	},
	{ id: 28400, name: 'Wyvern', image: 'Westland_Wyvern', type: type.TB, rarity: rarity.UR },
	{ id: 28120, name: 'Barracuda', image: 'Fairey_Barracuda', type: type.TB, rarity: rarity.E },
	{ id: 28140, name: 'Barracuda', image: 'Fairey_Barracuda', type: type.TB, rarity: rarity.SR },
	{ id: 28200, name: 'Blackburn Firebrand', image: 'Blackburn_Firebrand', type: type.TB, rarity: rarity.SR },
	{ id: 28220, name: 'Firecrest', image: 'Blackburn_Firecrest', type: type.TB, rarity: rarity.SR },
	{ id: 28340, name: 'Albacore', image: 'Fairey_Albacore', type: type.TB, rarity: rarity.E },
	{ id: 38140, name: 'Tenzan', image: 'Nakajima_B6N_Tenzan', type: type.TB, rarity: rarity.E },
	{ id: 38160, name: 'Tenzan Kai', image: 'Nakajima_B6N2_Tenzan_Model_12A', type: type.TB, rarity: rarity.E },
	{ id: 38240, name: 'Aichi B7A Ryusei', image: 'Aichi_B7A_Ryusei', type: type.TB, rarity: rarity.SR },
	{
		id    : 38300,
		name  : 'Prototype Saiun Kai',
		image : 'Nakajima_C6N_Saiun_(Model_21_Prototype)',
		type  : type.TB,
		rarity: rarity.SR
	},
	{ id: 38220, name: 'Aichi B7A Ryusei', image: 'Aichi_B7A_Ryusei', type: type.TB, rarity: rarity.E },
	{ id: 48040, name: 'Ju-87 D-4', image: 'Junkers_Ju-87_D-4', type: type.TB, rarity: rarity.SR },
	//endregion
	//region Seaplane
	{ id: 37420, name: 'Type 2 Seaplane Fighter', image: 'Nakajima_A6M2-N', type: type.SP, rarity: rarity.E },
	{ id: 37440, name: 'N1K1 Kyoufuu', image: 'Kawanishi_N1K1_Kyoufuu', type: type.SP, rarity: rarity.E },
	{ id: 39240, name: 'Aichi E16A Zuiun', image: 'Aichi_E16A_Zuiun', type: type.SSP, rarity: rarity.E },
	{ id: 39320, name: 'Suisei Model 21', image: 'Yokosuka_Suisei_Model_21', type: type.SP, rarity: rarity.SR },
	{ id: 39300, name: 'Seiran', image: 'Aichi_M6A_Seiran', type: type.SSP, rarity: rarity.E },
	//endregion
	//region Submarine Torpedo
	{
		id    : 15120,
		name  : 'Mark 16 Submarine Torpedo',
		image : 'Submarine-mounted_Mark_16_Torpedo',
		type  : type.ST,
		rarity: rarity.E
	},
	{
		id    : 15140,
		name  : 'Mark 16 Submarine Torpedo',
		image : 'Submarine-mounted_Mark_16_Torpedo',
		type  : type.ST,
		rarity: rarity.SR
	},
	{
		id    : 15160,
		name  : 'Mark 28 Submarine Torpedo',
		image : 'Submarine-mounted_Mark_28_Torpedo',
		type  : type.ST,
		rarity: rarity.SR
	},
	{
		id    : 25200,
		name  : 'Mark 12 "Ferry" Submarine Torpedo',
		image : 'Submarine-mounted_Mark_12_Torpedo',
		type  : type.ST,
		rarity: rarity.SR
	},
	{
		id    : 25300,
		name  : 'Mark 20 "Bidder" Submarine Torpedo',
		image : 'Submarine-mounted_Mark_20S_$22Bidder$22_Torpedo',
		type  : type.ST,
		rarity: rarity.SR
	},
	{
		id    : 35520,
		name  : 'Type 95 Submarine Torpedo',
		image : 'Submarine-mounted_Type_95_Oxygen_Torpedo',
		type  : type.ST,
		rarity: rarity.E
	},
	{
		id    : 35540,
		name  : 'Type 95 Submarine Torpedo',
		image : 'Submarine-mounted_Type_95_Oxygen_Torpedo',
		type  : type.ST,
		rarity: rarity.SR
	},
	{
		id    : 35560,
		name  : 'Type 96 Submarine Torpedo',
		image : 'Submarine-mounted_Type_96_Oxygen_Torpedo',
		type  : type.ST,
		rarity: rarity.SR
	},
	{
		id    : 45340,
		name  : 'G7a Submarine Torpedo',
		image : 'Submarine-mounted_G7a_Torpedo',
		type  : type.ST,
		rarity: rarity.E
	},
	{
		id    : 45420,
		name  : 'G7e Acoustic Homing Submarine Torpedo',
		image : 'Submarine-mounted_G7e_Acoustic_Homing_Torpedo',
		type  : type.ST,
		rarity: rarity.E
	},
	{
		id    : 45440,
		name  : 'G7e Acoustic Homing Submarine Torpedo',
		image : 'Submarine-mounted_G7e_Acoustic_Homing_Torpedo',
		type  : type.ST,
		rarity: rarity.SR
	},
	//endregion
	//region Auxilliary
	{ id: 500, name: 'Beaver Squad Tag', image: 'Little_Beaver_Squadron_Tag', type: type.A, rarity: rarity.SR },
	{ id: 520, name: 'Pearl\'s Tears', image: 'Pearl_Tears', type: type.A, rarity: rarity.SR },
	{ id: 540, name: 'Healing Cat\'s Paw', image: 'Healing_Cat\'s_Paw', type: type.A, rarity: rarity.SR },
	{ id: 580, name: 'Type 91 AP Shell', image: 'Type_91_Armor_Piercing_Shell', type: type.A, rarity: rarity.E },
	{ id: 600, name: 'Type 1 AP Shell', image: 'Type_1_Armor_Piercing_Shell', type: type.A, rarity: rarity.SR },
	{ id: 620, name: 'Super Heavy Shell', image: 'Super_Heavy_Shell', type: type.A, rarity: rarity.SR },
	{ id: 640, name: 'Z Flag', image: 'Z_Flag', type: type.A, rarity: rarity.UR },
	{ id: 660, name: '100/150 Aviation Fuel', image: '100$2F150_Aviation_Gasoline', type: type.A, rarity: rarity.E },
	{ id: 680, name: 'Homing Beacon', image: 'Homing_Beacon', type: type.A, rarity: rarity.E },
	{
		id    : 700,
		name  : 'Type 98 Delayed Firing Device',
		image : 'Type_98_Delayed_Firing_Device',
		type  : type.A,
		rarity: rarity.E
	},
	{ id: 720, name: 'Certificate of Sponsorship', image: 'Unfulfilled_Promise', type: type.A, rarity: rarity.SR },
	{ id: 760, name: 'NY City Coast Recon Report', image: 'NY_City_Coast_Recon_Report', type: type.A, rarity: rarity.E },
	{
		id    : 780,
		name  : 'Intel Report - Arctic Stronghold',
		image : 'Intel_Report_-_Arctic_Stronghold',
		type  : type.A,
		rarity: rarity.E
	},
	{
		id    : 800,
		name  : 'Pressure-Resistant Hull Design',
		image : 'Pressure-Resistant_Hull_Design',
		type  : type.A,
		rarity: rarity.E
	},
	{ id: 820, name: 'Frontier Medal', image: 'Frontier_Medal', type: type.A, rarity: rarity.SR },
	{
		id    : 840,
		name  : 'Eagle Union Elite Damage Control',
		image : 'Eagle_Union_Elite_Damage_Control',
		type  : type.A,
		rarity: rarity.SR
	},
	{ id: 860, name: 'Washington Naval Treaty', image: 'Washington_Naval_Treaty', type: type.A, rarity: rarity.SR },
	{
		id    : 880,
		name  : 'Nelson\'s Pennant of Victory',
		image : 'Nelson\'s_Pennant_of_Victory',
		type  : type.A,
		rarity: rarity.SR
	},
	{ id: 960, name: 'FuMO 25', image: 'Funkmess-Ortung_25_Radar', type: type.A, rarity: rarity.SR },
	{ id: 1040, name: 'Ship Maintenance Facility', image: 'Ship_Maintenance_Crane', type: type.A, rarity: rarity.SR },
	{ id: 1120, name: 'Air Radar', image: 'Air_Radar', type: type.A, rarity: rarity.E },
	{
		id    : 1160,
		name  : 'High Performance Air Radar',
		image : 'High_Performance_Anti-Air_Radar',
		type  : type.A,
		rarity: rarity.SR
	},
	{ id: 1240, name: 'Fire Control Radar', image: 'Fire_Control_Radar', type: type.A, rarity: rarity.E },
	{
		id    : 1260,
		name  : 'High Standard Fire-Control Radar',
		image : 'High_Performance_Fire_Control_Radar',
		type  : type.A,
		rarity: rarity.SR
	},
	{ id: 1340, name: 'Anti-Torpedo Bulge', image: 'Anti-Torpedo_Bulge', type: type.A, rarity: rarity.E },
	{ id: 1420, name: 'Steam Catapult', image: 'Steam_Catapult', type: type.A, rarity: rarity.E },
	{ id: 1440, name: 'Steam Catapult', image: 'Steam_Catapult', type: type.A, rarity: rarity.SR },
	{ id: 1520, name: 'SG Radar', image: 'SG_Radar', type: type.A, rarity: rarity.E },
	{ id: 1540, name: 'SG Radar', image: 'SG_Radar', type: type.A, rarity: rarity.SR },
	{ id: 1740, name: 'Hydraulic Steering Gear', image: 'Hydraulic_Steering_Gear', type: type.A, rarity: rarity.R },
	{
		id    : 1760,
		name  : 'High Performance Hydraulic Steering Gear',
		image : 'Improved_Hydraulic_Rudder',
		type  : type.A,
		rarity: rarity.SR
	},
	{ id: 1840, name: 'Advanced Boiler', image: 'Improved_Boiler', type: type.A, rarity: rarity.E },
	{ id: 1940, name: 'Naval Camouflage', image: 'Naval_Camouflage', type: type.A, rarity: rarity.R },
	{ id: 1960, name: 'Ocean Soul Camouflage', image: 'Ocean_Soul_Camouflage', type: type.A, rarity: rarity.E },
	{ id: 2040, name: 'Fuel Filter', image: 'Fuel_Filter', type: type.A, rarity: rarity.E },
	{ id: 2140, name: 'Aviation Oil Tank', image: 'Drop_Tank', type: type.A, rarity: rarity.E },
	{ id: 2240, name: 'Autoloader', image: 'Autoloader', type: type.A, rarity: rarity.E },
	{ id: 2340, name: 'Gyroscope', image: 'Gyroscope', type: type.A, rarity: rarity.E },
	{ id: 2440, name: 'Repair Toolkit', image: 'Repair_Toolkit', type: type.A, rarity: rarity.E },
	{ id: 2540, name: 'Fire Suppressor', image: 'Fire_Extinguisher', type: type.A, rarity: rarity.R },
	{
		id    : 2640,
		name  : 'Type 93 Pure Oxygen Torpedo',
		image : 'Type_93_Pure_Oxygen_Torpedo',
		type  : type.A,
		rarity: rarity.UR
	},
	{ id: 2740, name: '533mm Magnetic Torpedo', image: '533mm_Magnetic_Torpedo', type: type.A, rarity: rarity.SR },
	{
		id    : 2800,
		name  : 'Type 94 Anti-Air Fire Control System',
		image : 'Type_94_High_Angle_Director',
		type  : type.A,
		rarity: rarity.E
	},
	{
		id    : 3100,
		name  : 'Compressed Oxygen Cylinder',
		image : 'Compressed_Oxygen_Cylinder',
		type  : type.A,
		rarity: rarity.E
	},
	{ id: 3120, name: 'Improved Snorkel', image: 'Improved_Snorkel', type: type.A, rarity: rarity.SR },
	{ id: 3140, name: 'Improved Storage Battery', image: 'Improved_Storage_Battery', type: type.A, rarity: rarity.SR },
	{ id: 3200, name: 'VH Armor Plating', image: 'VH_Armor_Plating', type: type.A, rarity: rarity.SR },
	{ id: 3220, name: 'VC Armor Plating', image: 'VC_Armor_Plating', type: type.A, rarity: rarity.E },
	{ id: 3300, name: 'Seal of the Four Gods', image: 'Seal_of_the_Four_Gods', type: type.A, rarity: rarity.SR },
	{ id: 15500, name: 'PBY-5A Catalina', image: 'Consolidated_PBY-5A_Catalina', type: type.A, rarity: rarity.E },
	{ id: 89000, name: 'Random Word Generator', image: 'Random_Word_Generator', type: type.A, rarity: rarity.SR },
	{ id: 89040, name: 'Intelligence Chip', image: 'Intelligence_Chip', type: type.A, rarity: rarity.SR },
	{ id: 89060, name: 'Team Emblem', image: 'Team_Emblem', type: type.A, rarity: rarity.SR },
	{ id: 89080, name: 'Gamers Mark', image: 'Gamers_Mark', type: type.A, rarity: rarity.SR },
	{ id: 89020, name: 'Pyoko-Pyoko', image: 'Pyoko-Pyoko', type: type.A, rarity: rarity.SR },
	{ id: 89100, name: 'Corn Lantern', image: 'Corn_Lantern', type: type.A, rarity: rarity.SR },
	{ id: 89140, name: 'White-Hot Verheerender', image: 'White-Hot_Verheerender', type: type.A, rarity: rarity.SR },
	{ id: 89160, name: 'Sacred Lumière', image: 'Sacred_Lumière', type: type.A, rarity: rarity.SR },
	{ id: 89180, name: 'Resplendent Astrum', image: 'Resplendent_Astrum', type: type.A, rarity: rarity.SR },
	{ id: 89260, name: 'Heart Key', image: 'Heart_Key', type: type.A, rarity: rarity.SR },
	{ id: 89280, name: 'Shining Bracelet', image: 'Shining_Bracelet', type: type.A, rarity: rarity.SR },
	{ id: 89120, name: 'Ankimo', image: 'Ankimo', type: type.A, rarity: rarity.SR },
	{ id: 89200, name: 'Cosmic Kicks', image: 'Cosmic_Kicks', type: type.A, rarity: rarity.SR },
	{ id: 89220, name: 'Celestial Body', image: 'Celestial_Body', type: type.A, rarity: rarity.SR },
	{ id: 89240, name: 'Awakening Pearl', image: 'Awakening_Pearl', type: type.A, rarity: rarity.SR },
	{ id: 89300, name: 'Battle Tracto Max', image: 'Battle_Tracto_Max', type: type.A, rarity: rarity.SR },
	{ id: 89320, name: 'Gridman Calibur', image: 'Gridman_Calibur', type: type.A, rarity: rarity.SR },
	{ id: 89340, name: 'Buster Borr', image: 'Buster_Borr', type: type.A, rarity: rarity.SR },
	{ id: 89360, name: 'Sky Vitter', image: 'Sky_Vitter', type: type.A, rarity: rarity.SR },
	{ id: 89380, name: 'Dynamic Cannon', image: 'Dynamic_Cannon', type: type.A, rarity: rarity.SR },
	{ id: 89400, name: 'Goldburn', image: 'Goldburn', type: type.A, rarity: rarity.SR },
	//endregion
	//region ASW Auxilliary
	{ id: 740, name: 'Fl 282 Kolibri', image: 'Flettner_Fl_282_Kolibri', type: type.A, rarity: rarity.E },
	{ id: 2940, name: 'Basic Sonar', image: 'Basic_Sonar', type: type.A, rarity: rarity.E },
	{ id: 3020, name: 'Advanced Sonar', image: 'Improved_Sonar', type: type.A, rarity: rarity.E },
	{ id: 3040, name: 'Advanced Sonar', image: 'Improved_Sonar', type: type.A, rarity: rarity.SR },
	{
		id    : 4140,
		name  : 'Improved Depth Charge Projector',
		image : 'Improved_Depth_Charge',
		type  : type.A,
		rarity: rarity.E
	},
	{
		id    : 4240,
		name  : 'Swordfish Mk II-ASV (ASW)',
		image : 'Fairey_Swordfish_Mk_II-ASV_(ASW)',
		type  : type.A,
		rarity: rarity.E
	},
	{
		id    : 4340,
		name  : 'TBM-3 Avenger (ASW)',
		image : 'General_Motors_TBM-3_Avenger_(ASW)',
		type  : type.A,
		rarity: rarity.E
	},
	{ id: 25800, name: '"Hedgehog" Anti-Submarine Mortar', image: 'Hedgehog', type: type.A, rarity: rarity.SR },
	//endregion
	//region Cargo
	{
		id    : 3400,
		name  : '40cm Type 94 Naval Gun Parts (Cargo)',
		image : '40cm_Type_94_Naval_Gun_Parts_(Cargo)',
		type  : type.C,
		rarity: rarity.SR
	},
	{
		id    : 3500,
		name  : 'Aviation Materials (Cargo)',
		image : 'Aviation_Materials_(Cargo)',
		type  : type.C,
		rarity: rarity.E
	},
	{
		id    : 3520,
		name  : 'Small-Caliber Naval Gun Parts (Cargo)',
		image : 'Small-Caliber_Naval_Gun_Parts_(Cargo)',
		type  : type.C,
		rarity: rarity.E
	},
	{ id: 3540, name: 'Torpedo Materials (Cargo)', image: 'Torpedo_Materials_(Cargo)', type: type.C, rarity: rarity.E }
	//endregion
	// { id: 0, name: '', image: '', type: type.A, rarity: rarity.SR }
];
export default equipData;
// dictionary of equips to reference by id
export const equipsIndex: Record<number, Equip> = equipData.reduce( ( obj, item ) => {
	obj[ item.id ] = item;
	return obj;
}, {} );

const map = equipData.reduce( ( obj, item ) => {
	obj[ `${item.name}/${rarity[ item.rarity ]}` ] = item.id;
	return obj;
}, {} as Record<string, number | string> );

let a;
// tiers of equipment by slot
export const equipTier: Record<string, Record<number, number[]>> = {
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
	'AA': {
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
	'AA/Speed': {
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
	'AA/Main': {
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
	
	'DD': {
		[ map[ 'Twin 130mm B-2LM Main Gun Mount/SR' ] ]             : [ 0, a = 0 ],
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
	'DD/Speed': {
		[ map[ 'Twin 114mm Mk IV Dual-Purpose Gun Mount/SR' ] ]     : [ 0, a = 0 ],
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
	'DD/SSpeed': {
		[ map[ 'Twin 114mm Mk IV Dual-Purpose Gun Mount/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Twin 130mm B-2LM Main Gun Mount/SR' ] ]        : [ 0, ++a ],
		[ map[ 'Twin 100mm Type 98 High-Angle Gun/SR' ] ]      : [ 1, ++a ],
		[ map[ '76mm AA Gun/R' ] ]                             : [ 2, ++a ],
		[ map[ 'Single 120mm QF Mark IX Naval Gun/R' ] ]       : [ 2, ++a ],
		[ map[ 'Single 127mm Main Gun/E' ] ]                   : [ 3, ++a ]
	},
	'DD/SSSpeed': {
		[ map[ '76mm AA Gun/R' ] ]                             : [ 0, a = 0 ],
		[ map[ 'Single 120mm QF Mark IX Naval Gun/R' ] ]       : [ 0, ++a ],
		[ map[ 'Twin 114mm Mk IV Dual-Purpose Gun Mount/SR' ] ]: [ 1, ++a ],
		[ map[ 'Twin 100mm Type 98 High-Angle Gun/SR' ] ]      : [ 2, ++a ]
	},
	'DD/AP': {
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
	'DD/Aux': {
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
	'DD/Sub': {
		[ map[ 'Twin 100mm Type 98 High-Angle Gun/SR' ] ]      : [ 0, a = 0 ],
		[ map[ 'Twin 127mm Mk 12 Dual-Purpose Gun Mount/SR' ] ]: [ 0, ++a ],
		[ map[ 'Twin 120mm Main Gun Mount/E' ] ]               : [ 1, ++a ],
		[ map[ 'Twin 100mm Type 98 High-Angle Gun/E' ] ]       : [ 2, ++a ]
	},
	
	'CL': {
		[ map[ 'Prototype Triple 152mm DP Mk 17 Main Gun Mount/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Triple 152mm B-38 MK 5 Main Gun Mount/SR' ] ]         : [ 0, ++a ],
		[ map[ 'Prototype Triple 152mm Mk XXV Main Gun Mount/SR' ] ]  : [ 1, ++a ],
		[ map[ 'Triple 152mm Model 1934 Main Gun Mount/SR' ] ]        : [ 1, ++a ],
		[ map[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ] ]           : [ 2, ++a ],
		[ map[ 'Triple 152mm Mk 16 Main Gun Mount/SR' ] ]             : [ 3, ++a ],
		[ map[ 'Triple 155mm Main Gun Mount/SR' ] ]                   : [ 3, ++a ],
		[ map[ 'Triple 152mm B-38 MK 5 Main Gun Mount/E' ] ]          : [ 4, ++a ],
		[ map[ 'Triple 155mm Main Gun Mount/E' ] ]                    : [ 4, ++a ],
		[ map[ 'Single 150mm SK C/28 Main Gun Mount/E' ] ]            : [ 4, ++a ]
	},
	'CL/AP': {
		[ map[ 'Prototype Triple 152mm Mk XXV Main Gun Mount/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Triple 152mm Model 1934 Main Gun Mount/SR' ] ]      : [ 0, ++a ],
		[ map[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ] ]         : [ 1, ++a ],
		[ map[ 'Single 150mm SK C/28 Main Gun Mount/E' ] ]          : [ 2, ++a ]
	},
	'CL/Main': {
		[ map[ 'Prototype Triple 152mm Mk XXV Main Gun Mount/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Triple 152mm Mk 16 Main Gun Mount/SR' ] ]           : [ 0, ++a ],
		[ map[ 'Triple 155mm Main Gun Mount/SR' ] ]                 : [ 0, ++a ],
		[ map[ 'Triple 152mm Main Gun2/E' ] ]                       : [ 1, ++a ],
		[ map[ 'Twin 152mm Main Gun/E' ] ]                          : [ 1, ++a ],
		[ map[ 'Twin 150mm SK C/28 Secondary Gun Mount/E' ] ]       : [ 2, ++a ],
		[ map[ 'Twin 150mm TbtsK C/36 Main Gun Mount/E' ] ]         : [ 2, ++a ],
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
	
	'CA': {
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
	'CA/HE': {
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
	'CA/CB': {
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
	'CB/CA': {
		[ map[ 'Prototype Triple 310mm Type 0 Main Gun Mount/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Triple 283mm SK C/28 Main Gun Mount/E' ] ]          : [ 1, ++a ]
	},
	'CB/CA/AP': {
		[ map[ 'Prototype Triple 305mm SK C/39 Main Gun Mount (CB)/SR' ] ]: [ 0, a = 0 ],
		[ map[ 'Prototype Triple 310mm Type 0 Main Gun Mount/SR' ] ]      : [ 1, ++a ],
		[ map[ 'Triple 283mm SK C/28 Main Gun Mount/E' ] ]                : [ 2, ++a ]
	},
	
	'BB/Damage': {
		[ map[ 'Triple 406mm MK7 Main Gun/UR' ] ]                : [ 0, a = 0 ],
		[ map[ 'Prototype Triple 381mm AA Gun/SR' ] ]            : [ 0, ++a ],
		[ map[ 'Prototype Twin 457mm Mk A Main Gun Mount/UR' ] ] : [ 1, ++a ],
		[ map[ 'Triple 406mm Mk 6 Main Gun Mount/E' ] ]          : [ 1, ++a ],
		[ map[ 'Prototype Triple 406mm /50 Main Gun Mount/SR' ] ]: [ 2, ++a ],
		[ map[ 'Prototype Triple 410mm Main Gun Mount/SR' ] ]    : [ 3, ++a ],
		[ map[ 'Prototype 406mm Mk D Main Gun Mount/SR' ] ]      : [ 3, ++a ]
	},
	'BB/Speed': {
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
	
	'F': {
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
		[ map[ 'Wyvern/UR' ] ]                        : [ 0, a = 0 ],
		[ map[ 'XTB2D-1 Skypirate/SR' ] ]             : [ 0, ++a ],
		// [ map[ 'Aichi B7A Ryusei/SR' ] ]:               [ 0, ++a ],
		// [ map[ 'Prototype Saiun Kai/SR' ] ]:            [ 0, ++a ],
		// [ map[ 'Ju-87 D-4/SR' ] ]:                      [ 0, ++a ],
		[ map[ 'Barracuda/SR' ] ]                     : [ 1, ++a ],
		[ map[ 'Firecrest/SR' ] ]                     : [ 1, ++a ],
		[ map[ 'Blackburn Firebrand/SR' ] ]           : [ 1, ++a ],
		// [ map[ 'Tenzan Kai/E' ] ]:                      [ 1, ++a ],
		[ map[ 'TBM Avenger (VT-18 Squadron)/SR' ] ]  : [ 2, ++a ],
		[ map[ 'TBD Devastator (VT-8 Squadron)/SR' ] ]: [ 2, ++a ],
		[ map[ 'Barracuda/E' ] ]                      : [ 3, ++a ],
		// [ map[ 'Aichi B7A Ryusei/E' ] ]:                [ 3, ++a ],
		// [ map[ 'Tenzan/E' ] ]:             [ 3, ++a ],
		[ map[ 'Swordfish (818 Squad)/SR' ] ]         : [ 4, ++a ],
		[ map[ 'Albacore/E' ] ]                       : [ 4, ++a ]
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
	
	'SP': {
		[ map[ 'Suisei Model 21/SR' ] ]       : [ 0, a = 0 ],
		[ map[ 'Seiran/E' ] ]                 : [ 1, ++a ],
		[ map[ 'Aichi E16A Zuiun/E' ] ]       : [ 2, ++a ],
		[ map[ 'N1K1 Kyoufuu/E' ] ]           : [ 3, ++a ],
		[ map[ 'Type 2 Seaplane Fighter/E' ] ]: [ 3, ++a ]
	},
	'SSP': {
		[ map[ 'Seiran/E' ] ]          : [ 0, a = 0 ],
		[ map[ 'Aichi E16A Zuiun/E' ] ]: [ 1, ++a ]
	},
	'ST': {
		[ map[ 'Mark 20 "Bidder" Submarine Torpedo/SR' ] ]   : [ 0, a = 0 ],
		[ map[ 'G7e Acoustic Homing Submarine Torpedo/SR' ] ]: [ 0, ++a ],
		[ map[ 'Mark 16 Submarine Torpedo/SR' ] ]            : [ 0, ++a ],
		[ map[ 'Type 96 Submarine Torpedo/SR' ] ]            : [ 1, ++a ],
		[ map[ 'Mark 28 Submarine Torpedo/SR' ] ]            : [ 1, ++a ],
		[ map[ 'Type 95 Submarine Torpedo/SR' ] ]            : [ 1, ++a ],
		[ map[ 'Mark 12 "Ferry" Submarine Torpedo/SR' ] ]    : [ 1, ++a ],
		[ map[ 'G7e Acoustic Homing Submarine Torpedo/E' ] ] : [ 2, ++a ],
		[ map[ 'G7a Submarine Torpedo/E' ] ]                 : [ 2, ++a ],
		[ map[ 'Mark 16 Submarine Torpedo/E' ] ]             : [ 2, ++a ],
		[ map[ 'Type 95 Submarine Torpedo/E' ] ]             : [ 2, ++a ]
	},
	'SS': {
		[ map[ 'Twin 203mm Mle 1924 Submarine Gun Mount/R' ] ]: [ 0, 0 ]
	},
	
	'A/DD1': {
		[ map[ 'Repair Toolkit/E' ] ] : [ 0, a = 0 ],
		[ map[ 'Pyoko-Pyoko/SR' ] ]   : [ 0, ++a ],
		[ map[ 'Advanced Boiler/E' ] ]: [ 1, ++a ]
	},
	'A/DD2': {
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
		[ map[ 'Repair Toolkit/E' ] ]              : [ 1, ++a ],
		[ map[ 'Autoloader/E' ] ]                  : [ 2, ++a ],
		[ map[ 'Fire Suppressor/R' ] ]             : [ 3, ++a ]
	},
	'A/CL1': {
		[ map[ 'Repair Toolkit/E' ] ]    : [ 0, ++a ],
		[ map[ 'Fuel Filter/E' ] ]       : [ 1, ++a ],
		[ map[ 'Anti-Torpedo Bulge/E' ] ]: [ 2, ++a ]
	},
	'A/CL2': {
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
	'A/CA1': {
		[ map[ 'Repair Toolkit/E' ] ]    : [ 0, a = 0 ],
		[ map[ 'Fuel Filter/E' ] ]       : [ 1, ++a ],
		[ map[ 'Anti-Torpedo Bulge/E' ] ]: [ 2, ++a ]
	},
	'A/CA2': {
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
	'A/CB1': {
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
		[ map[ 'Type 93 Pure Oxygen Torpedo/UR' ] ]  : [ 0, a = 0 ],
		[ map[ 'Pressure-Resistant Hull Design/E' ] ]: [ 0, ++a ],
		[ map[ 'Autoloader/E' ] ]                    : [ 1, ++a ]
	},
	'A/AR': {
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

// type of weapon that can be equipped at each slot
export const equippable = {
	'T'  : [ type.T ],
	'T/A': [ type.T, type.A ],
	
	'AA/Damage': [ type.AA ],
	'AA'       : [ type.AA ],
	'AA/Speed' : [ type.AA ],
	'AA/Main'  : [ type.AA ],
	'AA/A'     : [ type.AA, type.A ],
	
	'DD'         : [ type.DD ],
	'DD/Speed'   : [ type.DD ],
	'DD/SSpeed'  : [ type.DD ],
	'DD/SSSpeed' : [ type.DD ],
	'DD/AP'      : [ type.DD ],
	'DD/AP/Speed': [ type.DD ],
	'CL/DD'      : [ type.CL, type.DD ],
	'CL/DD/Speed': [ type.CL, type.DD ],
	'T/DD'       : [ type.T, type.DD ],
	'DD/Aux'     : [ type.DD ],
	'DD/Main'    : [ type.DD ],
	'DD/Sub'     : [ type.DD ],
	
	'CL'        : [ type.CL ],
	'CL/AP'     : [ type.CL ],
	'CL/Main'   : [ type.CL ],
	'CL/DD/Main': [ type.CL ],
	'CL/AA'     : [ type.CL, type.AA ],
	'CL/A'      : [ type.CL, type.A ],
	'CL/DB'     : [ type.CL, type.DB ],
	
	'CA'         : [ type.CA ],
	'CA/HE'      : [ type.CA ],
	'CA/Modified': [ type.CA ],
	'CA/CB'      : [ type.CA, type.CB ],
	'CA/CL'      : [ type.CA, type.CL ],
	'CB/CA'      : [ type.CA, type.CB ],
	'CB/CA/AP'   : [ type.CA, type.CB ],
	
	'BB/Damage'  : [ type.BB ],
	'BB/Speed'   : [ type.BB ],
	'BB/Modified': [ type.BB ],
	
	'F'    : [ type.F ],
	'DB'   : [ type.DB ],
	'TB'   : [ type.TB ],
	'F/DB' : [ type.F, type.DB ],
	'F/TB' : [ type.F, type.TB ],
	'DB/TB': [ type.DB, type.TB ],
	'P'    : [ type.F, type.DB, type.TB ],
	
	'SP' : [ type.SP, type.SSP ],
	'SSP': [ type.SSP ],
	'ST' : [ type.ST ],
	'SS' : [ type.SS ],
	
	'A/DD1'  : [ type.A ],
	'A/DD2'  : [ type.A ],
	'A/DD1/T': [ type.A ],
	'A/DD2/T': [ type.A ],
	'A/CL1'  : [ type.A ],
	'A/CL2'  : [ type.A ],
	'A/CL1/T': [ type.A ],
	'A/CL2/T': [ type.A ],
	'A/CA1'  : [ type.A ],
	'A/CA2'  : [ type.A ],
	'A/CA1/T': [ type.A ],
	'A/CA2/T': [ type.A ],
	'A/CB1'  : [ type.A ],
	'A/CB2'  : [ type.A ],
	'A/BB1'  : [ type.A ],
	'A/BB2'  : [ type.A ],
	'A/BBV1' : [ type.A ],
	'A/BBV2' : [ type.A ],
	'A/CV1'  : [ type.A ],
	'A/CV2'  : [ type.A ],
	'A/SS1'  : [ type.A ],
	'A/SS2'  : [ type.A ],
	'A/AR'   : [ type.A ],
	'A/AR1'  : [ type.A ],
	'A/AR2'  : [ type.A ],
	'A/BM1'  : [ type.A ],
	'A/BM2'  : [ type.A ],
	'A/AE1'  : [ type.A ],
	'A/AE2'  : [ type.A ],
	
	'C': [ type.C, type.A ]
};
