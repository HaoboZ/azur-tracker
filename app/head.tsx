import type { PackageJson } from 'type-fest';
import _packageJson from '../package.json';

const packageJson = _packageJson as PackageJson;

export default function Head() {
	return (
		// eslint-disable-next-line @next/next/no-head-element
		<head>
			<title>Azur Lane Tracker</title>
			<meta name='viewport' content='width=device-width, initial-scale=1, viewport-fit=cover'/>
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
		</head>
	);
}
