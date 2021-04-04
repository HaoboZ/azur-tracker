const SETTHEME      = 'main/setTheme',
      SETAUTOBACKUP = 'main/setAutoBackup';

export function importBackup( data: any ) {
	return {
		type: 'import',
		data
	};
}

export function setTheme( theme: string ) {
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

type State = {
	theme: string
	autoBackup: boolean
}

const initState: State = {
	theme:      'light',
	autoBackup: true
};

export default function mainReducer( state = initState, action ): State {
	switch ( action.type ) {
	case SETTHEME:
		return { ...state, theme: action.theme };
	case SETAUTOBACKUP:
		return { ...state, autoBackup: action.autoBackup };
		
	}
	return state;
}
