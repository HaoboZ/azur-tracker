import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';

export function importBackup( key, data ) {
	return { type: 'import', payload: { key, data } };
}

type State = {
	theme: string,
	user: Partial<User>,
	unViewed: Record<string, boolean>,
	autoSync: boolean,
	timestamp: string,
	lastTimestamp: string
};

const initialState: State = {
	theme        : 'default',
	user         : null,
	unViewed     : {},
	autoSync     : true,
	timestamp    : new Date( 0 ).toISOString(),
	lastTimestamp: null
};

const mainSlice = createSlice( {
	name         : 'main',
	initialState,
	reducers     : {
		setTheme( state, { payload }: PayloadAction<string> ) {
			state.theme = payload;
		},
		setUser( state, { payload }: PayloadAction<Partial<User>> ) {
			state.user = payload;
		},
		setViewed( state, { payload }: PayloadAction<string> ) {
			state.unViewed = { ...state.unViewed, [ payload ]: false };
		},
		setAutoSync( state, { payload }: PayloadAction<boolean> ) {
			state.autoSync = payload;
		},
		setTimestamp( state, { payload }: PayloadAction<undefined | string> ) {
			state.timestamp = payload || new Date().toISOString();
		},
		setLastTimestamp( state, { payload }: PayloadAction<string> ) {
			state.lastTimestamp = payload;
		}
	},
	extraReducers: {
		import( state, { payload }: PayloadAction<{ key, data }> ) {
			return { ...state, unViewed: { ...state.unViewed, [ payload.key ]: true } };
		}
	}
} );

export default mainSlice.reducer;
export const
	setTheme         = mainSlice.actions.setTheme,
	setUser          = mainSlice.actions.setUser,
	setViewed        = mainSlice.actions.setViewed,
	setAutoSync      = mainSlice.actions.setAutoSync,
	setTimestamp     = mainSlice.actions.setTimestamp,
	setLastTimestamp = mainSlice.actions.setLastTimestamp;
