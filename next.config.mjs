import nextPWA from '@ducanh2912/next-pwa';
import bundleAnalyzer from '@next/bundle-analyzer';
import { pipe } from 'remeda';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	swcMinify: true,
	headers: async () => [
		{ source: '/api/:path*', headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }] },
	],
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'azurlane.netojuu.com', port: '', pathname: '/images/**' },
		],
	},
};

export default pipe(
	nextConfig,
	nextPWA({ disable: !process.env.NEXT_PUBLIC_VERCEL_ENV, dest: 'public' }),
	bundleAnalyzer({
		enabled: !process.env.NEXT_PUBLIC_VERCEL_ENV && process.env.NODE_ENV !== 'development',
	}),
);
