import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './reducers';

const persistedReducer = persistReducer( {
	key: 'root',
	storage
}, rootReducer );

const store = createStore( persistedReducer );
export default store;
export const persistor = persistStore( store );

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
