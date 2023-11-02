'use client';
import { SnackbarProvider } from 'notistack';
import type { ReactNode } from 'react';
import ComponentComposer, { component } from '../helpers/componentComposer';
import EventsProvider from './events';
import ModalProvider from './modal';
import SnackbarAction from './snackbar/action';
import SyncStoreProvider from './syncStore';
import ThemeRegistry from './theme';

export default function Providers({
	children,
	serverData,
}: {
	children: ReactNode;
	serverData: { main?: Record<string, string>; data?: Record<string, string> };
}) {
	return (
		<ComponentComposer
			components={[
				// data
				component(EventsProvider),
				component(ThemeRegistry),
				component(SyncStoreProvider, { serverData }),
				// visual
				component(SnackbarProvider, { preventDuplicate: true, action: SnackbarAction }),
				component(ModalProvider),
			]}>
			{children}
		</ComponentComposer>
	);
}
