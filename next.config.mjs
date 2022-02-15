import bundleAnalyzer from '@next/bundle-analyzer';
import withPlugins from 'next-compose-plugins';
import withPWA from 'next-pwa';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	pageExtensions: [ 'page.js', 'page.jsx', 'page.ts', 'page.tsx' ],
	webpack( config, { webpack } ) {
		// noinspection JSUnresolvedFunction
		config.plugins.push( new webpack.IgnorePlugin( {
			resourceRegExp: /\.(test|spec)\.[jt]sx?$/
		} ) );
		return config;
	},
	images    : process.env.NEXT_PUBLIC_SERVER_URL ? {
		loader : 'imgix',
		domains: [ process.env.NEXT_PUBLIC_SERVER_URL ],
		path   : process.env.NEXT_PUBLIC_SERVER_URL
	} : undefined,
	typescript: { ignoreBuildErrors: true },
	headers   : async () => [ {
		// matching all API routes
		source : '/api/:path*',
		headers: [ { key: 'Access-Control-Allow-Origin', value: '*' } ]
	} ]
};

// noinspection JSUnusedGlobalSymbols
export default withPlugins( [
	bundleAnalyzer( { enabled: process.env.ANALYZE === 'true' } ),
	withPWA, {
		pwa: {
			disable: Boolean( process.env.NEXT_PUBLIC_SERVER_URL ) || process.env.NODE_ENV === 'development',
			dest   : 'public'
		}
	}
], nextConfig );
