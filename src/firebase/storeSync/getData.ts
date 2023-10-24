import { getAuth } from 'firebase/auth';
import { get, getDatabase, ref } from 'firebase/database';
import { decompressFromUTF16 } from 'lz-string';
import { equals } from 'rambdax';
import { store } from '../../store';
import { importBackup, mainActions } from '../../store/reducers/mainReducer';
import firebaseClientApp from '../client';

const auth = getAuth(firebaseClientApp);
const db = getDatabase(firebaseClientApp);

export default async function getData(keys: string[]) {
	if (!auth.currentUser?.uid) return;

	const dataRef = ref(db, `users/${auth.currentUser.uid}`);
	const snapshot = await get(dataRef);
	if (!snapshot.exists()) return;

	const data = snapshot.val();
	const state = store.getState();
	keys.forEach((key) => {
		const newData = JSON.parse(decompressFromUTF16(data[key]));
		if (!equals(state[key], newData)) {
			store.dispatch(importBackup(key, newData));
		}
	});
	store.dispatch(mainActions.setTimestamp(data.timestamp));
	store.dispatch(mainActions.setLastTimestamp(data.timestamp));
}
