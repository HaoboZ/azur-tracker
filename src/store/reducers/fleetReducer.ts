import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { importBackup } from './mainReducer';

type State = {
	ships: Record<
		string,
		{
			lvl: number;
			love: number;
			equip: [number, number, number][]; // id, override, tier
		}
	>;
	filter: {
		levelMax: boolean;
		equipMax: boolean;
		level0: boolean;
	};
	version: string;
};

const initialState: State = {
	ships: {},
	filter: {
		levelMax: true,
		equipMax: true,
		level0: true,
	},
	version: undefined,
};

const fleetSlice = createSlice({
	name: 'fleet',
	initialState,
	reducers: {
		reset() {
			return initialState;
		},
		setVersion(state, { payload }: PayloadAction<string>) {
			state.version = payload;
		},
		setShips(
			state,
			{
				payload,
			}: PayloadAction<
				Record<
					string,
					{
						lvl: number;
						love: number;
						equip: [number, number, number][]; // id, override, tier
					}
				>
			>,
		) {
			state.ships = payload;
		},
		setShip(
			state,
			{
				payload,
			}: PayloadAction<{
				name: string;
				ship: {
					lvl?: number;
					love?: number;
					equip?: [number, number, number][];
				};
			}>,
		) {
			state.ships = {
				...state.ships,
				[payload.name]: { ...state.ships[payload.name], ...payload.ship },
			};
		},
		setFilter(
			state,
			{
				payload,
			}: PayloadAction<{
				levelMax?: boolean;
				equipMax?: boolean;
				level0?: boolean;
			}>,
		) {
			state.filter = { ...state.filter, ...payload };
		},
	},
	extraReducers: (builder) => {
		builder.addCase(importBackup, (state, { payload }) => {
			if (payload.key === 'fleet') return { ...state, ...payload.data };
		});
	},
});

export default fleetSlice.reducer;
export const { actions: fleetActions } = fleetSlice;
