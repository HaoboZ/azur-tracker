import { decompressFromUTF16 } from 'lz-string';
import { mapValues } from 'remeda';

const KEY = 'azurlanetrackerPersist';

export function loadState() {
	try {
		const oldItem = localStorage.getItem('CapacitorStorage.persist:root');
		if (oldItem) {
			localStorage.removeItem('CapacitorStorage.persist:root');
			localStorage.setItem(
				KEY,
				JSON.stringify(
					mapValues(JSON.parse(oldItem), (val: string) =>
						JSON.parse(decompressFromUTF16(JSON.parse(val))),
					),
				),
			);
		}

		const serializedState = localStorage.getItem(KEY);
		if (!serializedState) return undefined;
		return JSON.parse(serializedState);
	} catch (e) {
		return undefined;
	}
}

export async function saveState(state: any) {
	localStorage.setItem(KEY, JSON.stringify(state));
}
