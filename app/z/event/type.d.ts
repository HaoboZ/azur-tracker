export type EventType = {
	eventData: { name: string; href: string; image: string; endDate: string };
	eventShopData: { name: string; amount: number; cost: number }[];
	eventStagesData: { [cost: number]: string };
};
