import moment from 'moment';

const RESET         = 'event/reset',
      SETNAME       = 'event/setName',
      SETENDDATE    = 'event/setEndDate',
      SETSHOP       = 'event/setShop',
      SETDAILY      = 'event/setDaily',
      SETPOINTS     = 'event/setPoints',
      ADDFARMING    = 'event/addFarming',
      MODIFYFARMING = 'event/modifyFarming';

export function event_reset() {
	return {
		type: RESET
	};
}

export function event_setName( name: string ) {
	return {
		type: SETNAME,
		name
	};
}

export function event_setEndDate( endDate: string ) {
	return {
		type: SETENDDATE,
		endDate
	};
}

export function event_setShop( shop: { name: string, cost: number, amount: number, buy: number }[] ) {
	return {
		type: SETSHOP,
		shop
	};
}

export function event_setDaily( daily: { name: string, amount: number }[] ) {
	return {
		type: SETDAILY,
		daily
	};
}

export function event_setPoints( points: number ) {
	return {
		type: SETPOINTS,
		points
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
	return {
		type: MODIFYFARMING,
		index,
		item
	};
}

type State = {
	name: string
	endDate: string
	shop: { name: string, cost: number, amount: number, buy: number }[]
	shopExpectedCost: number
	daily: { name: string, amount: number }[]
	dailyExpected: number
	points: number
	farming: { points: number, oil: number }[]
}

const initState: State = {
	name:             '',
	endDate:          moment().endOf( 'day' ).format( 'YYYY-MM-DDTHH:mm' ),
	shop:             [],
	shopExpectedCost: 0,
	daily:            [],
	dailyExpected:    0,
	points:           0,
	farming:          []
};

initState.name = 'Khorovod of Dawn\'s Rime';
initState.endDate = '2021-03-11T11:59';
initState.shop = [
	{ name: 'Primary Ship', cost: 8000, amount: 5, buy: 1 },
	{ name: 'Secondary Ship', cost: 2000, amount: 5, buy: 1 },
	{ name: 'Gear Skin Box', cost: 2000, amount: 10, buy: 0 },
	{ name: 'Eagle Tech Box', cost: 300, amount: 4, buy: 0 },
	{ name: 'Royal Tech Box', cost: 300, amount: 4, buy: 0 },
	{ name: 'Sakura Tech Box', cost: 300, amount: 4, buy: 0 },
	{ name: 'Ironblood Tech Box', cost: 300, amount: 4, buy: 0 },
	{ name: 'Cognitive Chips', cost: 300, amount: 10, buy: 0 },
	{ name: 'Rare Cat Box', cost: 250, amount: 10, buy: 0 },
	{ name: 'Elite Cat Box', cost: 500, amount: 5, buy: 0 },
	{ name: 'Super Rare Cat Box', cost: 3000, amount: 2, buy: 0 },
	{ name: 'Strengthening Unit', cost: 500, amount: 30, buy: 30 },
	{ name: 'Special Strengthening Unit', cost: 1000, amount: 10, buy: 10 },
	{ name: 'General Part', cost: 30, amount: 30, buy: 0 },
	{ name: 'Main Gun Part', cost: 30, amount: 30, buy: 0 },
	{ name: 'Torpedo Part', cost: 30, amount: 30, buy: 0 },
	{ name: 'Anti-Air Part', cost: 30, amount: 30, buy: 0 },
	{ name: 'Aircraft Part', cost: 30, amount: 30, buy: 0 },
	{ name: 'Coins', cost: 500, amount: 5, buy: 5 },
	{ name: 'Oil', cost: 450, amount: 5, buy: 5 },
	{ name: 'Oxy-cola', cost: 15, amount: 100, buy: 0 }
];
initState.shopExpectedCost = 39750;
initState.daily = [
	{ name: 'Build 3 ships', amount: 300 },
	{ name: 'Sortie and obtain 15 victories', amount: 300 },
	{ name: 'Sortie and clear 1 non-event Hard Mode Stage', amount: 150 }
];
initState.dailyExpected = 750;
initState.farming = [
	{ points: 180, oil: 10 + 25 * 6 + 40 }
];

export default function eventReducer( state = initState, action ): State {
	switch ( action.type ) {
	case 'import':
		if ( 'event' in action.data ) {
			return action.data.event;
		}
		break;
	case RESET:
		return initState;
	case SETNAME:
		return { ...state, name: action.name };
	case SETENDDATE:
		return { ...state, endDate: action.endDate };
	case SETSHOP:
		return {
			...state,
			shop:             action.shop,
			shopExpectedCost: action.shop.reduce(
				( total, item ) => total + item.cost * Math.min( item.amount, item.buy )
				, 0 )
		};
	case SETDAILY:
		return {
			...state,
			daily:         action.daily,
			dailyExpected: action.daily.reduce( ( total, item ) => total + item.amount, 0 )
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
