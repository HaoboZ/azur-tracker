import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction, createSlice } from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';

export const importBackup = createAction('import', (key: string, data: any) => ({
	payload: { key, data },
}));

type State = {
	user: Partial<User>;
	unViewed: Record<string, boolean>;
	autoSync: boolean;
	timestamp: string;
	lastTimestamp: string;
};

const initialState: State = {
	user: null,
	unViewed: {},
	autoSync: true,
	timestamp: new Date(0).toISOString(),
	lastTimestamp: null,
};

const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setUser(state, { payload }: PayloadAction<Partial<User>>) {
			state.user = payload;
		},
		setViewed(state, { payload }: PayloadAction<string>) {
			state.unViewed = { ...state.unViewed, [payload]: false };
		},
		setAutoSync(state, { payload }: PayloadAction<boolean>) {
			state.autoSync = payload;
		},
		setTimestamp(state, { payload }: PayloadAction<undefined | string>) {
			state.timestamp = payload || new Date().toISOString();
		},
		setLastTimestamp(state, { payload }: PayloadAction<string>) {
			state.lastTimestamp = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(importBackup, (state: State, { payload }) => ({
			...state,
			unViewed: { ...state.unViewed, [payload.key]: true },
		}));
	},
});

export default mainSlice.reducer;
export const { actions: mainActions } = mainSlice;
