import { combineReducers } from 'redux';

import event from './eventReducer';
import fleet from './fleetReducer';
import main from './mainReducer';
import research from './researchReducer';

export const rootReducer = combineReducers( {
	main,
	event,
	research,
	fleet
} );
