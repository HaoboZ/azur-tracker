import { useEffect, useRef } from 'react';

export default function useInterval(callback: () => void, delay = 0): void {
	const savedRefCallback = useRef<() => void>(undefined);

	useEffect(() => {
		savedRefCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		function internalCallback() {
			savedRefCallback.current?.();
		}

		internalCallback();

		const interval = window.setInterval(internalCallback, delay);

		return () => {
			window.clearInterval(interval);
		};
	}, [delay]);
}
