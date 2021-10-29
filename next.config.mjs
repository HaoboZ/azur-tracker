import bundleAnalyzer from '@next/bundle-analyzer';
import withPWA from 'next-pwa';

const withBundleAnalyzer = bundleAnalyzer( { enabled: process.env.ANALYZE === 'true' } );
// noinspection JSUnusedGlobalSymbols
export default withBundleAnalyzer( withPWA( {
	pageExtensions: [ 'page.tsx', 'page.ts', 'page.jsx', 'page.js' ],
	webpack( config, { webpack } ) {
		config.plugins.push(
			new webpack.IgnorePlugin( {
				resourceRegExp: /\.(test|spec)\.[jt]sx?$/
			} )
		);
		return config;
	},
	pwa: {
		disable      : process.env.NODE_ENV === 'development',
		dest         : 'public',
		buildExcludes: [ /middleware-manifest.json$/ ]
	}
} ) );
