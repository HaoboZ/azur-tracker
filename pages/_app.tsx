import { Provider as AuthProvider } from 'next-auth/client';
import Head from 'next/head';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Baseline from '../components/baseline';
import { persistor, store } from '../lib/store';

export default function _App( { Component, pageProps } ) {
	return <StoreProvider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<AuthProvider session={pageProps.session}>
				<Head>
					<title>Azur Lane Tracker</title>
				</Head>
				<Baseline>
					<Component {...pageProps}/>
				</Baseline>
			</AuthProvider>
		</PersistGate>
	</StoreProvider>;
}
