import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'app.vercel.azurlanetracker',
	appName: 'Azur Lane Tracker',
	webDir: 'out',
	bundledWebRuntime: false,
	server: {
		url: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : undefined,
	},
};
export default config;
