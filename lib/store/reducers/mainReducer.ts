const SETTHEME            = 'main/setTheme',
      SETAUTOBACKUP       = 'main/setAutoBackup',
      SETAUTOSAVEINTERVAL = 'main/setAutoSaveInterval',
      SETAUTOLOADINTERVAL = 'main/setAutoLoadInterval',
      SETLASTSAVED        = 'main/setLastSaved';

export function importBackup( data: any ) {
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

export function setTheme( theme: 'light' | 'dark' ) {
	return {
		type: SETTHEME,
		theme
	};
}

export function setAutoBackup( autoBackup: boolean ) {
	return {
		type: SETAUTOBACKUP,
		autoBackup
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
	lastSaved: string
	theme: string
	autoBackup: boolean
	autoSaveInterval: number
	autoLoadInterval: number
}

const initState: State = {
	lastSaved:        new Date( 0 ).toISOString(),
	theme:            'light',
	autoBackup:       true,
	autoSaveInterval: 2 * 1000,
	autoLoadInterval: 20 * 1000
};

export default function mainReducer( state = initState, action ): State {
	switch ( action.type ) {
	case SETLASTSAVED:
		return { ...state, lastSaved: action.lastSaved };
	case SETTHEME:
		return { ...state, theme: action.theme };
	case SETAUTOBACKUP:
		return { ...state, autoBackup: action.autoBackup };
	case SETAUTOSAVEINTERVAL:
		return { ...state, autoSaveInterval: action.interval };
	case SETAUTOLOADINTERVAL:
		return { ...state, autoLoadInterval: action.interval };
	}
	return state;
}
