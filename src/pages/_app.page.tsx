import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../lib/store';
import Baseline from './baseline';
import './baseline/style.scss';

// noinspection JSUnusedGlobalSymbols
export default function _App( { Component, pageProps }: AppProps ) {
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
			<Baseline pageProps={pageProps}>
				<Component {...pageProps}/>
			</Baseline>
		</PersistGate>
	</StoreProvider>;
}
