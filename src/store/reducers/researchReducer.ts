import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { clamp } from 'remeda';
import { importBackup } from './mainReducer';

type State = {
	ships: Record<
		string,
		{ devLevel?: number; devStage?: number; fateLevel?: number; fateStage?: number }
	>;
	lastTab: number;
};

const initialState: State = { ships: {}, lastTab: 0 };

const researchSlice = createSlice({
	name: 'research',
	initialState,
	reducers: {
		reset() {
			return initialState;
		},
		modifyShip(
			state,
			{
				payload,
			}: PayloadAction<{
				ship: string;
				item: { devLevel?: number; devStage?: number; fateLevel?: number; fateStage?: number };
				maxDev?: number;
			}>,
		) {
			const { item, maxDev } = payload;
			if ('devStage' in item) {
				item.devStage = clamp(item.devStage, { min: 0, max: maxDev });
			}
			if ('devLevel' in item) {
				item.devLevel = clamp(item.devLevel, { min: 0, max: 30 });
				item.devStage = 0;
			}
			if ('fateLevel' in item) {
				item.fateLevel = clamp(item.fateLevel, { min: 0, max: 5 });
				item.fateStage = 0;
			}
			if ('fateStage' in item) item.fateStage = clamp(item.fateStage, { min: 0, max: 100 });
			state.ships = {
				...state.ships,
				[payload.ship]: { ...state.ships[payload.ship], ...payload.item },
			};
		},
		setLastTab(state, { payload }: PayloadAction<number>) {
			state.lastTab = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(importBackup, (state, { payload }) => {
			if ('research' in payload) return { ...state, ...payload.research };
		});
	},
});

export default researchSlice.reducer;
export const { actions: researchActions } = researchSlice;
