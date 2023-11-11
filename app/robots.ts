import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default function robots(): MetadataRoute.Robots {
	const headersList = headers();
	const url = headersList.get('host');
	console.log([...headersList.entries()]);

	return {
		rules: { userAgent: '*', allow: '/', disallow: '/private/' },
		sitemap: `https://${url}/sitemap.xml`,
	};
}
