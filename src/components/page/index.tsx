import Head from 'next/head';
import type { ReactNode } from 'react';
import PageBack from './back';
import PageContainer from './container';
import type { PageTitleProps } from './title';
import PageTitle from './title';

export default function Page( { title, titleBar, titleProps, children }: {
	title?: string,
	titleBar?: string,
	titleProps?: PageTitleProps,
	children?: ReactNode
} ) {
	return (
		<PageContainer>
			<Head><title>{titleBar ?? title ? `${titleBar || title} | ` : ''}Azur Lane Tracker</title></Head>
			<PageBack/>
			<PageTitle {...titleProps}>{title}</PageTitle>
			{children}
		</PageContainer>
	);
}
