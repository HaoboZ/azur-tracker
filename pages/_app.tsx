import { Provider as AuthProvider } from 'next-auth/client';
import Head from 'next/head';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Baseline from '../fragments/baseline';
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
						content='width=device-width,
							minimum-scale=1, maximum-scale=1, initial-scale=1,
							user-scalable=no, viewport-fit=cover'
					/>
					
					<link rel='manifest' href='site.webmanifest'/>
					
					<link rel='apple-touch-icon' href='icons/apple-icon-180.png'/>
					<meta name='apple-mobile-web-app-capable' content='yes'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-2048-2732.jpg' media='(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-2732-2048.jpg' media='(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-1668-2388.jpg' media='(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-2388-1668.jpg' media='(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-1536-2048.jpg' media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-2048-1536.jpg' media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-1668-2224.jpg' media='(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-2224-1668.jpg' media='(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-1620-2160.jpg' media='(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-2160-1620.jpg' media='(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-1284-2778.jpg' media='(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-2778-1284.jpg' media='(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-1170-2532.jpg' media='(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-2532-1170.jpg' media='(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-1125-2436.jpg' media='(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-2436-1125.jpg' media='(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-1242-2688.jpg' media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-2688-1242.jpg' media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-828-1792.jpg' media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-1792-828.jpg' media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-1242-2208.jpg' media='(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-2208-1242.jpg' media='(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-750-1334.jpg' media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-1334-750.jpg' media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-640-1136.jpg' media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'/>
					<link rel='apple-touch-startup-image' href='icons/apple-splash-1136-640.jpg' media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'/>
					
					<link rel='icon' type='image/png' sizes='32x32' href='icons/favicon-32x32.png'/>
					<link rel='icon' type='image/png' sizes='16x16' href='icons/favicon-16x16.png'/>
					<link rel='mask-icon' href='icons/safari-pinned-tab.svg' color='#039be5'/>
					<meta name='msapplication-TileColor' content='#2d89ef'/>
					<meta name='theme-color' content='#039be5'/>
					
					<link
						rel='stylesheet'
						href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
					/>
					<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'/>
				</Head>
				<Baseline>
					<Component {...pageProps}/>
				</Baseline>
			</AuthProvider>
		</PersistGate>
	</StoreProvider>;
}
