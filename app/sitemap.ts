import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: `https://${process.env.NEXT_PUBLIC_URL}`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `https://${process.env.NEXT_PUBLIC_URL}/event`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `https://${process.env.NEXT_PUBLIC_URL}/research`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.7,
		},
		{
			url: `https://${process.env.NEXT_PUBLIC_URL}/fleet`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `https://${process.env.NEXT_PUBLIC_URL}/info`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.7,
		},
		{
			url: `https://${process.env.NEXT_PUBLIC_URL}/settings`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.7,
		},
		{
			url: `https://${process.env.NEXT_PUBLIC_URL}/privacy`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.3,
		},
		{
			url: `https://${process.env.NEXT_PUBLIC_URL}/tos`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.3,
		},
	];
}
