import eventRef from '../reference/eventRef';

const RESET         = 'event/reset',
      NEWEVENT      = 'event/newEvent',
      SETSHOP       = 'event/setShop',
      SETDAILY      = 'event/setDaily',
      SETPOINTS     = 'event/setPoints',
      ADDFARMING    = 'event/addFarming',
      MODIFYFARMING = 'event/modifyFarming';

export function event_reset() {
	return { type: RESET };
}

export function event_newEvent() {
	return { type: NEWEVENT };
}

export function event_setShop( shop: Record<string, number>, total: number ) {
	return {
		type: SETSHOP,
		shop,
		total
	};
}

export function event_setDaily( daily: { name: string, amount: number }[], total: number ) {
	return {
		type: SETDAILY,
		daily,
		total
	};
}

export function event_setPoints( points: number ) {
	return {
		type:   SETPOINTS,
		points: Math.max( points || 0, 0 )
	};
}

export function event_addFarming( index: number, remove?: boolean ) {
	
	return {
		type: ADDFARMING,
		index,
		remove
	};
}

export function event_modifyFarming( index: number, item: { points?: number, oil?: number } ) {
	if ( 'points' in item ) item.points = Math.max( item.points || 0, 0 );
	if ( 'oil' in item ) item.oil = Math.max( item.oil || 0, 0 );
	return {
		type: MODIFYFARMING,
		index,
		item
	};
}

type State = {
	name: string
	shop: Record<string, number>
	shopExpectedCost: number
	daily: { name: string, amount: number }[]
	dailyExpected: number
	points: number
	farming: { points: number, oil: number }[]
}

const initState: State = {
	name:             '',
	shop:             {
		'Gear Skin Box':                        0,
		'T4 Eagle Tech Box':                    0,
		'T4 Royal Tech Box':                    0,
		'T4 Sakura Tech Box':                   0,
		'T4 Ironblood Tech Box':                0,
		'Cognitive Chips':                      0,
		'Rare Cat Box':                         0,
		'Elite Cat Box':                        0,
		'Super Rare Cat Box':                   2,
		'General Blueprint - Series 3':         30,
		'Special General Blueprint - Series 3': 10,
		'T3 General Part':                      0,
		'T3 Main Gun Part':                     0,
		'T3 Torpedo Part':                      0,
		'T3 Anti-Air Part':                     0,
		'T3 Aircraft Part':                     0,
		'Coins':                                5,
		'Oil':                                  5,
		'Oxy-cola':                             0
	},
	shopExpectedCost: 0,
	daily:            [
		{ name: 'Build 3 ships', amount: 300 },
		{ name: 'Sortie and obtain 15 victories', amount: 300 },
		{ name: 'Sortie and clear 1 non-event Hard Mode Stage', amount: 150 },
		{ name: 'SP Stage', amount: 800 }
	],
	dailyExpected:    1550,
	points:           0,
	farming:          [
		{ points: 180, oil: 10 + 25 * 6 + 40 }
	]
};

export default function eventReducer( state = initState, action ): State {
	switch ( action.type ) {
	case 'import':
		if ( 'event' in action.data )
			return action.data.event;
		break;
	case RESET:
		state = initState;
		// noinspection FallThroughInSwitchStatementJS
	case NEWEVENT:
		return {
			...state,
			name:             eventRef.name,
			shopExpectedCost: Object.keys( eventRef.shop ).reduce(
				( total, item ) => total
					+ eventRef.shop[ item ].cost * Math.min( eventRef.shop[ item ].amount, state.shop[ item ] || 0 )
				, 0 ),
			points:           0
		};
	case SETSHOP:
		return {
			...state,
			shop:             action.shop,
			shopExpectedCost: action.total
		};
	case SETDAILY:
		return {
			...state,
			daily:         action.daily,
			dailyExpected: action.total
		};
	case SETPOINTS:
		return { ...state, points: action.points };
	case ADDFARMING:
		if ( !action.remove && state.farming.length >= action.index ) {
			state.farming.splice( action.index, 0, { points: 0, oil: 0 } );
			return { ...state, farming: [ ...state.farming ] };
		} else if ( state.farming.length > action.index ) {
			state.farming.splice( action.index, 1 );
			return { ...state, farming: [ ...state.farming ] };
		}
		return state;
	case MODIFYFARMING:
		state.farming[ action.index ] = { ...state.farming[ action.index ], ...action.item };
		return { ...state, farming: state.farming };
	}
	return state;
}
