import { configureStore } from '@reduxjs/toolkit';
import { debounce } from 'lodash';
import { loadState, saveState } from './persist';
import event from './reducers/eventReducer';
import fleet from './reducers/fleetReducer';
import main from './reducers/mainReducer';
import research from './reducers/researchReducer';

export const store = configureStore({
	reducer: {
		main,
		event,
		research,
		fleet,
	},
	devTools: process.env.NODE_ENV === 'development',
	preloadedState: loadState(),
});

store.subscribe(debounce(() => saveState(store.getState()), 500));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
