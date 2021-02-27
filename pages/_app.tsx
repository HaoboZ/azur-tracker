import Head from 'next/head';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Baseline from '../components/baseline';
import store, { persistor } from '../lib/store';

export default function MyApp( { Component, pageProps } ) {
	return <Provider store={ store }>
		<PersistGate loading={ null } persistor={ persistor }>
			<Head>
				<title>Azur Lane Tracker</title>
				<meta charSet='utf-8'/>
				<meta name='viewport'
				      content='minimum-scale=1, initial-scale=1, width=device-width'/>
			</Head>
			<Baseline>
				<Component { ...pageProps }/>
			</Baseline>
		</PersistGate>
	</Provider>;
}
