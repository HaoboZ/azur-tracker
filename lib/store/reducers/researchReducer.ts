const RESET      = 'research/reset',
      SETLASTTAB = 'research/setLastTab',
      MODIFYSHIP = 'research/modifyShip';

export function research_reset() {
	return { type: RESET };
}

export function research_setLastTab( lastTab: number ) {
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
}, maxDev?: number ) {
	if ( 'devStage' in item ) {
		item.devStage = Math.min( Math.max( item.devStage, 0 ), maxDev );
	}
	if ( 'devLevel' in item ) {
		item.devLevel = Math.min( Math.max( item.devLevel, 0 ), 30 );
		item.devStage = 0;
	}
	if ( 'fateLevel' in item ) {
		item.fateLevel = Math.min( Math.max( item.fateLevel, 0 ), 5 );
		item.fateStage = 0;
	}
	if ( 'fateStage' in item ) item.fateStage = Math.min( Math.max( item.fateStage, 0 ), 100 );
	return {
		type: MODIFYSHIP,
		ship,
		item
	};
}

type State = {
	lastTab: number
	ships: Record<string, {
		devLevel?: number
		devStage?: number
		fateLevel?: number
		fateStage?: number
	}>
}

const initState: State = {
	lastTab: 0,
	ships  : {}
};

export default function researchReducer( state = initState, action ): State {
	switch ( action.type ) {
	case 'import':
		if ( action.data?.research )
			return action.data.research;
		break;
	case RESET:
		return initState;
	case SETLASTTAB:
		return { ...state, lastTab: action.lastTab };
	case MODIFYSHIP:
		state.ships[ action.ship ] = { ...state.ships[ action.ship ], ...action.item };
		return { ...state, ships: { ...state.ships } };
	}
	return state;
}
