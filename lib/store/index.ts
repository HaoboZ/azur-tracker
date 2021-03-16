import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { createStore } from 'redux';
import { createMigrate, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './reducers';

const migrations = {
	1: ( state: RootState ) => ( {
		...state,
		ship: {
			...state.ship,
			filter: {
				levelMax: true,
				equipMax: true,
				level0:   true
			}
		}
	} )
} as Record<string | number, ( state: RootState ) => RootState>;

const persistedReducer = persistReducer( {
	key:     'root',
	version: 1,
	storage,
	migrate: createMigrate( migrations as any, { debug: false } )
}, rootReducer );

const store = createStore( persistedReducer );
export default store;
export const persistor = persistStore( store );

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
