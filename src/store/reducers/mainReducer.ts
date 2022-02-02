import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export function importBackup( key, data ) {
	return { type: 'import', payload: { key, data } };
}

type State = {
	newData: Record<string, boolean>,
	theme: string,
	autoBackup: boolean
};

const initialState: State = {
	newData   : {},
	theme     : 'default',
	autoBackup: true
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
		setAutoBackup( state, { payload }: PayloadAction<boolean> ) {
			state.autoBackup = payload;
		}
	}
} );

export default mainSlice.reducer;
export const
	setNewData    = mainSlice.actions.setNewData,
	setTheme      = mainSlice.actions.setTheme,
	setAutoBackup = mainSlice.actions.setAutoBackup;
