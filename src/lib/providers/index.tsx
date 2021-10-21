import { ComponentProps, JSXElementConstructor, ReactNode } from 'react';

export function provider<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>>(
	provider: T,
	props?: Omit<ComponentProps<T>, 'children'>
) {
	return [ provider, props ];
}

export function ProviderComposer( { providers, children }: { providers: any[], children: ReactNode } ) {
	return providers.reduceRight( ( children, [ Provider, props ] ) => {
		return <Provider {...props}>{children}</Provider>;
	}, children );
}
