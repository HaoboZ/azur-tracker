const RESET   = 'ship/reset',
      SETSHIP = 'ship/setShip';

export function ship_reset() {
	return { type: RESET };
}

export function ship_setShip( name: string, ship ) {
	return {
		type: SETSHIP,
		name,
		ship
	};
}

type State = {
	ships: { [ name: string ]: { lvl: number, equip: number[] } }
}

const initState: State = {
	ships: {}
};

export default function shipReducer( state = initState, action ): State {
	switch ( action.type ) {
	case 'import':
		if ( 'ship' in action.data ) {
			return action.data.ship;
		}
		break;
	case RESET:
		return initState;
	case SETSHIP:
		state.ships;
		return { ...state };
	}
	return state;
}
