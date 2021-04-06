import _ from 'lodash';
import { createStore, Store } from 'redux';
import { createMigrate, persistReducer, persistStore } from 'redux-persist';
import createCompressor from 'redux-persist-transform-compress';
import authMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import { isBrowser } from '../helpers';
import { rootReducer } from './reducers';

const migrations = {
	2: ( state: RootState ) => ( {
		...state,
		ship: {
			...state.ship,
			ships: _.mapValues( state.ship.ships, ( ship ) => {
				if ( ship?.equip )
					ship.equip = ship.equip.map( ( val ) => {
						if ( val.length > 1 )
							val[ 1 ] = +val[ 1 ] as any;
						return val;
					} );
				return ship;
			} )
		}
	} )
} as Record<string, ( state: RootState ) => RootState>;

const persistedReducer = persistReducer( {
	key:             'root',
	version:         2,
	storage,
	stateReconciler: authMergeLevel2,
	migrate:         createMigrate( migrations as any, { debug: false } ),
	transforms:      [ createCompressor() ]
}, rootReducer );

export type RootState = ReturnType<typeof rootReducer>;

export const store: Store<RootState> = createStore( persistedReducer );
export const persistor = isBrowser ? persistStore( store ) : undefined;

declare module 'react-redux' {
	interface DefaultRootState extends RootState {
	}
}

