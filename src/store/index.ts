import { Preferences } from '@capacitor/preferences';
import { configureStore } from '@reduxjs/toolkit';
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
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { rootReducer } from './reducers';

type State = ReturnType<typeof rootReducer>;

const migrations: Record<string, ( state ) => any> = {};

// noinspection JSUnusedGlobalSymbols
const persistedReducer = persistReducer<State>( {
	key            : 'root',
	version        : 0,
	storage        : {
		getItem   : async ( key ) => {
			if ( typeof window === 'undefined' ) return;
			const { value } = await Preferences.get( { key } );
			return value;
		},
		setItem   : async ( key, value ) => {
			if ( typeof window === 'undefined' ) return;
			await Preferences.set( { key, value } );
		},
		removeItem: async ( key: string ): Promise<void> => {
			if ( typeof window === 'undefined' ) return;
			await Preferences.remove( { key } );
		}
	},
	stateReconciler: autoMergeLevel2,
	migrate        : createMigrate( migrations, { debug: false } ),
	transforms     : [ createCompressor() ]
}, rootReducer );

// noinspection JSUnusedGlobalSymbols
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
