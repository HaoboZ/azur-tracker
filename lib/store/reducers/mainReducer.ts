const
	SETLASTSAVED        = 'main/setLastSaved',
	SETNEWDATA          = 'main/setNewData',
	SETTHEME            = 'main/setTheme',
	SETAUTOSAVE         = 'main/setAutoSave',
	SETAUTOLOAD         = 'main/setAutoLoad',
	SETAUTOSAVEINTERVAL = 'main/setAutoSaveInterval',
	SETAUTOLOADINTERVAL = 'main/setAutoLoadInterval';

export function importBackup( data ) {
	return {
		type: 'import',
		data
	};
}

export function setLastSaved( lastSaved: string ) {
	return {
		type: SETLASTSAVED,
		lastSaved
	};
}

export function setNewData( newData: Record<string, boolean> ) {
	return {
		type: SETNEWDATA,
		newData
	};
}

export function setTheme( theme: string ) {
	return {
		type: SETTHEME,
		theme
	};
}

export function setAutoSave( autoSave: boolean ) {
	return {
		type: SETAUTOSAVE,
		autoSave
	};
}

export function setAutoLoad( autoLoad: boolean ) {
	return {
		type: SETAUTOLOAD,
		autoLoad
	};
}

export function setAutoSaveInterval( interval: number ) {
	return {
		type: SETAUTOSAVEINTERVAL,
		interval
	};
}

export function setAutoLoadInterval( interval: number ) {
	return {
		type: SETAUTOLOADINTERVAL,
		interval
	};
}

type State = {
	lastSaved: string,
	newData: Record<string, boolean>,
	theme: string,
	autoSave: boolean,
	autoLoad: boolean,
	autoSaveInterval: number,
	autoLoadInterval: number
};

const initState: State = {
	lastSaved       : new Date( 0 ).toISOString(),
	newData         : {},
	theme           : 'default',
	autoSave        : true,
	autoLoad        : true,
	autoSaveInterval: 2 * 1000,
	autoLoadInterval: 20 * 1000
};

export default function mainReducer( state = initState, action ): State {
	switch ( action.type ) {
	case SETLASTSAVED:
		return { ...state, lastSaved: action.lastSaved };
	case SETNEWDATA:
		return { ...state, newData: { ...state.newData, ...action.newData } };
	case SETTHEME:
		return { ...state, theme: action.theme };
	case SETAUTOSAVE:
		return { ...state, autoSave: action.autoSave };
	case SETAUTOLOAD:
		return { ...state, autoLoad: action.autoLoad };
	case SETAUTOSAVEINTERVAL:
		return { ...state, autoSaveInterval: action.interval };
	case SETAUTOLOADINTERVAL:
		return { ...state, autoLoadInterval: action.interval };
	}
	return state;
}
