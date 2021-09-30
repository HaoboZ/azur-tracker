import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { equipTier, version } from '../../../data/equipData';
import fleetRef from '../../../data/fleetData';

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
		eq[ 2 ] = tier && eq[ 0 ] in tier ? tier[ eq[ 0 ] ][ 0 ] + 1 : 6;
	} );
}

const fleetSlice = createSlice( {
	name         : 'fleet',
	initialState,
	reducers     : {
		fleet_reset() {
			return initialState;
		},
		fleet_checkVersion( state ) {
			if ( state.version !== initialState.version ) {
				// recalculate equipment tiers
				for ( const name in state.ships ) {
					const ship = state.ships[ name ];
					getTier( fleetRef[ name ], ship.equip );
				}
				state.version = initialState.version;
			}
		},
		fleet_setShip( state, { payload }: PayloadAction<{
			name: string,
			ship: {
				lvl?: number,
				love?: number,
				equip?: [ number, 0 | 1, number ][]
			}
		}> ) {
			getTier( fleetRef[ payload.name ], payload.ship.equip );
			state.ships = {
				...state.ships,
				[ payload.name ]: { ...state.ships[ payload.name ], ...payload.ship }
			};
		},
		fleet_setFilter( state, { payload }: PayloadAction<{
			levelMax?: boolean,
			equipMax?: boolean,
			level0?: boolean
		}> ) {
			state.filter = { ...state.filter, ...payload };
		}
	},
	extraReducers: {
		import( state, { payload } ) {
			if ( 'fleet' in payload ) return payload.fleet;
		}
	}
} );

export default fleetSlice.reducer;
export const
	fleet_reset        = fleetSlice.actions.fleet_reset,
	fleet_checkVersion = fleetSlice.actions.fleet_checkVersion,
	fleet_setShip      = fleetSlice.actions.fleet_setShip,
	fleet_setFilter    = fleetSlice.actions.fleet_setFilter;
