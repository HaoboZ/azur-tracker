import { combineReducers, configureStore } from '@reduxjs/toolkit';
import event from './reducers/eventReducer';
import fleet from './reducers/fleetReducer';
import main from './reducers/mainReducer';
import research from './reducers/researchReducer';

const rootReducer = combineReducers({ main, event, research, fleet });

export function createStore(preloadedState) {
	return configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV === 'development',
		preloadedState,
	});
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
