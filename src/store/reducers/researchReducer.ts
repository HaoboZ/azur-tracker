import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
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
				item.devStage = Math.min(Math.max(item.devStage, 0), maxDev);
			}
			if ('devLevel' in item) {
				item.devLevel = Math.min(Math.max(item.devLevel, 0), 30);
				item.devStage = 0;
			}
			if ('fateLevel' in item) {
				item.fateLevel = Math.min(Math.max(item.fateLevel, 0), 5);
				item.fateStage = 0;
			}
			if ('fateStage' in item) item.fateStage = Math.min(Math.max(item.fateStage, 0), 100);
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
			if (payload.key === 'research') return { ...state, ...payload.data };
		});
	},
});

export default researchSlice.reducer;
export const { actions: researchActions } = researchSlice;
