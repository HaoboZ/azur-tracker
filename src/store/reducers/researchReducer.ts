import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
	ships: Record<string, {
		devLevel?: number,
		devStage?: number,
		fateLevel?: number,
		fateStage?: number
	}>,
	lastTab: number
};

const initialState: State = {
	ships  : {},
	lastTab: 0
};

const researchSlice = createSlice( {
	name         : 'research',
	initialState,
	reducers     : {
		research_reset() {
			return initialState;
		},
		research_modifyShip( state, { payload }: PayloadAction<{
			ship: string,
			item: {
				devLevel?: number,
				devStage?: number,
				fateLevel?: number,
				fateStage?: number
			},
			maxDev?: number
		}> ) {
			const { item, maxDev } = payload;
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
			state.ships = {
				...state.ships,
				[ payload.ship ]: { ...state.ships[ payload.ship ], ...payload.item }
			};
		},
		research_setLastTab( state, { payload }: PayloadAction<number> ) {
			state.lastTab = payload;
		}
	},
	extraReducers: {
		import( state, { payload } ) {
			if ( 'research' in payload ) return payload.research;
		}
	}
} );

export default researchSlice.reducer;
export const
	research_reset      = researchSlice.actions.research_reset,
	research_modifyShip = researchSlice.actions.research_modifyShip,
	research_setLastTab = researchSlice.actions.research_setLastTab;
