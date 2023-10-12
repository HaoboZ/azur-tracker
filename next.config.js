// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextPWA = require('@ducanh2912/next-pwa').default;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bundleAnalyzer = require('@next/bundle-analyzer');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	headers: async () => [
		{
			// matching all API routes
			source: '/api/:path*',
			headers: [
				{
					key: 'Access-Control-Allow-Origin',
					value: '*',
				},
			],
		},
	],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'azurlane.netojuu.com',
				port: '',
				pathname: '/images/**',
			},
		],
	},
};

const plugins = [
	bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' }),
	nextPWA({
		disable: process.env.NODE_ENV === 'development',
		dest: 'public',
	}),
];

// noinspection JSUnusedGlobalSymbols
module.exports = plugins.reduceRight((acc, plugin) => plugin(acc), nextConfig);
