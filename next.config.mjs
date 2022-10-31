import bundleAnalyzer from '@next/bundle-analyzer';
import nextPWA from 'next-pwa';

// noinspection JSUnusedGlobalSymbols
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	pageExtensions: [ 'page.js', 'page.jsx', 'page.ts', 'page.tsx' ],
	typescript    : { ignoreBuildErrors: true },
	headers       : async () => [ {
		// matching all API routes
		source : '/api/:path*',
		headers: [ { key: 'Access-Control-Allow-Origin', value: '*' } ]
	} ],
	async redirects() {
		return [ { source: '/', destination: '/event' } ];
	},
	experimental: {
		modularizeImports: {
			'@mui/icons-material': { transform: '@mui/icons-material/{{member}}' }
		}
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
