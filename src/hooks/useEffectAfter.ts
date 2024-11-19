import type { DependencyList, EffectCallback } from 'react';
import { useEffect, useRef } from 'react';

export default function useEffectAfter(effect: EffectCallback, deps?: DependencyList) {
	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
		} else {
			return effect();
		}
	}, deps);
}
