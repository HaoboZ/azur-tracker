import { Provider as AuthProvider } from 'next-auth/client';
import Head from 'next/head';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Baseline from '../fragments/baseline';
import { Icons } from '../lib/icons';
import { persistor, store } from '../lib/store';

// noinspection JSUnusedGlobalSymbols
export default function _App( { Component, pageProps } ) {
	return <StoreProvider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<AuthProvider session={pageProps.session}>
				<Head>
					<meta charSet='utf-8'/>
					<title>Azur Lane Tracker</title>
					<meta
						name='viewport'
						content='width=device-width,
							minimum-scale=1, maximum-scale=1, initial-scale=1,
							user-scalable=no, viewport-fit=cover'
					/>
					
					<link rel='manifest' href='/app.webmanifest'/>
					<meta name='msapplication-config' content='/browserconfig.xml'/>
					
					<link rel='apple-touch-icon' href='/icons/apple-icon-180.png'/>
					<meta name='apple-mobile-web-app-capable' content='yes'/>
					<meta name='apple-mobile-web-app-status-bar-style' content='black-translucent'/>
					
					<link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png'/>
					<link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png'/>
					<link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#039be5'/>
					<meta name='msapplication-TileColor' content='#2d89ef'/>
					<meta name='theme-color' content='#039be5'/>
					
					<link
						rel='stylesheet'
						href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
					/>
					<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'/>
				</Head>
				<Icons/>
				<Baseline>
					<Component {...pageProps}/>
				</Baseline>
			</AuthProvider>
		</PersistGate>
	</StoreProvider>;
}