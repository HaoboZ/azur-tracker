const withPWA = require( 'next-pwa' );
const runtimeCaching = require( 'next-pwa/cache' );
const bundleAnalyzer = require( '@next/bundle-analyzer' );

const withBundleAnalyzer = bundleAnalyzer( {
	enabled: process.env.ANALYZE === 'true'
} );
module.exports = withBundleAnalyzer( withPWA( {
	pwa: {
		dest: 'public',
		runtimeCaching
	}
} ) );
