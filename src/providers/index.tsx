'use client';
import { updateDBData } from '@/app/api/dbData';
import { compressToUTF16, decompressFromUTF16 } from 'lz-string';
import { SnackbarProvider } from 'notistack';
import type { ReactNode } from 'react';
import { useEffect, useMemo } from 'react';
import { Cookies } from 'react-cookie';
import { Provider as StoreProvider } from 'react-redux';
import { mapValues, pick, pickBy } from 'remeda';
import ComponentComposer, { component } from '../helpers/componentComposer';
import { debounce } from '../helpers/delay';
import { createStore } from '../store';
import { loadState, saveState } from '../store/persist';
import EventsProvider from './events';
import ModalProvider from './modal';
import SnackbarAction from './snackbar/action';
import ThemeRegistry from './theme';

export default function Providers({
	children,
	serverData,
}: {
	children: ReactNode;
	serverData: { main?: Record<string, string>; data?: Record<string, string> };
}) {
	const store = useMemo(() => {
		let state = loadState();
		if (state) {
			const { main, ...others } = state;
			state = mapValues(others, (value, key) => {
				if (!serverData.main?.[key]) return value;
				if ((main[key] ?? '') < serverData.main[key]) {
					main[key] = serverData.main[key];
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
		return createStore(state);
	}, []);

	useEffect(() => {
		return store.subscribe(
			debounce(async () => {
				const state = store.getState();
				await saveState(state);
				const cookies = new Cookies();
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
		);
	}, []);

	return (
		<ComponentComposer
			components={[
				// data
				component(StoreProvider, { store }),
				component(EventsProvider),
				// styling
				component(ThemeRegistry),
				// visual
				component(SnackbarProvider, { preventDuplicate: true, action: SnackbarAction }),
				component(ModalProvider),
			]}>
			{children}
		</ComponentComposer>
	);
}
