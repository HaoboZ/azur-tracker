import bundleAnalyzer from '@next/bundle-analyzer';
import withSerwistInit from '@serwist/next';
import type { NextConfig } from 'next';
import { pipe } from 'remeda';

const nextConfig: NextConfig = {
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
		enabled: !!process.env.ANALYZE && process.env.NODE_ENV !== 'development',
	}),
);
