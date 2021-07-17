import Head from 'next/head';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Baseline from '../fragments/baseline';
import '../fragments/baseline/style.scss';
import { Icons } from '../lib/icons';
import { persistor, store } from '../lib/store';

// noinspection JSUnusedGlobalSymbols
export default function _App( { Component, pageProps } ) {
	return <StoreProvider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<Head>
				<title>Azur Lane Tracker</title>
				<meta
					name='viewport'
					content='width=device-width,
						minimum-scale=1, maximum-scale=1, initial-scale=1,
						user-scalable=no, viewport-fit=cover'
				/>
			</Head>
			<Icons/>
			<Baseline pageProps={pageProps}>
				<Component {...pageProps}/>
			</Baseline>
		</PersistGate>
	</StoreProvider>;
}
