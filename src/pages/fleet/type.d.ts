import type { EquipType } from './ship/equip/type';

export type Ship = {
	id: string,
	name: string,
	href: string,
	rarity: string,
	faction: string,
	type: string,
	tier: number,
	special: boolean[],
	equipType: string[]
} & {
	love?: number,
	lvl?: number,
	equip?: [ number, number, number ][]
};

export type FleetType = {
	fleetData: Record<string, Ship>,
	equipData: EquipType[],
	equippableData: Record<string, { tier: string, equip: string[] }>,
	equipTierData: Record<string, Record<number, [ number, number ]>>
};
