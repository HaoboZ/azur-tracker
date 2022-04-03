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
	equip?: [ number, 0 | 1, number ][]
};

export type FleetType = { fleetData: Record<string, Ship> };
