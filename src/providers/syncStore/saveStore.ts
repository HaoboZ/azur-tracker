import { updateDBData } from '@/app/api/dbData';
import { compressToUTF16 } from 'lz-string';
import { mapValues, pick } from 'remeda';

export default async function saveStore(store) {
	const state = store.getState();
	const { main, ...others } = state;
	await updateDBData({
		main: pick(main, Object.keys(others)),
		...mapValues(others, (value) => compressToUTF16(JSON.stringify(value))),
	});
}
