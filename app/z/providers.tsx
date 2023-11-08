'use client';
import ComponentComposer, { component } from '@/src/helpers/componentComposer';
import ModalProvider from '@/src/providers/modal';
import SnackbarAction from '@/src/providers/snackbar/action';
import SyncStoreProvider from '@/src/providers/syncStore';
import { SnackbarProvider } from 'notistack';
import type { ReactNode } from 'react';

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
				component(SyncStoreProvider, { serverData }),
				// components
				component(SnackbarProvider, { preventDuplicate: true, action: SnackbarAction }),
				component(ModalProvider),
			]}>
			{children}
		</ComponentComposer>
	);
}
