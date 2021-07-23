import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import eventRef from '../../reference/eventRef';

type State = {
	name: string,
	shop: Record<string, number>,
	shopExpectedCost: number,
	daily: { id: string, name: string, amount: number }[],
	dailyExpected: number,
	points: number,
	farming: { id: string, points: number, oil: number }[]
};

const initialState: State = {
	name            : '',
	shop            : {
		'Gear Skin Box'                       : 0,
		'T4 Eagle Tech Box'                   : 0,
		'T4 Royal Tech Box'                   : 0,
		'T4 Sakura Tech Box'                  : 0,
		'T4 Ironblood Tech Box'               : 0,
		'Cognitive Chips'                     : 0,
		'Rare Cat Box'                        : 0,
		'Elite Cat Box'                       : 0,
		'Super Rare Cat Box'                  : 2,
		'General Blueprint - Series 4'        : 30,
		'Special General Blueprint - Series 4': 10,
		'T3 General Part'                     : 0,
		'T3 Main Gun Part'                    : 0,
		'T3 Torpedo Part'                     : 0,
		'T3 Anti-Air Part'                    : 0,
		'T3 Aircraft Part'                    : 0,
		'Coins'                               : 5,
		'Oil'                                 : 5,
		'Oxy-cola'                            : 0
	},
	shopExpectedCost: 0,
	daily           : [
		{ id: nanoid( 16 ), name: 'Build 3 ships', amount: 300 },
		{ id: nanoid( 16 ), name: 'Sortie and obtain 15 victories', amount: 300 },
		{ id: nanoid( 16 ), name: 'Sortie and clear 1 non-event Hard Mode Stage', amount: 150 },
		{ id: nanoid( 16 ), name: 'SP Stage', amount: 800 }
	],
	dailyExpected   : 1550,
	points          : 0,
	farming         : [
		{ id: nanoid( 16 ), points: 180, oil: 10 + 25 * 6 + 40 }
	]
};

function newEvent( state ) {
	return {
		...state,
		name            : eventRef.name,
		shopExpectedCost: eventRef.shop.reduce( ( total, item ) =>
			total + item.cost * Math.min( item.amount, state.shop[ item.name ] || 0 ), 0 ),
		points          : 0
	};
}

const eventSlice = createSlice( {
	name         : 'event',
	initialState,
	reducers     : {
		event_reset() {
			return newEvent( initialState );
		},
		event_newEvent( state ) {
			return newEvent( state );
		},
		event_setShop( state, { payload }: PayloadAction<{
			shop: Record<string, number>,
			total: number
		}> ) {
			state.shop = payload.shop;
			state.shopExpectedCost = payload.total;
		},
		event_setDaily( state, { payload }: PayloadAction<{
			daily: {
				id: string,
				name: string,
				amount: number
			}[],
			total: number
		}> ) {
			state.daily = payload.daily;
			state.dailyExpected = payload.total;
		},
		event_setPoints( state, { payload }: PayloadAction<number> ) {
			state.points = Math.max( payload || 0, 0 );
		},
		event_setFarming( state, { payload }: PayloadAction<{
			id: string,
			points: number,
			oil: number
		}[]> ) {
			state.farming = payload;
		},
		event_modifyFarming( state, { payload }: PayloadAction<{
			index: number,
			item: { points?: number, oil?: number }
		}> ) {
			if ( 'points' in payload.item ) payload.item.points = Math.max( payload.item.points || 0, 0 );
			if ( 'oil' in payload.item ) payload.item.oil = Math.max( payload.item.oil || 0, 0 );
			
			state.farming = [ ...state.farming ];
			state.farming[ payload.index ] = { ...state.farming[ payload.index ], ...payload.item };
		}
	},
	extraReducers: {
		import( state, { payload } ) {
			if ( 'event' in payload ) return payload.event;
		}
	}
} );

export default eventSlice.reducer;
export const
	event_reset         = eventSlice.actions.event_reset,
	event_newEvent      = eventSlice.actions.event_newEvent,
	event_setShop       = eventSlice.actions.event_setShop,
	event_setDaily      = eventSlice.actions.event_setDaily,
	event_setPoints     = eventSlice.actions.event_setPoints,
	event_setFarming    = eventSlice.actions.event_setFarming,
	event_modifyFarming = eventSlice.actions.event_modifyFarming;
