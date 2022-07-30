import type { ComponentType, ReactNode } from 'react';

export function component<P>(
	component: ComponentType<P>,
	props?: Omit<P, 'children'>
) {
	return { component, props };
}

export default function ComponentComposer( { components, children }: {
	components: any[],
	children: ReactNode
} ) {
	return components.reduceRight( ( children, { component, props } ) => {
		const Component = component;
		return <Component {...props}>{children}</Component>;
	}, children );
}
