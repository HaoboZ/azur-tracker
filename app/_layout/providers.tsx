import ComponentComposer, { component } from '@/src/helpers/componentComposer';
import EventsProvider from '@/src/providers/events';
import ModalProvider from '@/src/providers/modal';
import ClientSnackbarProvider from '@/src/providers/snackbar';
import SyncStoreProvider from '@/src/providers/syncStore';
import ThemeRegistry from '@/src/providers/theme';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import Loading from '../loading';
import Navigation from './navigation';

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<ComponentComposer
			components={[
				component(EventsProvider),
				component(ThemeRegistry),
				component(Navigation),
				component(Suspense, { fallback: <Loading /> }),
				component(SyncStoreProvider),
				component(ClientSnackbarProvider),
				component(ModalProvider),
			]}>
			{children}
		</ComponentComposer>
	);
}
