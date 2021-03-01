import { combineReducers } from 'redux';

import eventReducer from './eventReducer';
import mainReducer from './mainReducer';
import researchReducer from './researchReducer';
import shipReducer from './shipReducer';

export const rootReducer = combineReducers( {
	main:     mainReducer,
	event:    eventReducer,
	research: researchReducer,
	ship:    shipReducer
} );
