export type EventType = {
	eventData: { name: string, href: string, image: string, endDate: string },
	eventShopData: { amount: number, cost: number, name: string }[],
	eventStagesData: { [ cost: number ]: string }
};
