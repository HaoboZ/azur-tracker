const RESET      = 'research/reset',
      SETLASTTAB = 'research/setLastTab',
      MODIFYSHIP = 'research/modifyShip';

export function research_reset() {
	return {
		type: RESET
	};
}

export function research_setLastTab( lastTab: string ) {
	return {
		type: SETLASTTAB,
		lastTab
	};
}

export function research_modifyShip( ship: string, item: {
	devLevel?: number
	devStage?: number
	fateLevel?: number
	fateStage?: number
} ) {
	return {
		type: MODIFYSHIP,
		ship,
		item
	};
}

type State = {
	lastTab: string
	ships: {
		[ ship: string ]: {
			devLevel: number
			devStage: number
			fateLevel?: number
			fateStage?: number
		}
	}
}

const initState: State = {
	lastTab: 'R1',
	ships:   {}
};

export default function researchReducer( state = initState, action ): State {
	switch ( action.type ) {
	case 'import':
		if ( 'research' in action.data ) {
			return action.data.research;
		}
		break;
	case RESET:
		return initState;
	case SETLASTTAB:
		return { ...state, lastTab: action.lastTab };
	case MODIFYSHIP:
		state.ships[ action.ship ] = { ...state.ships[ action.ship ], ...action.item };
		return { ...state, ...state.ships };
	}
	return state;
}
