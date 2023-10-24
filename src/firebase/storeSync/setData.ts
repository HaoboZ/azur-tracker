import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { compressToUTF16 } from 'lz-string';
import { filterObject, map } from 'rambdax';
import { store } from '../../store';
import { mainActions } from '../../store/reducers/mainReducer';
import firebaseClientApp from '../client';

const auth = getAuth(firebaseClientApp);
const db = getDatabase(firebaseClientApp);

export default async function setData(keys: string[]) {
	if (!auth.currentUser?.uid) return;

	const state = store.getState();
	const data = map(
		(val) => compressToUTF16(JSON.stringify(val)),
		filterObject((_, key) => keys.includes(key), state),
	);
	const dataRef = ref(db, `users/${auth.currentUser.uid}`);
	await set(dataRef, { ...data, timestamp: state.main.timestamp });

	store.dispatch(mainActions.setLastTimestamp(state.main.timestamp));
}
