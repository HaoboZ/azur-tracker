import React from 'react';

declare module 'react' {
	// noinspection JSUnusedGlobalSymbols
	function memo<T extends React.ComponentType<any>>(
		c: T,
		areEqual?: (
			prev: React.ComponentProps<T>,
			next: React.ComponentProps<T>
		) => boolean
	): T;
}
