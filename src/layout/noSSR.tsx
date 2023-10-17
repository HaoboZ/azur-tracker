import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

export default function NoSSR({ children }: { children: ReactNode }) {
	const [load, setLoad] = useState(true);

	useEffect(() => {
		setLoad(false);
	}, []);

	if (typeof window === 'undefined' || load) return null;
	return children;
}
