import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

// noinspection JSUnusedGlobalSymbols
export default class _Document extends Document {
	static async getInitialProps( ctx ) {
		const cache = createCache( { key: 'css', prepend: true } );
		const { extractCriticalToChunks } = createEmotionServer( cache );
		
		const originalRenderPage = ctx.renderPage;
		ctx.renderPage = () => originalRenderPage( {
			enhanceApp: ( App ) => ( props ) => <App cache={cache} {...props}/>
		} );
		
		const initialProps = await Document.getInitialProps( ctx );
		
		const emotionStyles = extractCriticalToChunks( initialProps.html );
		const emotionStyleTags = emotionStyles.styles.map( ( style ) => <style
			data-emotion={`${style.key} ${style.ids.join( ' ' )}`}
			key={style.key}
			dangerouslySetInnerHTML={{ __html: style.css }}
		/> );
		
		return {
			...initialProps,
			styles: [ ...React.Children.toArray( initialProps.styles ), ...emotionStyleTags ]
		};
	}
	
	render() {
		// noinspection HtmlRequiredTitleElement
		return <Html lang='en'>
			<Head>
				<meta charSet='utf-8'/>
				
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
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/icon?family=Material+Icons'
				/>
			</Head>
			<body>
				<Main/>
				<NextScript/>
			</body>
		</Html>;
	}
}