import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const version = '2021-10-08';

const initialState: State = {
	ships : {},
	filter: {
		levelMax: true,
		equipMax: true,
		level0  : true
	},
	version
};

const fleetSlice = createSlice( {
	name    : 'fleet',
	initialState,
	reducers: {
		fleet_reset() {
			return initialState;
		},
		fleet_setVersion( state ) {
			state.version = initialState.version;
		},
		fleet_setShips( state, { payload }: PayloadAction<Record<string, {
			lvl: number,
			love: number,
			equip: [ number, 0 | 1, number ][] // id, override, tier
		}>> ) {
			state.ships = payload;
		},
		fleet_setShip( state, { payload }: PayloadAction<{
			name: string,
			ship: {
				lvl?: number,
				love?: number,
				equip?: [ number, 0 | 1, number ][]
			}
		}> ) {
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
	fleet_reset      = fleetSlice.actions.fleet_reset,
	fleet_setVersion = fleetSlice.actions.fleet_setVersion,
	fleet_setShips   = fleetSlice.actions.fleet_setShips,
	fleet_setShip    = fleetSlice.actions.fleet_setShip,
	fleet_setFilter  = fleetSlice.actions.fleet_setFilter;
