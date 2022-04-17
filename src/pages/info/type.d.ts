import { EquipType } from '../fleet/ship/equip/data';

export type FarmType = {
	farmData: Record<string, Record<string, Record<string, number[]>>>,
	equipList: EquipType[]
};
