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
				<link rel="apple-touch-icon" href="icon-192x192.png"/>
				<link rel="apple-touch-icon" sizes="256x256" href="icon-256x256.png"/>
				<link rel="apple-touch-icon" sizes="384x384" href="icon-384x384.png"/>
				<link rel="apple-touch-icon" sizes="512x512" href="icon-512x512.png"/>
				
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
