import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import type { PackageJson } from 'type-fest';
import _packageJson from '../../package.json';

const packageJson = _packageJson as PackageJson;

// noinspection JSUnusedGlobalSymbols
export default class _Document extends Document<{ emotionStyleTags: JSX.Element[] }> {
	
	static async getInitialProps( ctx ) {
		const originalRenderPage = ctx.renderPage;
		
		const emotionCache = createCache( { key: 'css', prepend: true } );
		const { extractCriticalToChunks } = createEmotionServer( emotionCache );
		
		ctx.renderPage = () => originalRenderPage( {
			enhanceApp: ( App ) => ( props ) => (
				<App emotionCache={emotionCache} {...props}/>
			)
		} );
		
		const initialProps = await Document.getInitialProps( ctx );
		
		const emotionStyles = extractCriticalToChunks( initialProps.html );
		const emotionStyleTags = emotionStyles.styles.map( ( style ) => (
			<style
				key={style.key}
				dangerouslySetInnerHTML={{ __html: style.css }}
				data-emotion={`${style.key} ${style.ids.join( ' ' )}`}
			/>
		) );
		
		return {
			...initialProps,
			emotionStyleTags
		};
	}
	
	render() {
		return (
			<Html lang='en'>
				<Head>
					<meta charSet='utf-8'/>
					{/*seo*/}
					{'description' in packageJson && <meta name='description' content={packageJson.description}/>}
					{'keywords' in packageJson && <meta name='keywords' content={packageJson.keywords.join( ', ' )}/>}
					{'author' in packageJson && <meta name='author' content={packageJson.author as string}/>}
					{/*pwa*/}
					<meta name='mobile-web-app-capable' content='yes'/>
					<link rel='manifest' href='/app.webmanifest'/>
					<link rel='shortcut icon' href='/favicon.ico'/>
					<link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png'/>
					<link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png'/>
					{/*ios*/}
					<meta name='apple-mobile-web-app-capable' content='yes'/>
					<link rel='apple-touch-icon' href='/icons/apple-touch-icon.png'/>
					<meta name='apple-mobile-web-app-status-bar-style' content='black-translucent'/>
					{/*safari*/}
					<link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#039be5'/>
					{/*microsoft*/}
					<meta name='msapplication-config' content='/browserconfig.xml'/>
					<meta name='msapplication-TileColor' content='#2d89ef'/>
					{/*font*/}
					<link
						rel='stylesheet'
						href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
					/>
					<link
						rel='stylesheet'
						href='https://fonts.googleapis.com/icon?family=Material+Icons'
					/>
					{this.props.emotionStyleTags}
				</Head>
				<body>
					<Main/>
					<NextScript/>
				</body>
			</Html>
		);
	}
	
}
