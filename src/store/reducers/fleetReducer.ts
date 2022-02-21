import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
	timestamp: string,
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

export const version = '2022-02-20';

const initialState: State = {
	timestamp: new Date( 0 ).toISOString(),
	ships    : {},
	filter   : {
		levelMax: true,
		equipMax: true,
		level0  : true
	},
	version
};

const fleetSlice = createSlice( {
	name         : 'fleet',
	initialState,
	reducers     : {
		fleet_reset() {
			return { ...initialState, timestamp: new Date().toISOString() };
		},
		fleet_setVersion( state ) {
			state.timestamp = new Date().toISOString();
			state.version = initialState.version;
		},
		fleet_setShips( state, { payload }: PayloadAction<Record<string, {
			lvl: number,
			love: number,
			equip: [ number, 0 | 1, number ][] // id, override, tier
		}>> ) {
			state.timestamp = new Date().toISOString();
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
			state.timestamp = new Date().toISOString();
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
			state.timestamp = new Date().toISOString();
			state.filter = { ...state.filter, ...payload };
		}
	},
	extraReducers: {
		import( state, { payload }: PayloadAction<{ key, data }> ) {
			if ( payload.key === 'fleet' ) return { ...state, ...payload.data };
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
