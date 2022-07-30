import type { EmotionCache } from '@emotion/cache';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import DataProvider from '../providers/data';
import Baseline from './baseline';
import './baseline/style.scss';

if ( typeof window !== 'undefined' ) {
	defineCustomElements( window ).then();
}

// noinspection JSUnusedGlobalSymbols
export default function _App( { Component, pageProps, emotionCache }: {
	emotionCache: EmotionCache
} & AppProps ) {
	return (
		<DataProvider data={pageProps}>
			<Head>
				<title>Azur Lane Tracker</title>
				<meta
					name='viewport'
					content='width=device-width,
						minimum-scale=1, maximum-scale=1, initial-scale=1,
						user-scalable=no, viewport-fit=cover'
				/>
			</Head>
			<Baseline emotionCache={emotionCache}>
				<Component {...pageProps}/>
			</Baseline>
		</DataProvider>
	);
}
