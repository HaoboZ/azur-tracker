import { combineReducers } from 'redux';

import event from './eventReducer';
import main from './mainReducer';
import research from './researchReducer';
import ship from './shipReducer';

export const rootReducer = combineReducers( {
	main,
	event,
	research,
	ship
} );
