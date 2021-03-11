import { equipTier } from '../reference/equipRef';
import shipRef from '../reference/shipRef';

const RESET        = 'ship/reset',
      CHECKVERSION = 'ship/checkVersion',
      SETSHIP      = 'ship/setShip';

export function ship_reset() {
	return { type: RESET };
}

export function ship_checkVersion() {
	return { type: CHECKVERSION };
}

export function ship_setShip( name: string, ship: {
	lvl?: number
	love?: number
	equip?: [ number, boolean? ][]
	tier?: string
} ) {
	const tier = getTier( shipRef[ name ], ship.equip );
	if ( tier ) ship.tier = tier;
	
	return {
		type: SETSHIP,
		name,
		ship
	};
}

function getTier( ship: { equip: string[] }, equip: [ number, boolean? ][] ) {
	return equip?.map( ( eq, i ) => {
		if ( !eq?.[ 0 ] ) return '—';
		if ( eq[ 1 ] ) return '✹';
		const tier = equipTier[ ship.equip[ i ] ];
		if ( eq[ 0 ] in tier ) {
			return '✷★☆✦✧'[ tier[ eq[ 0 ] ][ 0 ] ];
		} else {
			return '🞅';
		}
	} ).join( '' );
}

type State = {
	ships: {
		[ name: string ]: {
			lvl: number
			love: number
			equip: [ number, boolean? ][]
			tier: string
		}
	},
	version: string
}

const initState: State = {
	ships:   {},
	version: '2021-03-11'
};

export default function shipReducer( state = initState, action ): State {
	switch ( action.type ) {
	case 'import':
		if ( 'ship' in action.data )
			return action.data.ship;
		break;
	case CHECKVERSION:
		if ( state.version !== initState.version ) {
			for ( const name in state.ships ) {
				const ship = state.ships[ name ];
				const tier = getTier( shipRef[ name ], ship.equip );
				if ( tier ) ship.tier = tier;
			}
			
			return { ...state, version: initState.version };
		}
		break;
	case RESET:
		return initState;
	case SETSHIP:
		state.ships[ action.name ] = { ...state.ships[ action.name ], ...action.ship };
		return { ...state };
	}
	return state;
}
