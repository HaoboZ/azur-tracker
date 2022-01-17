import { configureStore } from '@reduxjs/toolkit';
import { mapValues, omit } from 'lodash';
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
	9 : ( state ) => ( {
		...state,
		fleet: {
			...state.fleet,
			ships: mapValues( state.fleet.ships, ( ship ) => {
				if ( ship.lvl === 121 ) ship.lvl = 120;
				return ship;
			} )
		}
	} ),
	10: ( state ) => ( {
		...state,
		main: {
			...omit( state.main, 'lastSaved' ),
			// eslint-disable-next-line @typescript-eslint/dot-notation
			timestamp: state.main[ 'lastSaved' ]
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
