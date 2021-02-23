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
	endDate:          moment().startOf( 'day' ).format( 'YYYY-MM-DD' ),
	shop:             [],
	shopExpectedCost: 0,
	daily:            [],
	dailyExpected:    0,
	points:           0,
	farming:          []
};

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
