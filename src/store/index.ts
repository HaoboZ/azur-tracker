import { Preferences } from '@capacitor/preferences';
import { configureStore } from '@reduxjs/toolkit';
import { mapValues, omit } from 'lodash-es';
import { decompressFromUTF16 } from 'lz-string';
import type { PersistedState } from 'redux-persist';
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
export type RootState = State & PersistedState;

const migrations: Record<string, ( state: RootState ) => RootState> = {
	10: ( state ) => ( {
		...state,
		// @ts-ignore
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
		// @ts-ignore
		main: {
			...omit( state.main, 'autoBackup' ),
			// @ts-ignore
			unViewed: state.main.newData,
			// @ts-ignore
			autoSync     : state.main.autoBackup,
			timestamp    : new Date( 0 ).toISOString(),
			lastTimestamp: null
		},
		// @ts-ignore
		event: omit( state.event, 'timestamp' ),
		// @ts-ignore
		research: omit( state.research, 'timestamp' ),
		// @ts-ignore
		fleet: omit( state.fleet, 'timestamp' )
	} ),
	// @ts-ignore
	13: () => {
		const data = mapValues( JSON.parse( localStorage.getItem( 'persist:root' ) ),
			( val ) => JSON.parse( decompressFromUTF16( JSON.parse( val ) ) ) );
		localStorage.removeItem( 'persist:root' );
		return data;
	}
};

// noinspection JSUnusedGlobalSymbols
const persistedReducer = persistReducer<State>( {
	key            : 'root',
	version        : 13,
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

export type AppDispatch = typeof store.dispatch;
