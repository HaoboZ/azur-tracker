import { configureStore } from '@reduxjs/toolkit';
import { mapValues } from 'lodash';
import {
	createMigrate,
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE
} from 'redux-persist';
import createCompressor from 'redux-persist-transform-compress';
import { PersistedState } from 'redux-persist/es/types';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './reducers';

type RootState = ReturnType<typeof rootReducer>;
type State = RootState & PersistedState;

const migrations: Record<string, ( state: State ) => State> = {
	7: ( state ) => ( {
		...state,
		main: {
			...state.main,
			researchLastTab: 0
		}
	} ),
	8: ( state ) => ( { ...state, fleet: state.ship } ),
	9: ( state ) => ( {
		...state,
		fleet: {
			...state.fleet,
			ships: mapValues( state.fleet.ships, ( ship ) => {
				if ( ship.lvl === 121 ) ship.lvl = 120;
				return ship;
			} )
		}
	} )
};

const persistedReducer = persistReducer<RootState>( {
	key            : 'root',
	version        : 9,
	storage,
	stateReconciler: autoMergeLevel2,
	migrate        : createMigrate( migrations, { debug: false } ),
	transforms     : [ createCompressor() ]
}, rootReducer );

export const store = configureStore( {
	reducer   : persistedReducer,
	devTools  : process.env.NODE_ENV === 'development',
	middleware: ( getDefaultMiddleware ) => getDefaultMiddleware( {
		serializableCheck: {
			ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ]
		}
	} )
} );

export const persistor = persistStore( store );

declare module 'react-redux' {
	// noinspection JSUnusedGlobalSymbols
	interface DefaultRootState extends State {
	}
}
