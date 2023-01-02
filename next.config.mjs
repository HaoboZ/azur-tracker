import bundleAnalyzer from '@next/bundle-analyzer';
import nextPWA from 'next-pwa';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	typescript: { ignoreBuildErrors: true },
	headers   : async () => [ {
		// matching all API routes
		source : '/api/:path*',
		headers: [ { key: 'Access-Control-Allow-Origin', value: '*' } ]
	} ],
	async redirects() {
		return [ { source: '/', destination: '/event', permanent: false } ];
	},
	modularizeImports: {
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
		fontLoaders: [
			{ loader: '@next/font/google', options: { subsets: [ 'latin' ] } }
		]
	}
};

const plugins = [
	bundleAnalyzer( { enabled: process.env.ANALYZE === 'true' } ),
	nextPWA( {
		disable: !process.env.NEXT_PUBLIC_VERCEL_ENV,
		dest   : 'public'
	} )
];

// noinspection JSUnusedGlobalSymbols
export default plugins.reduceRight( ( acc, plugin ) => plugin( acc ), nextConfig );
