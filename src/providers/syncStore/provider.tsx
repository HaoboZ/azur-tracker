'use client';
import { updateDBData } from '@/api/dbData';
import { Paper, Typography } from '@mui/material';
import { compressToUTF16, decompressFromUTF16 } from 'lz-string';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Cookies } from 'react-cookie';
import { Provider } from 'react-redux';
import { mapValues, pick, pickBy } from 'remeda';
import { debounce } from '../../helpers/delay';
import getMax from '../../helpers/getMax';
import { createStore } from '../../store';
import { loadState, saveState } from '../../store/persist';
import ConflictDialog from './conflictDialog';

const cookies = new Cookies();

export default function StoreProvider({
	children,
	authenticated,
	serverData,
}: {
	children: ReactNode;
	authenticated: boolean;
	serverData: { main?: Record<string, string>; data?: Record<string, string> };
}) {
	const [saved, setSaved] = useState(false);
	const [loaded, setLoaded] = useState(false);

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
				else if ((main[key] ?? '') < serverTimestamp && serverData.data?.[key]) {
					setLoaded(true);
					main[key] = serverTimestamp;
					const cookies = new Cookies();
					cookies.set(`timestamp.${key}`, serverTimestamp);
					return JSON.parse(decompressFromUTF16(serverData.data[key]));
				}
				return value;
			});
			state.main = main;
			setTimeout(() => setLoaded(false), 2000);
			saveState(state).then();
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
					setSaved(true);
					setTimeout(() => setSaved(false), 2000);
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
					try {
						if (authenticated)
							await updateDBData({ main: pick(main, Object.keys(others)), ...toSave });
					} catch {
						setSaved(false);
					}
				}, 500),
			),
		[],
	);

	return (
		<Provider store={store}>
			{children}
			{problems && <ConflictDialog problems={problems} />}
			{(loaded || saved) && (
				<Paper
					sx={{
						px: 1,
						opacity: 0.5,
						position: 'fixed',
						zIndex: 'tooltip',
						bottom: {
							xs: 'calc(min(env(safe-area-inset-bottom), 16px) + 70px)',
							sm: 'calc(min(env(safe-area-inset-bottom), 16px) + 10px)',
						},
						right: 'calc(env(safe-area-inset-right) + 10px)',
					}}>
					<Typography>{loaded ? 'Loaded' : 'Saved'}</Typography>
				</Paper>
			)}
		</Provider>
	);
}
