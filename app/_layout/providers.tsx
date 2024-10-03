import ComponentComposer, { component } from '@/src/helpers/componentComposer';
import EventsProvider from '@/src/providers/events';
import ModalProvider from '@/src/providers/modal';
import ClientSnackbarProvider from '@/src/providers/snackbar';
import SyncStoreProvider from '@/src/providers/syncStore';
import ThemeProvider from '@/src/providers/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import Loading from '../loading';
import Navigation from './navigation';

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<ComponentComposer
			components={[
				// data
				component(EventsProvider),
				// theme
				component(AppRouterCacheProvider),
				component(ThemeProvider),
				// loading
				component(Suspense, { fallback: <Loading /> }),
				component(SyncStoreProvider),
				// components
				component(Navigation),
				component(ClientSnackbarProvider),
				component(ModalProvider),
			]}>
			{children}
		</ComponentComposer>
	);
}
