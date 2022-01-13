import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export function importBackup( payload ) {
	return {
		type: 'import',
		payload
	};
}

type State = {
	lastSaved: string,
	newData: Record<string, boolean>,
	theme: string,
	autoSave: boolean,
	autoLoad: boolean,
	researchLastTab: number
};

const initialState: State = {
	lastSaved      : new Date( 0 ).toISOString(),
	newData        : {},
	theme          : 'default',
	autoSave       : true,
	autoLoad       : true,
	researchLastTab: 0
};

const mainSlice = createSlice( {
	name    : 'main',
	initialState,
	reducers: {
		setLastSaved( state, { payload }: PayloadAction<string> ) {
			state.lastSaved = payload;
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
		},
		setResearchLastTab( state, { payload }: PayloadAction<number> ) {
			state.researchLastTab = payload;
		}
	}
} );

export default mainSlice.reducer;
export const
	setLastSaved       = mainSlice.actions.setLastSaved,
	setNewData         = mainSlice.actions.setNewData,
	setTheme           = mainSlice.actions.setTheme,
	setAutoSave        = mainSlice.actions.setAutoSave,
	setAutoLoad        = mainSlice.actions.setAutoLoad,
	setResearchLastTab = mainSlice.actions.setResearchLastTab;
