import { auth } from '@/src/auth';
import type { Metadata } from 'next';
import Settings from './index';

export const metadata: Metadata = { title: 'Settings | Azur Lane Tracker' };

export default async function SettingsPage() {
	const session = await auth();

	return <Settings user={session?.user} />;
}
