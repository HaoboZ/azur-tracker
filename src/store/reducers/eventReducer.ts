import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { importBackup } from './mainReducer';

type State = {
	name: string;
	shop: Record<string, number>;
	shopExpectedCost: number;
	daily: { id: string; name: string; amount: number }[];
	dailyExpected: number;
	points: number;
	farming: { id: string; points: number; oil: number }[];
};

const initialState: State = {
	name: '',
	shop: {
		'Gear Skin Box': 0,
		'T4 Eagle Tech Box': 0,
		'T4 Royal Tech Box': 0,
		'T4 Sakura Tech Box': 0,
		'T4 Ironblood Tech Box': 0,
		'Cognitive Chips': 0,
		'Rare Cat Box': 0,
		'Elite Cat Box': 0,
		'Super Rare Cat Box': 2,
		'General Blueprint - Series 4': 30,
		'Special General Blueprint - Series 4': 10,
		'T3 General Part': 0,
		'T3 Main Gun Part': 0,
		'T3 Torpedo Part': 0,
		'T3 Anti-Air Part': 0,
		'T3 Aircraft Part': 0,
		'Coins': 5,
		'Oil': 5,
		'Oxy-cola': 0,
	},
	shopExpectedCost: 0,
	daily: [
		{
			id: nanoid(),
			name: 'Build 3 ships',
			amount: 300,
		},
		{
			id: nanoid(),
			name: 'Sortie and obtain 15 victories',
			amount: 300,
		},
		{
			id: nanoid(),
			name: 'Sortie and clear 1 non-event Hard Mode Stage',
			amount: 150,
		},
		{
			id: nanoid(),
			name: 'SP Stage',
			amount: 800,
		},
	],
	dailyExpected: 1550,
	points: 0,
	farming: [
		{
			id: nanoid(),
			points: 180,
			oil: 10 + 25 * 6 + 40,
		},
	],
};

const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {
		reset() {
			return initialState;
		},
		newEvent(state, { payload }: PayloadAction<State>) {
			return payload;
		},
		setShop(
			state,
			{
				payload,
			}: PayloadAction<{
				shop: Record<string, number>;
				total: number;
			}>,
		) {
			state.shop = payload.shop;
			state.shopExpectedCost = payload.total;
		},
		setDaily(
			state,
			{
				payload,
			}: PayloadAction<{
				daily: {
					id: string;
					name: string;
					amount: number;
				}[];
				total: number;
			}>,
		) {
			state.daily = payload.daily;
			state.dailyExpected = payload.total;
		},
		setPoints(state, { payload }: PayloadAction<number>) {
			state.points = Math.max(payload || 0, 0);
		},
		setFarming(
			state,
			{
				payload,
			}: PayloadAction<
				{
					id: string;
					points: number;
					oil: number;
				}[]
			>,
		) {
			state.farming = payload;
		},
		modifyFarming(
			state,
			{
				payload,
			}: PayloadAction<{
				id: string;
				points?: number;
				oil?: number;
			}>,
		) {
			if ('points' in payload) payload.points = Math.max(payload.points || 0, 0);
			if ('oil' in payload) payload.oil = Math.max(payload.oil || 0, 0);

			state.farming = [...state.farming];
			const index = state.farming.findIndex(({ id }) => id === payload.id);
			state.farming[index] = { ...state.farming[index], ...payload };
		},
	},
	extraReducers: (builder) => {
		builder.addCase(importBackup, (state, { payload }) => {
			if (payload.key === 'event') return { ...state, ...payload.data };
		});
	},
});

export default eventSlice.reducer;
export const { actions: eventActions } = eventSlice;
