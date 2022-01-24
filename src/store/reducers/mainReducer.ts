import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export function importBackup( key, data ) {
	return { type: 'import', payload: { key, data } };
}

type State = {
	newData: Record<string, boolean>,
	theme: string,
	autoSave: boolean,
	autoLoad: boolean
};

const initialState: State = {
	newData : {},
	theme   : 'default',
	autoSave: true,
	autoLoad: true
};

const mainSlice = createSlice( {
	name    : 'main',
	initialState,
	reducers: {
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
	setNewData  = mainSlice.actions.setNewData,
	setTheme    = mainSlice.actions.setTheme,
	setAutoSave = mainSlice.actions.setAutoSave,
	setAutoLoad = mainSlice.actions.setAutoLoad;
