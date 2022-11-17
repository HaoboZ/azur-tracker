import { Preferences } from '@capacitor/preferences';
import { configureStore } from '@reduxjs/toolkit';
import { mapValues } from 'lodash-es';
import { decompressFromUTF16 } from 'lz-string';
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

const migrations: Record<string, ( state ) => any> = {
	13: () => {
		const data = mapValues( JSON.parse( localStorage.getItem( 'persist:root' ) ),
			( val ) => JSON.parse( decompressFromUTF16( JSON.parse( val ) ) ) );
		localStorage.removeItem( 'persist:root' );
		return data;
	},
	14: ( state ) => {
		state.fleet.ships[ 'Neptune_(Neptunia)' ] = state.fleet.ships.HDN_Neptune;
		delete state.fleet.ships.HDN_Neptune;
		state.fleet.ships.Neptune = state.fleet.ships.HMS_Neptune;
		delete state.fleet.ships.HMS_Neptune;
		state.fleet.ships[ 'Kasumi_(Venus_Vacation)' ] = state.fleet.ships[ 'Kasumi_(DOA)' ];
		delete state.fleet.ships[ 'Kasumi_(DOA)' ];
		
		return {
			...state,
			fleet: {
				...state.fleet,
				ships: { ...state.fleet.ships }
			}
		};
	}
};

// noinspection JSUnusedGlobalSymbols
const persistedReducer = persistReducer<State>( {
	key            : 'root',
	version        : 14,
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
