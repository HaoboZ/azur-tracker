import type { EquipType } from '../fleet/ship/equip/type';

export type FarmType = {
	farmData: Record<string, Record<string, Record<string, number[]>>>;
	equipTier: number[][];
	equipList: EquipType[];
};
