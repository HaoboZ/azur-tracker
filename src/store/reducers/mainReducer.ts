import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction, createSlice } from '@reduxjs/toolkit';

export const importBackup = createAction('import', (payload: Record<string, any>) => ({
	payload: payload,
}));

type State = Record<string, string>;

const initialState: State = {};

const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setTimestamp(state, { payload }: PayloadAction<[string, undefined | string]>) {
			state[payload[0]] = payload[1] || new Date().toISOString();
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(importBackup, (state, { payload }) => {
				if ('main' in payload) return payload.main;
			})
			.addMatcher(
				({ type }) => !type.includes('@@redux') && !type.includes('main'),
				(state: State, { type }) => {
					const reducer = type.split('/')[0];
					if (reducer) state[reducer] = new Date().toISOString();
				},
			);
	},
});

export default mainSlice.reducer;
export const { actions: mainActions } = mainSlice;
