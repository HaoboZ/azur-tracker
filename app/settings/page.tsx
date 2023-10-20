import type { Metadata } from 'next';
import Settings from './index';

export const metadata: Metadata = {
	title: 'Settings | Azur Lane Tracker',
};

export default function SettingsPage() {
	return <Settings />;
}
