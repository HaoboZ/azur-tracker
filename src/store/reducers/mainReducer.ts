import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export function importBackup( payload ) {
	return { type: 'import', payload };
}

type State = {
	timestamp: string,
	newData: Record<string, boolean>,
	theme: string,
	autoSave: boolean,
	autoLoad: boolean
};

const initialState: State = {
	timestamp: new Date( 0 ).toISOString(),
	newData  : {},
	theme    : 'default',
	autoSave : true,
	autoLoad : true
};

const mainSlice = createSlice( {
	name    : 'main',
	initialState,
	reducers: {
		setTimestamp( state, { payload }: PayloadAction<string> ) {
			state.timestamp = payload;
		},
		setNewData( state, { payload }: PayloadAction<Record<string, boolean>> ) {
			state.newData = { ...state.newData, ...payload };
		},
		setTheme( state, { payload }: PayloadAction<string> ) {
			state.theme = payload;
		},
		setAutoSave( state, { payload }: PayloadAction<boolean> ) {
			state.autoSave = payload;
		},
		setAutoLoad( state, { payload }: PayloadAction<boolean> ) {
			state.autoLoad = payload;
		}
	}
} );

export default mainSlice.reducer;
export const
	setTimestamp = mainSlice.actions.setTimestamp,
	setNewData   = mainSlice.actions.setNewData,
	setTheme     = mainSlice.actions.setTheme,
	setAutoSave  = mainSlice.actions.setAutoSave,
	setAutoLoad  = mainSlice.actions.setAutoLoad;
