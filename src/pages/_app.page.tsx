import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AppProps } from 'next/app';
import Head from 'next/head';
import SplashProvider, { CompleteSplash } from '../lib/providers/splash';
import Baseline from './baseline';
import './baseline/style.scss';

if ( typeof window !== 'undefined' ) {
	defineCustomElements( window );
}

// noinspection JSUnusedGlobalSymbols
export default function _App( { Component, pageProps }: AppProps ) {
	return (
		<SplashProvider>
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
				<CompleteSplash/>
				<Component {...pageProps}/>
			</Baseline>
		</SplashProvider>
	);
}
