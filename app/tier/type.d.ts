import type { EquipType } from './ship/equip/type';

export type TierType = {
	params: Record<string, string>,
	equipData: EquipType[],
	tierTypesData: string[]
};
