import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		id: '/',
		name: 'Azur Lane Tracker',
		short_name: 'Azur Tracker',
		description: 'Tracks Azur Lane Events, Research, and Ship Collection',
		categories: ['games', 'utilities'],
		scope: '/',
		start_url: '/',
		display: 'standalone',
		orientation: 'portrait',
		theme_color: '#039be5',
		background_color: '#ffffff',
		icons: [
			{ src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
			{ src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
			{
				src: '/icons/maskable-192x192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/icons/maskable-512x512.png',
				sizes: '512x512',
				type: 'image/png',
				purpose: 'maskable',
			},
		],
	};
}
