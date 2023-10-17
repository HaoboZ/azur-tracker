import Loading from '@/components/loaders/loading';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

export default function NoSSR({ children }: { children: ReactNode }) {
	const [load, setLoad] = useState(true);

	useEffect(() => {
		setLoad(false);
	}, []);

	if (load) return <Loading />;
	return children;
}
