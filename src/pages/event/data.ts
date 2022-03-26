// noinspection SpellCheckingInspection

const eventData = {
	name   : 'Virtual Tower',
	href   : 'https://azurlane.koumakan.jp/wiki/Virtual_Tower',
	endDate: new Date( '2022-04-06T23:59-07:00' ),
	shop   : [
		{ name: 'Pompeo Magno', cost: 8000, amount: 5 },
		// { name: 'Minsk', cost: 4000, amount: 5 },
		{ name: '135mm Twin Main Gun Mount Model 1938', cost: 2000, amount: 1 },
		// { name: 'Intel Report - Arctic Stronghold', cost: 1000, amount: 1 },
		{ name: 'T4 Eagle Tech Box', cost: 300, amount: 4 },
		{ name: 'T4 Royal Tech Box', cost: 300, amount: 4 },
		{ name: 'T4 Sakura Tech Box', cost: 300, amount: 4 },
		{ name: 'T4 Ironblood Tech Box', cost: 300, amount: 4 },
		{ name: 'Cognitive Chips', cost: 300, amount: 10 },
		{ name: 'Cognitive Array', cost: 1000, amount: 5 },
		{ name: 'Rare Cat Box', cost: 250, amount: 10 },
		{ name: 'Elite Cat Box', cost: 500, amount: 5 },
		{ name: 'Super Rare Cat Box', cost: 3000, amount: 2 },
		{ name: 'General Blueprint - Series 4', cost: 500, amount: 30 },
		{ name: 'Special General Blueprint - Series 4', cost: 1000, amount: 10 },
		{ name: 'T3 General Part', cost: 30, amount: 30 },
		{ name: 'T3 Main Gun Part', cost: 30, amount: 30 },
		{ name: 'T3 Torpedo Part', cost: 30, amount: 30 },
		{ name: 'T3 Anti-Air Part', cost: 30, amount: 30 },
		{ name: 'T3 Aircraft Part', cost: 30, amount: 30 },
		{ name: 'Coins', cost: 500, amount: 5 },
		{ name: 'Oil', cost: 450, amount: 5 },
		{ name: 'Oxy-cola', cost: 15, amount: 100 }
	],
	stages : {
		// 30 : 'A1',
		// 40 : 'A2',
		// 50 : 'A3',
		// 60 : 'B1',
		// 70 : 'B2',
		// 80 : 'B3',
		// 90 : 'C1',
		// 100: 'C2',
		// 110: 'C3',
		// 120: 'D1',
		// 150: 'D2',
		// 180: 'D3'
		30 : 'SP1',
		80 : 'SP2',
		120: 'SP3',
		180: 'SP4'
	}
};
export default eventData;
