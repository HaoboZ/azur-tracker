const SETTHEME      = 'main/setTheme',
      SETAUTOBACKUP = 'main/setAutoBackup',
      SETLASTSAVED  = 'main/setLastSaved';

export function importBackup( data: any ) {
	return {
		type: 'import',
		data
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

export function setLastSaved( lastSaved: string ) {
	return {
		type: SETLASTSAVED,
		lastSaved
	};
}

type State = {
	theme: string
	autoBackup: boolean
	lastSaved: string
}

const initState: State = {
	theme:      'light',
	autoBackup: true,
	lastSaved:  new Date( 0 ).toISOString()
};

export default function mainReducer( state = initState, action ): State {
	switch ( action.type ) {
	case SETTHEME:
		return { ...state, theme: action.theme };
	case SETAUTOBACKUP:
		return { ...state, autoBackup: action.autoBackup };
	case SETLASTSAVED:
		return { ...state, lastSaved: action.lastSaved };
	}
	return state;
}
