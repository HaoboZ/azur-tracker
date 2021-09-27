import { configureStore } from '@reduxjs/toolkit';
import { mapValues } from 'lodash';
import { nanoid } from 'nanoid';
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
	2: ( state ) => ( {
		...state,
		ship: {
			...state.ship,
			ships: mapValues( state.ship.ships, ( ship ) => {
				if ( ship?.equip ) {
					ship.equip = ship.equip?.map( ( val ) => {
						if ( val.length > 1 )
							val[ 1 ] = +val[ 1 ] as 0 | 1;
						return val;
					} );
				}
				return ship;
			} )
		}
	} ),
	3: ( state ) => ( {
		...state,
		main: {
			...state.main,
			newData: {}
		}
	} ),
	4: ( state ) => ( {
		...state,
		event: {
			...state.event,
			daily  : state.event.daily.map( ( item ) => ( { ...item, id: nanoid() } ) ),
			farming: state.event.farming.map( ( item ) => ( { ...item, id: nanoid() } ) )
		}
	} ),
	5: ( state ) => ( {
		...state,
		ship: {
			...state.ship,
			ships: mapValues( state.ship.ships, ( ship ) => {
				ship.equip?.forEach( ( equip ) => {
					switch ( equip[ 0 ] % 10 ) {
					case 1:
						equip[ 0 ] -= 1;
						break;
					case 2:
						equip[ 0 ] += 18;
						break;
					case 3:
						equip[ 0 ] += 37;
						break;
					}
				} );
				return ship;
			} )
		}
	} ),
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
	8: ( state ) => ( { ...state, fleet: state.ship } )
};

const persistedReducer = process.browser ? persistReducer<RootState>( {
	key            : 'root',
	version        : 8,
	storage,
	stateReconciler: autoMergeLevel2,
	migrate        : createMigrate( migrations as any, { debug: false } ),
	transforms     : [ createCompressor() ]
}, rootReducer ) : rootReducer;

// noinspection JSUnusedGlobalSymbols
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
