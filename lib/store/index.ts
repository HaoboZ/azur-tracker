import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { createStore } from 'redux';
import { createMigrate, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './reducers';

const migrations = {
	1: ( state: RootState ) => ( {
		...state,
		ship: {
			...state.ship,
			filter: {
				levelMax: true,
				equipMax: true,
				level0:   true
			}
		}
	} ),
	2: ( state: RootState ) => ( {
		...state,
		ship: {
			...state.ship,
			ships: Object.keys( state.ship.ships ).reduce( ( ships, name ) => {
				const ship = state.ship.ships[ name ];
				if ( ship?.equip )
					ship.equip = ship.equip.map( ( val ) => {
						if ( val.length > 1 )
							val[ 1 ] = +val[ 1 ] as any;
						return val;
					} );
				ships[ name ] = ship;
				return ships;
			}, {} )
		}
	} )
} as Record<string | number, ( state: RootState ) => RootState>;

const persistedReducer = persistReducer( {
	key:     'root',
	version: 2,
	storage,
	migrate: createMigrate( migrations as any, { debug: false } )
}, rootReducer );

const store = createStore( persistedReducer );
export default store;
export const persistor = persistStore( store );

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
