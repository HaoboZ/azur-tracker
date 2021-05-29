const withPWA = require( 'next-pwa' );
const runtimeCaching = require( 'next-pwa/cache' );
const bundleAnalyzer = require( '@next/bundle-analyzer' );

const withBundleAnalyzer = bundleAnalyzer( { enabled: process.env.ANALYZE === 'true' } );
module.exports = withBundleAnalyzer( withPWA( {
	webpack( config, { webpack } ) {
		config.plugins.push( new webpack.IgnorePlugin( {
			resourceRegExp: /\.(test|spec)\.[jt]sx?$/
		} ) );
		config.plugins.push( new webpack.IgnorePlugin( {
			resourceRegExp: /^\.\/locale$/,
			contextRegExp : /moment$/
		} ) );
		return config;
	},
	pwa   : {
		disable: process.env.NODE_ENV === 'development',
		dest   : 'public',
		runtimeCaching
	},
	future: { webpack5: process.env.NODE_ENV !== 'development' }
} ) );
