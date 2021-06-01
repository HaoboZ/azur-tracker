import { mapValues } from 'lodash';
import { nanoid } from 'nanoid';
import { createStore, Store } from 'redux';
import { createMigrate, persistReducer, persistStore } from 'redux-persist';
import createCompressor from 'redux-persist-transform-compress';
import authMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import { isBrowser } from '../helpers';
import shipRef from '../reference/shipRef';
import { rootReducer } from './reducers';
import { getTier } from './reducers/shipReducer';

const migrations = {
	2: ( state: RootState ) => ( {
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
	3: ( state: RootState ) => ( {
		...state,
		main: {
			...state.main,
			newData: {}
		}
	} ),
	4: ( state: RootState ) => ( {
		...state,
		event: {
			...state.event,
			daily  : state.event.daily.map( ( item ) => ( { ...item, id: nanoid( 16 ) } ) ),
			farming: state.event.farming.map( ( item ) => ( { ...item, id: nanoid( 16 ) } ) )
		}
	} ),
	5: ( state: RootState ) => ( {
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
	6: ( state: RootState ) => ( {
		...state,
		ship: {
			...state.ship,
			ships: Object.fromEntries( Object.entries( state.ship.ships ).map( ( ship ) => {
				getTier( shipRef[ ship[ 0 ] ], ship[ 1 ].equip );
				delete ship[ 1 ][ 'tier' ];
				return ship;
			} ) )
		}
	} )
} as Record<string, ( state: RootState ) => RootState>;

const persistedReducer = persistReducer( {
	key            : 'root',
	version        : 6,
	storage,
	stateReconciler: authMergeLevel2,
	migrate        : createMigrate( migrations as any, { debug: false } ),
	transforms     : [ createCompressor() ]
}, rootReducer );

export type RootState = ReturnType<typeof rootReducer>;

export const store: Store<RootState> = createStore( persistedReducer );
export const persistor = isBrowser ? persistStore( store ) : undefined;

declare module 'react-redux' {
	// noinspection JSUnusedGlobalSymbols
	interface DefaultRootState extends RootState {
	}
}
