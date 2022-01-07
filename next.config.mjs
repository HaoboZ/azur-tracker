import bundleAnalyzer from '@next/bundle-analyzer';
import withPlugins from 'next-compose-plugins';
import withPWA from 'next-pwa';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	pageExtensions: [ 'page.js', 'page.jsx', 'page.ts', 'page.tsx' ],
	/**
	 * @param {import('webpack').webpack.Configuration} config
	 * @param {unknown} context
	 * @returns {import('webpack').webpack.Configuration}
	 */
	webpack( config, { webpack } ) {
		config.plugins.push( new webpack.IgnorePlugin( {
			resourceRegExp: /\.(test|spec)\.[jt]sx?$/
		} ) );
		return config;
	},
	images    : process.env.STATIC ? {
		loader : 'imgix',
		domains: [ 'https://azurlanetracker.vercel.app' ],
		path   : 'https://azurlanetracker.vercel.app'
	} : undefined,
	typescript: { ignoreBuildErrors: true }
};

// noinspection JSUnusedGlobalSymbols
export default withPlugins( [
	bundleAnalyzer( { enabled: process.env.ANALYZE === 'true' } ),
	withPWA, {
		pwa: {
			disable: Boolean( process.env.STATIC ) || process.env.NODE_ENV === 'development',
			dest   : 'public'
		}
	}
], nextConfig );
