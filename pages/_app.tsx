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
					<meta charSet='utf-8'/>
					<meta
						name='viewport'
						content='minimum-scale=1, initial-scale=1, width=device-width'
					/>
				</Head>
				<Baseline>
					<Component {...pageProps}/>
				</Baseline>
			</AuthProvider>
		</PersistGate>
	</StoreProvider>;
}
