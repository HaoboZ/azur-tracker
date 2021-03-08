import { equipTier } from '../reference/equipRef';
import shipRef from '../reference/shipRef';

const RESET   = 'ship/reset',
      SETSHIP = 'ship/setShip';

export function ship_reset() {
	return { type: RESET };
}

export function ship_setShip( name: string, ship: {
	lvl?: number
	love?: number
	equip?: number[]
	tier?: string
} ) {
	const tier = ship.equip?.map( ( eq, i ) => {
		if ( !eq ) return '—';
		const _ship = shipRef[ name ];
		const _tier = equipTier[ _ship.equip[ i ] ];
		if ( eq in _tier ) {
			return '✷★☆✦✧'[ _tier[ eq ][ 0 ] ];
		} else {
			return '🞅';
		}
	} ).join( '' );
	if ( tier ) ship.tier = tier;
	
	return {
		type: SETSHIP,
		name,
		ship
	};
}

type State = {
	ships: {
		[ name: string ]: {
			lvl: number
			love: number
			equip: number[]
			tier: string
		}
	}
}

const initState: State = {
	ships: {}
};

export default function shipReducer( state = initState, action ): State {
	switch ( action.type ) {
	case 'import':
		if ( 'ship' in action.data )
			return action.data.ship;
		break;
	case RESET:
		return initState;
	case SETSHIP:
		state.ships[ action.name ] = { ...state.ships[ action.name ], ...action.ship };
		return { ...state };
	}
	return state;
}
