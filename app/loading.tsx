'use client';
import DelayedLoading from '@/components/loaders/delayedLoading';
import { useEffect, useState } from 'react';

export default function Loading() {
	const [loading, setLoading] = useState(false);

	useEffect(() => setLoading(true), []);

	return <DelayedLoading isLoading={loading} />;
}
