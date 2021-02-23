import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import TitleBar from '../components/titleBar';
import store, { persistor } from '../lib/store';
import '../styles/globals.css';

function MyApp( { Component, pageProps } ) {
	return <Provider store={ store }>
		<PersistGate loading={ null } persistor={ persistor }>
			<Head>
				<title>Azur Lane Tracker</title>
				<meta charSet='utf-8'/>
				<meta name='viewport' content='initial-scale=1.0, width=device-width'/>
			</Head>
			<TitleBar/>
			<Component { ...pageProps }/>
		</PersistGate>
	</Provider>;
}

export default MyApp;
