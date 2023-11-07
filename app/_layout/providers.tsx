'use client';
import ComponentComposer, { component } from '@/src/helpers/componentComposer';
import EventsProvider from '@/src/providers/events';
import ThemeRegistry from '@/src/providers/theme';
import type { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<ComponentComposer
			components={[
				// data
				component(EventsProvider),
				component(ThemeRegistry),
			]}>
			{children}
		</ComponentComposer>
	);
}
