import { ServerStyleSheets } from '@material-ui/styles';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class _Document extends Document {
	static async getInitialProps( ctx ) {
		// Render app and page and get the context of the page with collected side effects.
		const sheets = new ServerStyleSheets();
		const originalRenderPage = ctx.renderPage;
		
		ctx.renderPage = () => originalRenderPage( {
			enhanceApp: ( App ) => ( props ) => sheets.collect( <App {...props}/> )
		} );
		
		const initialProps = await Document.getInitialProps( ctx );
		
		return {
			...initialProps,
			// Styles fragment is rendered after the app and page rendering finish.
			styles: [ ...React.Children.toArray( initialProps.styles ), sheets.getStyleElement() ]
		};
	}
	
	render() {
		// noinspection HtmlRequiredTitleElement
		return <Html lang='en'>
			<Head>
				<link rel='manifest' href='manifest.json'/>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
				<link rel="manifest" href="/site.webmanifest"/>
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#039be5"/>
				<meta name="msapplication-TileColor" content="#da532c"/>
				<meta name="theme-color" content="#ffffff"/>
				
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
				/>
				<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'/>
			</Head>
			<body>
			<Main/>
			<NextScript/>
			</body>
		</Html>;
	}
}
