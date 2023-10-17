'use client';
// import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { SnackbarProvider } from 'notistack';
import type { ReactNode } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import ComponentComposer, { component } from '../helpers/componentComposer';
import { store } from '../store';
import AuthProvider from './auth';
import EventsProvider from './events';
import ModalProvider from './modal';
import SnackbarAction from './snackbar/action';
import ThemeRegistry from './theme';

// if ( typeof window !== 'undefined' ) {
// 	defineCustomElements( window ).then();
// }

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<ComponentComposer
			components={[
				// data
				component(StoreProvider, { store }),
				component(EventsProvider),
				// styling
				component(ThemeRegistry),
				// visual
				component(SnackbarProvider, {
					preventDuplicate: true,
					action: SnackbarAction,
				}),
				component(AuthProvider),
				component(ModalProvider),
			]}>
			{children}
		</ComponentComposer>
	);
}
