import { combineReducers } from 'redux';

import eventReducer from './eventReducer';
import mainReducer from './mainReducer';
import researchReducer from './researchReducer';

export const rootReducer = combineReducers( {
	main:     mainReducer,
	event:    eventReducer,
	research: researchReducer
} );
