export type ResearchShipType = {
	name: string;
	type: number;
	fate: boolean;
	image: string;
	url: string;
};

export type ResearchType = { researchData: Record<string, ResearchShipType[]> };
