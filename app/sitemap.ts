import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/z`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/z/event`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/z/research`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.7,
		},
		{
			url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/z/fleet`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/z/info`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.7,
		},
		{
			url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/z/settings`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.7,
		},
		{
			url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/privacy`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.3,
		},
		{
			url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/tos`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.3,
		},
	];
}
