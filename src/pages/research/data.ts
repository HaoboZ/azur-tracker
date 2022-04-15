import { StaticImageData } from 'next/image';

export type ResearchShipsType = {
	name: string,
	type: number,
	fate: boolean,
	image: StaticImageData,
	url: string
}[];

export type ResearchType = { researchData: Record<string, ResearchShipsType> };
