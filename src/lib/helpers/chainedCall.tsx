import { ComponentProps, JSXElementConstructor, ReactNode } from 'react';

export function component<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>>(
	component: T,
	props?: Omit<ComponentProps<T>, 'children'>
) {
	return { component, props };
}

export function ComponentComposer( { components, children }: { components: any[], children: ReactNode } ) {
	return components.reduceRight( ( children, { component, props } ) => {
		const Component = component;
		return <Component {...props}>{children}</Component>;
	}, children );
}

export function chain( func, args ) {
	return [ func, args ];
}

export function FunctionComposer( { functions, children }: { functions: any[], children: object } ) {
	return functions.reduceRight( ( children, [ func, args ] ) => func( { ...children, ...args } ), children );
}
