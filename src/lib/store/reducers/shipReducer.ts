import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { equipTier, version } from '../../../data/equipData';
import shipRef from '../../../data/shipData';

type State = {
	ships: Record<string, {
		lvl: number,
		love: number,
		equip: [ number, 0 | 1, number ][] // id, override, tier
	}>,
	filter: {
		levelMax: boolean,
		equipMax: boolean,
		level0: boolean
	},
	version: string
};

const initialState: State = {
	ships : {},
	filter: {
		levelMax: true,
		equipMax: true,
		level0  : true
	},
	version
};

export function getTier( ship: { equipType: string[] }, equip: [ number, 0 | 1, number ][] ) {
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
		const tier = equipTier[ ship.equipType[ i ] ];
		eq[ 2 ] = eq[ 0 ] in tier ? tier[ eq[ 0 ] ][ 0 ] + 1 : 6;
	} );
}

const shipSlice = createSlice( {
	name         : 'ship',
	initialState,
	reducers     : {
		ship_reset() {
			return initialState;
		},
		ship_checkVersion( state ) {
			if ( state.version !== initialState.version ) {
				// recalculate equipment tiers
				for ( const name in state.ships ) {
					const ship = state.ships[ name ];
					getTier( shipRef[ name ], ship.equip );
				}
				state.version = initialState.version;
			}
		},
		ship_setShip( state, { payload }: PayloadAction<{
			name: string,
			ship: {
				lvl?: number,
				love?: number,
				equip?: [ number, 0 | 1, number ][]
			}
		}> ) {
			getTier( shipRef[ payload.name ], payload.ship.equip );
			state.ships = {
				...state.ships,
				[ payload.name ]: { ...state.ships[ payload.name ], ...payload.ship }
			};
		},
		ship_setFilter( state, { payload }: PayloadAction<{
			levelMax?: boolean,
			equipMax?: boolean,
			level0?: boolean
		}> ) {
			state.filter = { ...state.filter, ...payload };
		}
	},
	extraReducers: {
		import( state, { payload } ) {
			if ( 'ship' in payload ) return payload.ship;
		}
	}
} );

export default shipSlice.reducer;
export const
	ship_reset        = shipSlice.actions.ship_reset,
	ship_checkVersion = shipSlice.actions.ship_checkVersion,
	ship_setShip      = shipSlice.actions.ship_setShip,
	ship_setFilter    = shipSlice.actions.ship_setFilter;
