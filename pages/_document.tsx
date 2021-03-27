import { ServerStyleSheets } from '@material-ui/styles';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
	static async getInitialProps( ctx ) {
		// Render app and page and get the context of the page with collected side effects.
		const sheets = new ServerStyleSheets();
		const originalRenderPage = ctx.renderPage;
		
		ctx.renderPage = () =>
			originalRenderPage( {
				enhanceApp: ( App ) =>
					            ( props ) => sheets.collect( <App { ...props }/> )
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
				<script src="https://accounts.google.com/gsi/client" async defer/>
				
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
				/>
				<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'/>
			</Head>
			<body>
			<div
				id='g_id_onload'
				data-client_id={ process.env.GOOGLE_ID }
				data-login_uri={ process.env.LOGIN_URI }
			/>
			<Main/>
			<NextScript/>
			</body>
		</Html>;
	}
}
