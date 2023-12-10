import { defaultCache } from '@serwist/next/browser';
import { installSerwist } from '@serwist/sw';

declare const self: {
	// Change this attribute's name to your `injectionPoint`.
	__SW_MANIFEST: string[] | undefined;
};

installSerwist({
	precacheEntries: self.__SW_MANIFEST,
	skipWaiting: true,
	clientsClaim: true,
	navigationPreload: true,
	runtimeCaching: defaultCache,
});
