export type EventType = {
	eventData: { name: string, href: string, image: string, endDate: string },
	eventShop: { amount: number, cost: number, name: string }[],
	eventStages: { [ cost: number ]: string }
};
