import bundleAnalyzer from '@next/bundle-analyzer';
import withSerwistInit from '@serwist/next';
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
		unoptimized: true,
		remotePatterns: [
			{ protocol: 'https', hostname: 'azurlane.netojuu.com', port: '', pathname: '/images/**' },
		],
	},
};

export default pipe(
	nextConfig,
	withSerwistInit({
		disable: !process.env.NEXT_PUBLIC_VERCEL_ENV,
		cacheOnNavigation: true,
		swSrc: 'app/sw.ts',
		swDest: 'public/sw.js',
	}),
	bundleAnalyzer({
		enabled: !process.env.NEXT_PUBLIC_VERCEL_ENV && process.env.NODE_ENV !== 'development',
	}),
);
