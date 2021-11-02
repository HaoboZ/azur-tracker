import bundleAnalyzer from '@next/bundle-analyzer';
import withPlugins from 'next-compose-plugins';
import withPWA from 'next-pwa';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	pageExtensions: [ 'page.tsx', 'page.ts', 'page.jsx', 'page.js' ],
	webpack( config, { webpack } ) {
		config.optimization.minimize = false;
		config.plugins.push(
			new webpack.IgnorePlugin( {
				resourceRegExp: /\.(test|spec)\.[jt]sx?$/
			} )
		);
		return config;
	}
};

// noinspection JSUnusedGlobalSymbols
export default withPlugins( [
	bundleAnalyzer( { enabled: process.env.ANALYZE === 'true' } ),
	withPWA, {
		pwa: {
			disable      : process.env.NODE_ENV === 'development',
			dest         : 'public',
			buildExcludes: [ /middleware-manifest.json$/ ]
		}
	}
], nextConfig );
