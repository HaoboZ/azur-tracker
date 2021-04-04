const SETTHEME = 'main/setTheme';

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

type State = {
	theme: string
}

const initState: State = {
	theme: 'light'
};

export default function mainReducer( state = initState, action ): State {
	switch ( action.type ) {
	case SETTHEME:
		return { ...state, theme: action.theme };
	}
	return state;
}
