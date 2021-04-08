import { equipTier } from '../../reference/equipRef';
import shipRef from '../../reference/shipRef';

const RESET        = 'ship/reset',
      CHECKVERSION = 'ship/checkVersion',
      SETSHIP      = 'ship/setShip',
      SETFILTER    = 'ship/setFilter';

export function ship_reset() {
	return { type: RESET };
}

export function ship_checkVersion() {
	return { type: CHECKVERSION };
}

export function ship_setShip( name: string, ship: {
	lvl?: number
	love?: number
	equip?: [ number, 0 | 1 ][]
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

export function ship_setFilter( filter: { levelMax?: boolean, equipMax?: boolean, level0?: boolean } ) {
	return {
		type: SETFILTER,
		filter
	};
}

function getTier( ship: { equip: string[] }, equip: [ number, 0 | 1 ][] ) {
	return equip?.map( ( eq, i ) => {
		if ( !eq?.[ 0 ] ) return '—';
		if ( eq[ 1 ] ) return '✷'; //✹
		const tier = equipTier[ ship.equip[ i ] ];
		if ( eq[ 0 ] in tier ) {
			return '✷★☆✦✧'[ tier[ eq[ 0 ] ][ 0 ] ];
		} else {
			return '🞅';
		}
	} ).join( '' );
}

type State = {
	ships: Record<string, {
		lvl: number
		love: number
		equip: [ number, 0 | 1 ][]
		tier: string
	}>,
	filter: {
		levelMax: boolean
		equipMax: boolean
		level0: boolean
	}
	version: string
}

const initState: State = {
	ships:   {},
	filter:  {
		levelMax: true,
		equipMax: true,
		level0:   true
	},
	version: '2021-03-15'
};

export default function shipReducer( state = initState, action ): State {
	switch ( action.type ) {
	case 'import':
		if ( action.data?.ship )
			return action.data.ship;
		break;
	case CHECKVERSION:
		if ( state.version !== initState.version ) {
			// recalculate equipment tiers
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
	case SETFILTER:
		return { ...state, filter: { ...state.filter, ...action.filter } };
	}
	return state;
}
