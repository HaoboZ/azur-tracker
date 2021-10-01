import { configureStore } from '@reduxjs/toolkit';
import { mapValues } from 'lodash';
import { Store } from 'redux';
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
import storage from 'redux-persist/lib/storage';

import fleetRef from '../../data/fleetData';
import { rootReducer } from './reducers';
import { getTier } from './reducers/fleetReducer';

export type RootState = ReturnType<typeof rootReducer>;

const migrations: Record<string, ( state: any ) => RootState> = {
	6: ( state ) => ( {
		...state,
		ship: {
			...state.ship,
			ships: Object.fromEntries( Object.entries( state.ship.ships ).map( ( ship ) => {
				getTier( fleetRef[ ship[ 0 ] ], ( ship[ 1 ] as any ).equip );
				delete ship[ 1 ][ 'tier' ];
				return ship;
			} ) )
		}
	} ),
	7: ( state ) => ( {
		...state,
		main: {
			...state.main,
			researchLastTab: 0
		}
	} ),
	8: ( state ) => ( { ...state, fleet: state.ship } ),
	9: ( state ) => ( {
		...state, fleet: {
			...state.fleet,
			ships: mapValues( state.fleet.ships, ( ship ) => {
				if ( ship.lvl === 121 ) ship.lvl = 120;
				return ship;
			} )
		}
	} )
};

const persistedReducer = process.browser ? persistReducer<RootState>( {
	key            : 'root',
	version        : 9,
	storage,
	stateReconciler: autoMergeLevel2,
	migrate        : createMigrate( migrations as any, { debug: false } ),
	transforms     : [ createCompressor() ]
}, rootReducer ) : rootReducer;

export const store: Store<RootState> = configureStore( {
	reducer   : persistedReducer,
	devTools  : process.env.NODE_ENV === 'development',
	middleware: ( getDefaultMiddleware ) => getDefaultMiddleware( {
		serializableCheck: {
			ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ]
		}
	} )
} );

export const persistor = process.browser ? persistStore( store ) : undefined;

declare module 'react-redux' {
	// noinspection JSUnusedGlobalSymbols
	interface DefaultRootState extends RootState {
	}
}
