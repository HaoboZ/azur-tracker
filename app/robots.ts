import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default async function robots(): Promise<MetadataRoute.Robots> {
	const headersList = await headers();
	const url = `https://${headersList.get('host')}`;

	return {
		rules: { userAgent: '*', allow: '/', disallow: '/private/' },
		sitemap: `${url}/sitemap.xml`,
	};
}
