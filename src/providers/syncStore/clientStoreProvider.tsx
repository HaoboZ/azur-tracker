'use client';
import { updateDBData } from '@/app/api/dbData';
import { compressToUTF16, decompressFromUTF16 } from 'lz-string';
import type { ReactNode } from 'react';
import { useEffect, useMemo } from 'react';
import { Cookies } from 'react-cookie';
import { Provider } from 'react-redux';
import { mapValues, pick, pickBy } from 'remeda';
import { debounce } from '../../helpers/delay';
import getMax from '../../helpers/getMax';
import { createStore } from '../../store';
import { loadState, saveState } from '../../store/persist';
import ConflictDialog from './conflictDialog';

const cookies = new Cookies();

export default function ClientStoreProvider({
	children,
	serverData,
}: {
	children: ReactNode;
	serverData: { main?: Record<string, string>; data?: Record<string, string> };
}) {
	const [store, problems] = useMemo(() => {
		let state = loadState();
		let problems = null;
		if (state) {
			const { main, ...others } = state;
			state = mapValues(others, (value, key) => {
				const serverTimestamp = serverData.main?.[key];
				if (!serverTimestamp) return value;
				if (main[key] > serverTimestamp)
					problems = {
						local: getMax(main[key], problems?.local),
						server: getMax(serverTimestamp, problems?.server),
					};
				if ((main[key] ?? '') < serverTimestamp && serverData.data?.[key]) {
					main[key] = serverTimestamp;
					cookies.set(`timestamp.${key}`, serverTimestamp);
					return JSON.parse(decompressFromUTF16(serverData.data[key]));
				}
				return value;
			});
			state.main = main;
		} else if (serverData.main) {
			state = {
				main: serverData.main,
				...mapValues(serverData.data ?? {}, (value) => JSON.parse(decompressFromUTF16(value))),
			};
		}
		return [createStore(state), problems];
	}, []);

	useEffect(
		() =>
			store.subscribe(
				debounce(async () => {
					const state = store.getState();
					await saveState(state);
					const { main, ...others } = state;
					const toSave = mapValues(
						pickBy(main, (value, key) => {
							if (!(key in others)) return false;
							if (cookies.get(`timestamp.${key}`) === value) return false;
							cookies.set(`timestamp.${key}`, value);
							return true;
						}),
						(_, key) => compressToUTF16(JSON.stringify(others[key])),
					);
					await updateDBData({ main: pick(main, Object.keys(others)), ...toSave });
				}, 500),
			),
		[],
	);

	return (
		<Provider store={store}>
			{children}
			{problems && <ConflictDialog problems={problems} />}
		</Provider>
	);
}
