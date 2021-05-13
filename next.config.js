const withPWA = require( 'next-pwa' );
const runtimeCaching = require( 'next-pwa/cache' );
const bundleAnalyzer = require( '@next/bundle-analyzer' );

const withBundleAnalyzer = bundleAnalyzer( {
	enabled: process.env.ANALYZE === 'true'
} );
module.exports = withBundleAnalyzer( withPWA( {
	pwa   : {
		disable: process.env.NODE_ENV === 'development',
		dest   : 'public',
		runtimeCaching
	},
	future: {
		webpack5: process.env.NODE_ENV !== 'development'
	}
} ) );
