const nextPWA = require( '@ducanh2912/next-pwa' ).default;
const bundleAnalyzer = require( '@next/bundle-analyzer' );

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	typescript       : { ignoreBuildErrors: true },
	headers          : async () => [ {
		// matching all API routes
		source : '/api/:path*',
		headers: [ { key: 'Access-Control-Allow-Origin', value: '*' } ]
	} ],
	modularizeImports: {
		'lodash'             : { transform: 'lodash/{{member}}' },
		'@mui/icons-material': { transform: '@mui/icons-material/{{member}}' }
	},
	images           : {
		remotePatterns: [ {
			protocol: 'https',
			hostname: 'azurlane.netojuu.com',
			port    : '',
			pathname: '/images/**'
		} ]
	},
	experimental     : {
		appDir     : true,
		fontLoaders: [ {
			loader: 'next/font/google', options: { subsets: [ 'latin' ] }
		} ]
	}
};

const plugins = [
	bundleAnalyzer( { enabled: process.env.ANALYZE === 'true' } ),
	nextPWA( {
		disable: process.env.NODE_ENV === 'development',
		dest   : 'public'
	} )
];

// noinspection JSUnusedGlobalSymbols
module.exports = plugins.reduceRight( ( acc, plugin ) => plugin( acc ), nextConfig );
