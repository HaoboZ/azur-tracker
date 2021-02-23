import { combineReducers } from 'redux';

import eventReducer from './eventReducer';
import researchReducer from './researchReducer';

export const rootReducer = combineReducers( {
	event:    eventReducer,
	research: researchReducer
} );
