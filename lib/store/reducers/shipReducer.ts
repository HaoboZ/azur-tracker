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
	equip?: [ number, 0 | 1, number ][]
} ) {
	getTier( shipRef[ name ], ship.equip );
	
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

export function getTier( ship: { equip: string[] }, equip: [ number, 0 | 1, number ][] ) {
	equip?.forEach( ( eq, i ) => {
		if ( !eq ) return;
		if ( !eq[ 0 ] ) {
			eq[ 2 ] = 0;
			return;
		}
		if ( eq[ 1 ] ) {
			eq[ 2 ] = 1;
			return;
		}
		const tier = equipTier[ ship.equip[ i ] ];
		eq[ 2 ] = eq[ 0 ] in tier ? tier[ eq[ 0 ] ][ 0 ] + 1 : 6;
	} );
}

type State = {
	ships: Record<string, {
		lvl: number
		love: number
		equip: [ number, 0 | 1, number ][]
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
	version: '2021-05-02'
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
				getTier( shipRef[ name ], ship.equip );
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
