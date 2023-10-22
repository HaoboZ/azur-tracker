import nextPWA from '@ducanh2912/next-pwa';
import bundleAnalyzer from '@next/bundle-analyzer';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	swcMinify: true,
	headers: async () => [
		{
			// matching all API routes
			source: '/api/:path*',
			headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
		},
	],
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'azurlane.netojuu.com', port: '', pathname: '/images/**' },
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

export default plugins.reduceRight((acc, plugin) => plugin(acc), nextConfig);
