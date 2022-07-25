import { configureStore } from '@reduxjs/toolkit';
import { omit } from 'lodash-es';
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

type State = ReturnType<typeof rootReducer>;
export type RootState = State & PersistedState;

const migrations: Record<string, ( state: RootState ) => RootState> = {
	10: ( state ) => ( {
		...state,
		main    : omit( state.main, 'lastSaved' ),
		event   : { ...state.event, timestamp: new Date( 0 ).toISOString() },
		research: { ...state.research, timestamp: new Date( 0 ).toISOString() },
		fleet   : { ...state.fleet, timestamp: new Date( 0 ).toISOString() }
	} ),
	11: ( state ) => ( {
		...state,
		main: {
			...omit( state.main, [ 'autoSave', 'autoLoad' ] ) as any,
			// @ts-ignore
			autoBackup: state.main.autoSave
		}
	} ),
	12: ( state ) => ( {
		...state,
		main    : {
			...omit( state.main, 'autoBackup' ),
			// @ts-ignore
			unViewed: state.main.newData,
			// @ts-ignore
			autoSync     : state.main.autoBackup,
			timestamp    : new Date( 0 ).toISOString(),
			lastTimestamp: null
		},
		event   : omit( state.event, 'timestamp' ),
		research: omit( state.research, 'timestamp' ),
		fleet   : omit( state.fleet, 'timestamp' )
	} )
};

const persistedReducer = persistReducer<State>( {
	key            : 'root',
	version        : 12,
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

export type AppDispatch = typeof store.dispatch;
