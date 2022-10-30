export function getServerURL() {
	if ( !process.env.NEXT_PUBLIC_VERCEL_URL ) return typeof window === 'undefined' ? 'http://localhost:3000' : '';
	return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
}
