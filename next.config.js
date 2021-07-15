const bundleAnalyzer = require( '@next/bundle-analyzer' );
const withPWA = require( 'next-pwa' );
const runtimeCaching = require( 'next-pwa/cache' );

const withBundleAnalyzer = bundleAnalyzer( { enabled: process.env.ANALYZE === 'true' } );
// noinspection JSUnusedGlobalSymbols
module.exports = withBundleAnalyzer( withPWA( {
	webpack( config, { webpack } ) {
		config.plugins.push( new webpack.IgnorePlugin( {
			resourceRegExp: /\.(test|spec)\.[jt]sx?$/
		} ) );
		return config;
	},
	pwa: {
		disable: process.env.NODE_ENV === 'development',
		dest   : 'public',
		runtimeCaching
	}
} ) );
