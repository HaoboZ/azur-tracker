import type { EquipType } from '../fleet/ship/equip/type';

export type TierType = {
	params: Record<string, string>;
	equipData: EquipType[];
	tierTypesData: string[];
};
